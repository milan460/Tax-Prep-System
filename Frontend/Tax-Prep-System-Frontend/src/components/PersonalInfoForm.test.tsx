import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import PersonalInfoForm from './PersonalInfoForm';
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
        <PersonalInfoForm setCurrentPage={setCurrentPageMock} />
      </BrowserRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

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
    });

    test('handles fetch error', async () => {
        fetchMock.mockRejectOnce(new Error('Fetch error'));

        render(
            <MockRouter>
                <PersonalInfoForm setCurrentPage={jest.fn()} />
            </MockRouter>
        );

    });
    test('updates formData state on input change', () => {
        const { container } = render(
            <MockRouter>
                <PersonalInfoForm setCurrentPage={jest.fn()} />
            </MockRouter>
        );
        const inputElement = container.querySelector('#firstName') as HTMLInputElement;

        fireEvent.change(inputElement, { target: { name: 'firstName', value: 'John' } });

        expect(inputElement.value).toBe('John');
    });

    test('updates formData state on filing status change', () => {
        const { container } = render(<PersonalInfoForm setCurrentPage={jest.fn()} />);

        const selectElement = container.querySelector('#filingStatus') as HTMLSelectElement;

        fireEvent.change(selectElement, { target: { value: 'Married' } });

        expect(selectElement.value).toBe('Married');
    });

    test('updates formData state on state change', () => {
        const { container } = render(<PersonalInfoForm setCurrentPage={jest.fn()} />);

        const selectElement = container.querySelector('#state') as HTMLSelectElement;

        fireEvent.change(selectElement, { target: { value: 'California' } });

        expect(selectElement.value).toBe('California');
    });

    test('updates selected month', () => {
        const { container } = render(<PersonalInfoForm setCurrentPage={jest.fn()} />);
        const selectElement = container.querySelector('#month') as HTMLSelectElement;

        fireEvent.change(selectElement, { target: { value: '01' } });

        expect(selectElement.value).toBe('01');
    });

    test('updates selected day', () => {
        const { container } = render(<PersonalInfoForm setCurrentPage={jest.fn()} />);

        const inputElement = container.querySelector('#day') as HTMLInputElement;

        fireEvent.change(inputElement, { target: { value: '15' } });

        expect(inputElement.value).toBe('15');
    });

    test('updates selected year', () => {
        const { container } = render(<PersonalInfoForm setCurrentPage={jest.fn()} />);

        const inputElement = container.querySelector('#year') as HTMLInputElement;

        fireEvent.change(inputElement, { target: { value: '2023' } });

        expect(inputElement.value).toBe('2023');
    });
    
    

});