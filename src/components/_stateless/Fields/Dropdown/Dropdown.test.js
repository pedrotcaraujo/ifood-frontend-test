import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
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
];


it('renders correctly', () => {
  const tree = renderer
    .create(<Dropdown options={optionsMock} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dropdown options={optionsMock} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
