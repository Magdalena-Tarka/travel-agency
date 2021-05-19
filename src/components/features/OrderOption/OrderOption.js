import React from 'react';
import styles from './OrderOption.scss';
//import PropTypes from 'prop-types';

import OrderOptionDropdown from '../OrderOption/OrderOptionDropdown';
import OrderOptionIcons from '../OrderOption/OrderOptionIcons';
import OrderOptionNumber from '../OrderOption/OrderOptionNumber';
import OrderOptionCheckboxes from '../OrderOption/OrderOptionCheckboxes';
import OrderOptionDate from '../OrderOption/OrderOptionDate';
import OrderOptionText from '../OrderOption/OrderOptionText';

const optionTypes = {
  dropdown: OrderOptionDropdown,
  icons: OrderOptionIcons,
  checkboxes: OrderOptionCheckboxes,
  number: OrderOptionNumber,
  date: OrderOptionDate,
  text: OrderOptionText,
};

const OrderOption = ({name, type, id, setOrderOption, ...otherProps}) => {
  const OptionComponent = optionTypes[type];
  if(!OptionComponent){
    return null;
  } else {
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{name}</h3>
        <OptionComponent
          {...otherProps}
          setOptionValue={value => setOrderOption({[id]: value})}  // Jest to funkcja strzałkowa, która wywołuje funkcję setOrderOption, przekazując jej obiekt. W tym obiekcie jest jedna właściwość, której kluczem będzie zawartość zmiennej (a w tym wypadku – propsa) id, a wartością – argument funkcji strzałkowej.
          // Jak pamiętasz, nasza struktura zapisywania wybranych opcji zakłada, że zapisujemy je w obiekcie, w którym kluczami są id opcji. Właśnie dlatego musimy tutaj użyć takiego formatu. Łatwiej nam jest jednak zrobić to raz w tym komponencie niż później z osobna dla każdego z komponentów dla poszczególnych typów opcji.
        />
      </div>
    );
  }
};

/*OrderOption.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  setOrderOption: PropTypes.func,
};*/

export default OrderOption;