import React from 'react';
import ReactDOM from 'react-dom';
import Playlists from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Playlists data={{ message: 'Teste', playlists: { items: [] }}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
