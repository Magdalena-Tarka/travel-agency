import React  from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';

const OrderOptionDate = ({currentValue, setOptionValue}) => {
  return (
    <DatePicker
      className={styles.input}
      selected={currentValue}
      onChange={setOptionValue}
      value={currentValue}
    />
  );
};

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
};

export default OrderOptionDate;