import React from 'react';
import DaysToSummer from './DaysToSummer';
import { shallow } from 'enzyme';

const select = {
  countingDownDays: '.countingDownDays',
  summerDescription: '.summerDescription',
  daysToSummer: '.daysToSummer',
};
const mockProps = {
  descriptionDays: 'def',
  descriptionDay: 'abc',
};

describe('DaysToSummer', () => {
  it('should render properly', () => {
    const component = shallow(<DaysToSummer />);
    expect(component).toBeTruthy();
  });

  it('should render days amount and description', () => {
    const component = shallow(<DaysToSummer />);
    expect(component.exists(select.countingDownDays)).toEqual(true);
    expect(component.exists(select.summerDescription)).toEqual(true);
  });

  it('should render description from props', () => {
    const component = shallow(<DaysToSummer {...mockProps} />);
    expect(component.find(select.summerDescription).text()).toEqual(mockProps.descriptionDays);
  });
});

const trueDate = Date;

const mockDate = customDate => class extends Date {
  constructor(...args) {
    if(args.length) {
      super(...args);
      return this;
    } else {
      super(customDate);
    }
    return ;
  }
  static now() {
    return (new Date(customDate)).getTime();
  }
};

const checkDaysAmountAtDate = (date, expectedDaysAmount) => {
  it(`should show correct at ${date}`, () => {
    global.Date = mockDate(`${date}T00:00:01.135Z`);

    const component = shallow(<DaysToSummer {...mockProps} />);
    const renderedDate = component.find(select.countingDownDays).text();
    expect(renderedDate).toEqual(expectedDaysAmount);

    global.Date = trueDate;
  });
};

describe('Component DaysToSummer with mocked Date', () => {
  checkDaysAmountAtDate('2021-01-01', '171');
  checkDaysAmountAtDate('2021-05-21', '31');
  checkDaysAmountAtDate('2021-06-20', '1');
  checkDaysAmountAtDate('2021-09-24', '270');
  checkDaysAmountAtDate('2021-12-31', '172');
});

const checkDescriptionAtDate = (date, expectedDescription) => {
  it(`should show correct at ${date}`, () => {
    global.Date = mockDate(`${date}T00:00:01.135Z`);

    const component = shallow(<DaysToSummer {...mockProps} />);
    const renderedDate = component.find(select.summerDescription).text();
    expect(renderedDate).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};

describe('Component DaysToSummer with mocked Date render correct descripton', () => {
  checkDescriptionAtDate('2021-03-14', mockProps.descriptionDays);
  checkDescriptionAtDate('2021-06-19', mockProps.descriptionDays);
  checkDescriptionAtDate('2021-06-20', mockProps.descriptionDay);
});

const checkComponentAtDate = (date, expected) => {
  it('should not render when its summer', () => {
    global.Date = mockDate(`${date}T00:00:01.135Z`);

    const component = shallow(<DaysToSummer />);
    expect(component.find(select.daysToSummer)).toEqual(expected);
    console.log(component.debug());

    global.Date = trueDate;
  });
};

describe('Component DaysToSummer with mocked Date should not render', () => {
  checkComponentAtDate('2021-06-21', {});
  checkComponentAtDate('2021-08-19', {});
  checkComponentAtDate('2021-09-23', {});
});