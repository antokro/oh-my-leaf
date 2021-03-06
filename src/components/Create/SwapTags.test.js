import React from 'react';
import SwapTags from './SwapTags';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const tags = ['test'];

describe('Swap tags component', () => {
  it('renders a section with an input field to add tags to a tag list', () => {
    const input = renderer.create(<SwapTags tags={tags} />);
    const tree = input.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('triggers to callback functions', () => {
    const callbackDelete = jest.fn();
    const callbackInput = jest.fn();

    const input = mount(
      <SwapTags tags={tags} onDelete={callbackDelete} onInput={callbackInput} />
    );

    input.find('b').simulate('click');
    expect(callbackDelete).toHaveBeenCalled();
  });
});
/* tags on Delete onInput*/
