import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Filter from './index';

jest.mock('axios')

const axios = require('axios');
axios.get = jest.fn(() => Promise.resolve([]))

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Filter />, div);
});