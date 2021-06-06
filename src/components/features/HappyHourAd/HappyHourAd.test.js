import { shallow } from 'enzyme';
import React from 'react';
import HappyHourAd from './HappyHourAd';

const select = {
  title: '.title',
  promoDescription: '.promoDescription',
};
const mockProps = {
  title: 'abc',
  description: 'def',
};

describe('HappyHourAd', () => {

  it('should render properly', () => {
    const component = shallow(<HappyHourAd />);
    expect(component).toBeTruthy();
  });
  
  it('should render heading and description', () => {
    const component = shallow(<HappyHourAd />);
    expect(component.exists(select.title)).toEqual(true);
    expect(component.exists(select.promoDescription)).toEqual(true);
  });
  
  it('should render header title from prop "title"', () => {
    const component = shallow(<HappyHourAd {...mockProps} />);
    expect(component.find(select.title).text()).toEqual(mockProps.title);
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

const checkDescriptionAtTime = (time, expectedDescription) => {
  it(`should show correct at ${time}`, () => {
    global.Date = mockDate(`2019-05-14T${time}.135Z`);

    const component = shallow(<HappyHourAd {...mockProps} />);
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};

describe('Component HappyHourAd with mocked Date', () => {
  checkDescriptionAtTime('11:57:58', '122');
  checkDescriptionAtTime('11:59:59', '1');
  checkDescriptionAtTime('13:00:00', 23 * 60 * 60 + '');  //Na końcu pusty ciąg znaków, aby skonwertować liczbę na tekst
});

const checkDescriptionAfterTime = (time, delaySeconds, expectedDescription) => {
  it(`should show correct value ${delaySeconds} seconds after ${time}`, () => {
    jest.useFakeTimers();
    global.Date = mockDate(`2019-05-14T${time}.135Z`);

    const component = shallow(<HappyHourAd {...mockProps} />);
    const newTime = new Date();

    newTime.setSeconds(newTime.getSeconds() + delaySeconds);
    global.Date = mockDate(newTime.getTime());

    jest.advanceTimersByTime(delaySeconds * 1000);

    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
    jest.useRealTimers();
  });
};

describe('Component HappyHourAd with mocked Date and delay', () => {
  checkDescriptionAfterTime('11:57:58', 2, '120');
  checkDescriptionAfterTime('11:59:58', 1, '1');
  checkDescriptionAfterTime('13:00:00', 60 * 60, 22 * 60 * 60 + '');
});

describe('Component HappyHourAd with mocked Date render correct descripton', () => {
  checkDescriptionAtTime('12:29:29', mockProps.description);
  checkDescriptionAtTime('12:00:00', mockProps.description);
  checkDescriptionAtTime('12:59:59', mockProps.description);
});

describe('Component HappyHourAd with mocked Date and delay render correct descripton', () => {
  checkDescriptionAfterTime('11:59:58', 5, mockProps.description);
  checkDescriptionAfterTime('12:59:58', 5, 23 * 60 * 60 - 3 + '');
});