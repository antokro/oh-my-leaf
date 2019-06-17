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

/*
    it('triggers the callback when bookmark is clicked', () => {
      const callback = jest.fn();
      const card = shallow(<Card onToggleBookmark={callback} />);
      
      card.find('small').simulate('click')
    
      expect(callback).toHaveBeenCalled();
    });
    });

  it('renders a Card with given title, description and tags ', () => {
    const component = renderer.create(
      <Card
        title="Test Title"
        description="Test Description"
        tags={['one', 'two']}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

*/
