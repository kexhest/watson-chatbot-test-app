/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';

import { App } from '../App';

describe('<App />', () => {
  const tree = shallow(<App />);

  it('renders correctly', () => {
    expect(tree).toMatchSnapshot();
  });
});
