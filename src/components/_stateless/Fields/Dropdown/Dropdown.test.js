import React from 'react';
import ReactDOM from 'react-dom';
import Dropdown from './index';

const optionsMock = [
    {
        name: 'teste_name_1',
        value: 'teste_value_1'
    },
    {
        name: 'teste_name_2',
        value: 'teste_value_2'
    }
]

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dropdown options={optionsMock} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
