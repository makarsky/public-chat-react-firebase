import React from 'react';
import { render, screen } from '@testing-library/react';
import DeleteButton from '../DeleteButton';

it('renders DeleteButton without crashing', () => {
  render(<DeleteButton onClick={() => 0} />);
  expect(screen.getByTestId('delete-button')).toBeInTheDocument();
});
