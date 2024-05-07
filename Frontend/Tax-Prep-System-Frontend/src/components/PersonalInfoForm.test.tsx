
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import PersonalInfoForm from './PersonalInfoForm';

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