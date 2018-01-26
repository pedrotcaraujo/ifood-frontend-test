import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Filter from './index';

const onChangeMock = jest.fn();

it('renders correctly', () => {
  const tree = renderer
    .create(<Filter data={{ filters: [] }} onChange={onChangeMock} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Filter data={{ filters: [] }} onChange={onChangeMock} />, div);
});