import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PersonalInfoForm from './PersonalInfoForm';
import fetchMock from 'jest-fetch-mock';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

const MockRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
);

describe('PersonalInfoForm component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('fetches current user successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ userId: 1, username: 'testUser' }));

    render(
      <MockRouter>
        <PersonalInfoForm setCurrentPage={jest.fn()} />
      </MockRouter>
    );

    // Add assertions based on the expected behavior of fetchCurrentUser after fetching the user
  });

  test('handles fetch error', async () => {
    fetchMock.mockRejectOnce(new Error('Fetch error'));

    render(
      <MockRouter>
        <PersonalInfoForm setCurrentPage={jest.fn()} />
      </MockRouter>
    );

    // Add assertions based on how you handle fetch errors in your code
  });
});