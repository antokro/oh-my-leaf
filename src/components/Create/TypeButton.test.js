import React from 'react';
import TypeButton from './TypeButton';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const types = ['give away', 'swap', 'for sale'];

Enzyme.configure({ adapter: new Adapter() });

function value() {
  return types[0];
}

describe('Type Button Component', () => {
  it('renders three buttons in the form component to choose the type of a listing', () => {
    const component = renderer.create(<TypeButton value={value()} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('triggers the callback and updates the type state in Create Form when clicked', () => {
    const callback = jest.fn();
    const button = mount(<TypeButton onClick={callback} value={value()} />);
    button.simulate('click');
    expect(callback).toHaveBeenCalled();
  });
});
