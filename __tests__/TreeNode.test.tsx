import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TreeNode from '../src/components/TreeNode';
import { View } from 'react-native';

describe('TreeNode Component', () => {
  const mockOnSelect = jest.fn();
  const selectedItems = new Set<string>();

  const props = {
    id: '1',
    label: 'Computers',
    level: 0,
    onSelect: mockOnSelect,
    selectedItems: selectedItems,
  };

  it('renders correctly', () => {
    const { getByText } = render(<TreeNode {...props} />);
    expect(getByText('Computers')).toBeTruthy();
  });

  it('calls onSelect when checkbox is pressed', () => {
    const { getByText } = render(<TreeNode {...props} />);
    const checkbox = getByText('Computers');

    fireEvent.press(checkbox);

    expect(mockOnSelect).toHaveBeenCalledWith('1', true);
  });

  it('toggles collapse state when checkbox is pressed', () => {
    const { getByText, rerender } = render(<TreeNode {...props} />);
    const checkbox = getByText('Computers');

    fireEvent.press(checkbox);
    expect(props.onSelect).toHaveBeenCalledWith('1', true);

    rerender(<TreeNode {...props} selectedItems={new Set(['1'])} />);
    fireEvent.press(checkbox);
    expect(props.onSelect).toHaveBeenCalledWith('1', false);
  });

  it('displays children when collapsed is true', () => {
    const children = <View testID="child-node">Child Node</View>;
    const { getByText, getByTestId, queryByTestId } = render(<TreeNode {...props}>{children}</TreeNode>);

    expect(queryByTestId('child-node')).toBeNull();

    fireEvent.press(getByText('Computers'));
    expect(getByTestId('child-node')).toBeTruthy();
  });
});
