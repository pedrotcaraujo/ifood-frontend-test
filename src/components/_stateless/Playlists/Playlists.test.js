import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Playlists from './index';

it('renders correctly', () => {
  const tree = renderer
    .create(<Playlists data={{ message: 'Teste', playlists: { items: [] }}} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Playlists data={{ message: 'Teste', playlists: { items: [] }}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
