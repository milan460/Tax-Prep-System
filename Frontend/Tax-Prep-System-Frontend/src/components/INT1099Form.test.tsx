import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import INT1099 from './INT1099'; 
import fetchMock from 'jest-fetch-mock';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));

const MockRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
);


it('renders INT1099 correctly', () => {
    const setCurrentPageMock = jest.fn();

    const component = renderer.create(
        <MockRouter>
            <INT1099 setCurrentPage={setCurrentPageMock} />
        </MockRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

describe('INT1099 component', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test('fetchCurrentUser fetches current user successfully', async () => {
        const mockUser = { userId: 1, username: 'testUser' };
        fetchMock.mockResponseOnce(JSON.stringify(mockUser));

        render(
            <MockRouter>
                <INT1099 setCurrentPage={jest.fn()} />
            </MockRouter>
        );
    });

    test('handles fetch error', async () => {
        fetchMock.mockRejectOnce(new Error('Fetch error'));

        render(
            <MockRouter>
                <INT1099 setCurrentPage={jest.fn()} />
            </MockRouter>
        );

    });

    test('updates formData state on input change', () => {
        const { container } = render(
            <MockRouter>
                <INT1099 setCurrentPage={jest.fn()} />
            </MockRouter>
        );

        const payerNameInput = container.querySelector('#payerName') as HTMLInputElement;
        fireEvent.change(payerNameInput, { target: { name: 'payerName', value: 'Test Payer' } });

        expect(payerNameInput.value).toBe('Test Payer');
    });

});