import React from 'react';
import ReactDOM from 'react-dom';
import Loader from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Loader loaded={false} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
