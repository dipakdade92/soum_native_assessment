import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TreeView from '../src/components/TreeView';
import { products } from '../src/mockData';


const mockOnSelect = jest.fn();

describe('TreeView Component', () => {
  it('renders correctly with given data', () => {
    const { getByText } = render(
      <TreeView data={products} onSelect={mockOnSelect} selectedItems={new Set()} />
    );

    expect(getByText('Mobile Phones')).toBeTruthy();
  });

  it('calls onSelect when a node is selected', () => {
    const { getByText } = render(
      <TreeView data={products} onSelect={mockOnSelect} selectedItems={new Set()} />
    );

    fireEvent.press(getByText('Mobile Phones'));
    fireEvent.press(getByText('Apple'));
    fireEvent.press(getByText('iPhone 8'));

    expect(mockOnSelect).toHaveBeenCalledWith('1-1-1', true);
  });

  it('renders nested items correctly', () => {
    const { getByText } = render(
      <TreeView data={products} onSelect={mockOnSelect} selectedItems={new Set()} />
    );

    fireEvent.press(getByText('Mobile Phones'));
    expect(getByText('Apple')).toBeTruthy();
    expect(getByText('Samsung')).toBeTruthy();

    fireEvent.press(getByText('Apple'));
    expect(getByText('iPhone 8')).toBeTruthy();
    expect(getByText('iPhone X')).toBeTruthy();
    
    fireEvent.press(getByText('iPhone 8'));
    expect(getByText('64GB')).toBeTruthy();
    expect(getByText('128GB')).toBeTruthy();
  });

  it('updates selected items state correctly', () => {
    const { getByText, rerender } = render(
      <TreeView data={products} onSelect={mockOnSelect} selectedItems={new Set(['1-1'])} />
    );

    fireEvent.press(getByText('Mobile Phones'));
    fireEvent.press(getByText('Apple'));
    expect(mockOnSelect).toHaveBeenCalledWith('1-1', false);
    fireEvent.press(getByText('Apple'));
    fireEvent.press(getByText('Mobile Phones'));


    rerender(<TreeView data={products} onSelect={mockOnSelect} selectedItems={new Set(['1-1', '2-1-1'])} />);

    fireEvent.press(getByText('Watches'));
    fireEvent.press(getByText('Apple'));
    fireEvent.press(getByText('Apple Watch Series 4'));
    expect(mockOnSelect).toHaveBeenCalledWith('2-1-1', false);
  });
});


