
import { BrowserRouter } from 'react-router-dom'; 
import renderer from 'react-test-renderer';
import W2Form from './W2Form';

describe('W2Form Component', () => {
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
});