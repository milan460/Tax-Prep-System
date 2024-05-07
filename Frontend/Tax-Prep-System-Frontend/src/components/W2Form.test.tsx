import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import W2Form from './W2Form';
import fetchMock from 'jest-fetch-mock';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));

const MockRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
);

it('renders correctly', () => {
    const setCurrentPageMock = jest.fn();

    const component = renderer.create(
        <BrowserRouter>
            <W2Form setCurrentPage={setCurrentPageMock} />
        </BrowserRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

describe('W2Form component', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test('fetches current user successfully', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ userId: 1, username: 'testUser' }));

        render(
            <MockRouter>
                <W2Form setCurrentPage={jest.fn()} />
            </MockRouter>
        );
    });

    test('handles fetch error', async () => {
        fetchMock.mockRejectOnce(new Error('Fetch error'));

        render(
            <MockRouter>
                <W2Form setCurrentPage={jest.fn()} />
            </MockRouter>
        );
    });

    test('updates formData state on input change', () => {
        const { container } = render(
            <MockRouter>
                <W2Form setCurrentPage={jest.fn()} />
            </MockRouter>
        );
        const inputElement = container.querySelector('#income') as HTMLInputElement;

        fireEvent.change(inputElement, { target: { name: 'income', value: '50000' } });

        expect(inputElement.value).toBe('50000');
    });

    test('updates formData state on state change', () => {
        const { container } = render(<W2Form setCurrentPage={jest.fn()} />);

        const selectElement = container.querySelector('#state') as HTMLSelectElement;

        fireEvent.change(selectElement, { target: { value: 'California' } });

        expect(selectElement.value).toBe('California');
    });

});