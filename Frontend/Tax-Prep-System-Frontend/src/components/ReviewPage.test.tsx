import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ReviewPage from './ReviewPage';
import React from 'react';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const MockRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
);

it('renders correctly', () => {
  const setCurrentPageMock = jest.fn();

  const { container } = render(
    <MockRouter>
      <ReviewPage setCurrentPage={setCurrentPageMock} />
    </MockRouter>
  );
  expect(container).toMatchSnapshot();
});