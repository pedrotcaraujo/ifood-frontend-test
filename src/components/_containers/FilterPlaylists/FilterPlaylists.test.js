import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import FilterPlaylists from './index';

jest.mock('axios');
jest.mock('../../../dispatchers/AppDispatcher');
jest.mock('../../_stateless/Filter');

const axios = require('axios');
axios.get = jest.fn(() => Promise.resolve('teste'));

const AppDispatcher = require('../../../dispatchers/AppDispatcher').default;
AppDispatcher.dispatch = jest.fn();

const wrapper = shallow(<FilterPlaylists/>);

it('checks filters request', () => {
    expect(axios.get).toHaveBeenCalled();
});

it('checks dispatcher have been called', () => {
    wrapper.instance().dispatch()
    expect(AppDispatcher.dispatch).toHaveBeenCalled();
});



