import React from 'react';
import ReactDOM from 'react-dom';
import Playlists from './index';

jest.mock('../../stores/FilterStore');
jest.mock('../../dispatchers/FeaturedPlaylistDispatcher');
jest.mock('../../constants/PlaylistsConstants');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Playlists />, div);
  ReactDOM.unmountComponentAtNode(div);
});
