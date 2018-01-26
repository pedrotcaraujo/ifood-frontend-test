import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import FeaturedPlaylists from './index';

jest.mock('../../_stateless/Playlists');
jest.mock('../../_stateless/Player');

jest.mock('../../../stores/FilterStore');

const FilterStore = require('../../../stores/FilterStore').default;
FilterStore.addListener = jest.fn();

const wrapper = mount(<FeaturedPlaylists token="asd"/>);

it('checks FilterStore have been called', () => {
    expect(FilterStore.addListener).toHaveBeenCalled();
});



