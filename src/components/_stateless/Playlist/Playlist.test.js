import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Playlist from './index';

it('renders correctly', () => {
  const tree = renderer
    .create(<Playlist image="asdas" name="asd" />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Playlist image="asdas" name="asd" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
