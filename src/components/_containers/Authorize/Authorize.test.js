import React from 'react';
import ReactDOM from 'react-dom';
import Authorize from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Authorize />, div);
  ReactDOM.unmountComponentAtNode(div);
});
