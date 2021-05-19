import React  from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';

const OrderOptionDate = ({currentValue, setOptionValue}) => {
  //const [startDate] = useState(new Date());
  return (
    <DatePicker
      className={styles.input}
      //selected={startDate}
      selected={currentValue}
      //onChange={date => setStartDate(date)}
      //onChange={event => setOptionValue(setStartDate(event.currentTarget.value))}
      onChange={setOptionValue}
      value={currentValue}
      //placeholderText={date => setStartDate(date)}
      //placeholderText={currentValue}
    />
  );
};

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.number,
};

export default OrderOptionDate;