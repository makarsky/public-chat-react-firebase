import React from 'react';
import { render, screen } from '@testing-library/react';
import { mainListItems } from '../drawerListItems';

test('renders all social links', () => {
  render(mainListItems);
  expect(screen.getByText(/Instagram/i)).toBeInTheDocument();
  expect(screen.getByText('Facebook')).toBeInTheDocument();
  expect(screen.getByText('SoloLearn')).toBeInTheDocument();
  expect(screen.getByText('GitHub')).toBeInTheDocument();
  expect(screen.getByText('Linktree')).toBeInTheDocument();
  expect(screen.getByText('Source Code')).toBeInTheDocument();
});
