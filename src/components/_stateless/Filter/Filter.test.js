import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Filter from './index';

const onChangeMock = jest.fn();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Filter data={{ filters: [] }} onChange={onChangeMock} />, div);
});