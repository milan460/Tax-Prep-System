import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ReviewPage from './ReviewPage';


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

describe('ReviewPage component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it('updates state correctly with handleInputChange', () => {
        // Render the ReviewPage component within a test environment
        const { container } = render(
          <MockRouter>
            <ReviewPage setCurrentPage={jest.fn()} />
          </MockRouter>
        );
      
        // Get the input elements for first name and last name
        const firstNameInput = container.querySelector('#firstName') as HTMLInputElement;
        const lastNameInput = container.querySelector('#lastName') as HTMLInputElement;
      
        // Call handleInputChange directly with the desired field and value
        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
        
        // Assert state updates
        expect(firstNameInput.value).toBe('John');
        expect(lastNameInput.value).toBe('Doe');
      });
    
});