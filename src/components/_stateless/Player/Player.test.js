import React from 'react';
import ReactDOM from 'react-dom';
import Player from './index';

jest.mock('../../stores/PlaylistsStore')

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Player />, div);
  ReactDOM.unmountComponentAtNode(div);
});
