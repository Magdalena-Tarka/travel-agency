import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import Button from '../../common/Button/Button';

import pricing from '../../../data/pricing.json';
import settings from '../../../data/settings';

import { formatPrice } from '../../../utils/formatPrice';
import { calculateTotal } from '../../../utils/calculateTotal';

const sendOrder = (options, tripCost, tripName, tripId, tripCountry) => {
  /*if(options.name === '' || options.contact === ''){
    alert('Please complete name and contact');
  }*/

  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    tripName,
    tripId,
    tripCountry,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

const OrderForm = ({tripName, tripId, tripCountry, tripCost, options, setOrderOption}) => (
  <Row>
    {pricing.map(option => (
      <Col md={4} key={option.id}>
        <OrderOption
          {...option}
          currentValue={options[option.id]}
          setOrderOption={setOrderOption}
        />
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary tripCost={tripCost} options={options} />
      
      {options.name.length > 0 && options.contact.length > 0 ?
        <Button onClick={() => (
          sendOrder(options, tripCost, tripName, tripId, tripCountry),
          alert('Thank You for Your Order, We will contact You soon:)')
        )}>
          Order now!
        </Button>
        :
        <Button onClick={() => (
          alert('Please, name and contact informations are required!')
        )}>
          Order now!
        </Button>
      }

      {/*<Button onClick={() => (
        sendOrder(tripName, tripId, tripCountry, options, tripCost),
        alert('Thank You for Your Order, We will contact You soon:)')
      )}>
        Order now!
      </Button>*/}

    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripName: PropTypes.string,
  tripId: PropTypes.string,
  tripCountry: PropTypes.string,
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;