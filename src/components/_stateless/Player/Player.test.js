import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Player from './index';


it('renders correctly', () => {
  const tree = renderer
    .create(<Player data={{}} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Player data={{}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
