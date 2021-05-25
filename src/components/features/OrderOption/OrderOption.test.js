import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';

describe('Component OrderOption', () => {
  it('should render properly', () => {
    const component = shallow(<OrderOption name={'name'} type={'type'} />);
    expect(component).toBeTruthy();
    console.log(component.debug());
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should render prop "name" in the title', () => {
    const expectedTitle = 'sampleName';
    const component = shallow(<OrderOption name={expectedTitle} type={'type'} />);
    console.log(component.debug());
    expect(component.find('.title').text()).toEqual(expectedTitle);
  });
});