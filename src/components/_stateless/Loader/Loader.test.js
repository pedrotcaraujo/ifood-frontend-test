import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Loader from './index';

it('renders correctly', () => {
  const tree = renderer
    .create(<Loader loaded={false} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Loader loaded={false} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
