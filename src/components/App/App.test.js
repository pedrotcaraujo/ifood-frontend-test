import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import App from './index';

jest.mock('../Authorize');
jest.mock('../Filter');
jest.mock('../Playlists');
jest.mock('../Player');
jest.mock('../../utils/getHashParams');

const getHashParams = require('../../utils/getHashParams').default;
getHashParams.mockImplementation(() => ({ access_token: 'teste_token', state: 'teste_state' }))
window.localStorage.getItem = jest.fn(() => 'teste_state')


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('sets initial state with token', () => {
  getHashParams.mockImplementation(() => ({ access_token: 'teste_token', state: 'teste_state' }))
  window.localStorage.getItem = jest.fn(() => 'teste_state')
  const wrapper = mount( <App />);
  expect(wrapper.state()).toEqual({
    logged: true,
    token: 'teste_token'
  })
});

it('sets initial state without token', () => {
  getHashParams.mockImplementation(() => ({}))
  window.localStorage.getItem = jest.fn(() => 'teste_storage')
  const wrapper = mount( <App />);
  expect(wrapper.state()).toEqual({
    logged: false,
    token: null
  })
});

it('sets initial state with expired authentication', () => {
  getHashParams.mockImplementation(() => ({access_token: 'teste_token'}))
  const wrapper = mount( <App />);
  expect(wrapper.state()).toEqual({
    logged: false,
    token: null
  })
});

