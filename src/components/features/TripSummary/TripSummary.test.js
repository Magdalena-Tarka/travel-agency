import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should generate link to correct path', () => {
    const tripId = 'abc';
    const component = shallow(<TripSummary id={tripId} />);
    const expectedPath = `/trips/${tripId}`;
    expect(component.find('.link').prop('to')).toEqual(expectedPath);
  });

  it('should render image with correct "src" and "alt" props', () => {
    const expectedSrc = 'image.jpg';
    const expectedAlt = 'description';
    const component = shallow(<TripSummary id={'abc'} image={expectedSrc} name={expectedAlt} />);
    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });

  it('should render props: "name", "cost" and "days" without crashing', () => {
    const expectedName = 'name';
    const expectedCost = '$1,234.56';
    const expectedDays = 3;
    const component = shallow(<TripSummary id='abc' name={expectedName} cost={expectedCost} days={expectedDays} />);
    expect(component.find('.title').text()).toEqual(expectedName);
    expect(component.find('.details').childAt(1).text()).toEqual('from ' + expectedCost);
    expect(component.find('.details').childAt(0).text()).toEqual(expectedDays + ' days');
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should render prop "tags" in correct order', () => {
    const mockTags = ['one', 'two', 'three'];
    const component = shallow(
      <TripSummary tags={mockTags} id='abc' image='image.jpg' name='description' cost='123.45' days={3} />);

    const expectedFirstTag = mockTags[0];
    const expectedSecondTag = mockTags[1];
    const expectedThirdTag = mockTags[2];
    expect(component.find('.tag').at(0).text()).toEqual(expectedFirstTag);
    expect(component.find('.tag').at(1).text()).toEqual(expectedSecondTag);
    expect(component.find('.tag').at(2).text()).toEqual(expectedThirdTag);
  });

  it('should not render div with tags if prop "tags" is empty or false', () => {
    expect(shallow(<TripSummary />).exists('div.tags')).toEqual(false);
    expect(shallow(<TripSummary tags={[]}/>).exists('div.tags')).toEqual(false);
  });
});