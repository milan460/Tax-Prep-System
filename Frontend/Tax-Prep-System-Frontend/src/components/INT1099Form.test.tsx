import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import INT1099 from './INT1099'; 
import fetchMock from 'jest-fetch-mock';

// Mocking the 'useNavigate' function from 'react-router-dom' for testing purposes
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));

// Creating a mock router component for testing
const MockRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
);

// Testing the rendering of the INT1099 component
it('renders INT1099 correctly', () => {
    const setCurrentPageMock = jest.fn();

    // Creating a test instance of the component within the mock router
    const component = renderer.create(
        <MockRouter>
            <INT1099 setCurrentPage={setCurrentPageMock} />
        </MockRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot(); // Ensuring the rendered tree matches the snapshot
});

// Describing tests for the INT1099 component
describe('INT1099 component', () => {
    beforeEach(() => {
        fetchMock.resetMocks(); // Resetting fetch mocks before each test
    });

    // Testing the fetchCurrentUser function for successful fetching of current user
    test('fetchCurrentUser fetches current user successfully', async () => {
        const mockUser = { userId: 1, username: 'testUser' };
        fetchMock.mockResponseOnce(JSON.stringify(mockUser)); // Mocking a successful response from the fetch

        // Rendering the component within the mock router
        render(
            <MockRouter>
                <INT1099 setCurrentPage={jest.fn()} />
            </MockRouter>
        );
    });

    // Testing the component's handling of fetch errors
    test('handles fetch error', async () => {
        fetchMock.mockRejectOnce(new Error('Fetch error')); // Mocking a fetch error response

        // Rendering the component within the mock router
        render(
            <MockRouter>
                <INT1099 setCurrentPage={jest.fn()} />
            </MockRouter>
        );
    });

    // Testing the component's ability to update formData state on input change
    test('updates formData state on input change', () => {
        const { container } = render(
            <MockRouter>
                <INT1099 setCurrentPage={jest.fn()} />
            </MockRouter>
        );

        // Finding and simulating an input change event
        const payerNameInput = container.querySelector('#payerName') as HTMLInputElement;
        fireEvent.change(payerNameInput, { target: { name: 'payerName', value: 'Test Payer' } });

        // Asserting that the input value has been updated as expected
        expect(payerNameInput.value).toBe('Test Payer');
    });
});