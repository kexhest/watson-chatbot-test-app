/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';

import NotFound from '../NotFound';

describe('<NotFound />', () => {
  const tree = shallow(<NotFound />);

  it('renders correctly', () => {
    expect(tree).toMatchSnapshot();
  });
});
