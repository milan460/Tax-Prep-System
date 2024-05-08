import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ReviewPage from './ReviewPage';
import React from 'react';

// Mocking the 'useNavigate' function from 'react-router-dom' for testing purposes
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Preserve actual functionality of 'react-router-dom'
    useNavigate: jest.fn(), // Mocking the useNavigate hook with jest.fn()
  }));
  
  // Creating a mock router component for testing
  const MockRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
  );
  
  // Test case to check if the ReviewPage component renders correctly
  it('renders correctly', () => {
    const setCurrentPageMock = jest.fn(); // Mocking setCurrentPage function
  
    // Rendering the ReviewPage component within the mock router
    const { container } = render(
      <MockRouter>
        <ReviewPage setCurrentPage={setCurrentPageMock} />
      </MockRouter>
    );
  
    // Expecting the container to match the snapshot
    expect(container).toMatchSnapshot();
  });