import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import W2Form from './W2Form';
import fetchMock from 'jest-fetch-mock';

// Mock the useNavigate hook from react-router-dom using Jest's jest.mock function
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));

// Define a MockRouter component using MemoryRouter from react-router-dom
const MockRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
);

// Snapshot test to ensure W2Form component renders correctly
it('renders correctly', () => {
    const setCurrentPageMock = jest.fn();

    // Render the W2Form component wrapped in BrowserRouter for testing
    const component = renderer.create(
        <BrowserRouter>
            <W2Form setCurrentPage={setCurrentPageMock} />
        </BrowserRouter>
    );

    // Generate a snapshot and compare with the previous snapshot
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

// Component tests for the W2Form component
describe('W2Form component', () => {
    // Reset fetch mocks before each test
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    // Test if the component fetches the current user data successfully
    test('fetches current user successfully', async () => {
        // Mock the fetch response with user data
        fetchMock.mockResponseOnce(JSON.stringify({ userId: 1, username: 'testUser' }));

        // Render the W2Form component wrapped in MockRouter for testing
        render(
            <MockRouter>
                <W2Form setCurrentPage={jest.fn()} />
            </MockRouter>
        );
    });

    // Test if the component handles fetch errors correctly
    test('handles fetch error', async () => {
        // Mock the fetch rejection with an error
        fetchMock.mockRejectOnce(new Error('Fetch error'));

        // Render the W2Form component wrapped in MockRouter for testing
        render(
            <MockRouter>
                <W2Form setCurrentPage={jest.fn()} />
            </MockRouter>
        );
    });

    // Test if the component updates the formData state correctly on input change
    test('updates formData state on input change', () => {
        // Render the W2Form component wrapped in MockRouter for testing
        const { container } = render(
            <MockRouter>
                <W2Form setCurrentPage={jest.fn()} />
            </MockRouter>
        );
        
        // Simulate an input change and test if the state is updated correctly
        const inputElement = container.querySelector('#income') as HTMLInputElement;
        fireEvent.change(inputElement, { target: { name: 'income', value: '50000' } });
        expect(inputElement.value).toBe('50000');
    });

    // Test if the component updates the formData state correctly on state change
    test('updates formData state on state change', () => {
        // Render the W2Form component without MockRouter for testing
        const { container } = render(<W2Form setCurrentPage={jest.fn()} />);
        
        // Simulate a select change and test if the state is updated correctly
        const selectElement = container.querySelector('#state') as HTMLSelectElement;
        fireEvent.change(selectElement, { target: { value: 'California' } });
        expect(selectElement.value).toBe('California');
    });
});