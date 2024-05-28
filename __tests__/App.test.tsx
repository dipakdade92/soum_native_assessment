import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';

describe('App Component', () => {

  it('renders correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText('Browse Products')).toBeTruthy();
  });

  it('displays categories, brands, models, and variants correctly', () => {
    const { getByText } = render(<App />);
    
    // Checking category
    expect(getByText('Mobile Phones')).toBeTruthy();
    
    // Checking brand
    fireEvent.press(getByText('Mobile Phones'));
    expect(getByText('Apple')).toBeTruthy();
    
    // Checking model
    fireEvent.press(getByText('Apple'));
    expect(getByText('iPhone 8')).toBeTruthy();
    
    // Checking variant
    fireEvent.press(getByText('iPhone 8'));
    expect(getByText('64GB')).toBeTruthy();
  });

  it('handles selection and deselection correctly', () => {
    const { getByText, queryByText } = render(<App />);

    fireEvent.press(getByText('Mobile Phones'));
    fireEvent.press(getByText('Apple'));
    fireEvent.press(getByText('iPhone 8'));
    fireEvent.press(getByText('64GB'));

    expect(getByText('iPhone 8 - 64GB')).toBeTruthy();
    
    fireEvent.press(getByText('64GB'));
    expect(queryByText('iPhone 8 - 64GB')).toBeFalsy();
  });

  it('removes child selections when a parent is deselected', () => {
    const { getByText, queryByText } = render(<App />);
    
    fireEvent.press(getByText('Mobile Phones'));
    fireEvent.press(getByText('Apple'));
    fireEvent.press(getByText('iPhone 8'));
    fireEvent.press(getByText('64GB'));
    expect(getByText('iPhone 8 - 64GB')).toBeTruthy();
    
    fireEvent.press(getByText('Apple'));
    expect(queryByText('iPhone 8 - 64GB')).toBeFalsy();
  });

  it('updates selected products state correctly', () => {
    const { getByText, queryByText } = render(<App />);

    fireEvent.press(getByText('Mobile Phones'));
    fireEvent.press(getByText('Apple'));
    fireEvent.press(getByText('iPhone 8'));

    fireEvent.press(getByText('64GB'));
    expect(getByText('iPhone 8 - 64GB')).toBeTruthy();
    
    fireEvent.press(getByText('128GB'));
    expect(getByText('iPhone 8 - 128GB')).toBeTruthy();
    
    fireEvent.press(getByText('Apple'));
    expect(queryByText('iPhone 8 - 64GB')).toBeFalsy();
    expect(queryByText('iPhone 8 - 128GB')).toBeFalsy();
  });
});
