import React from 'react';
import { shallow } from 'enzyme';

import Component from './index';

const getDefaultProps = () => ({
  src: 'foo',
  width: '200px',
  height: '150px',
  alt: 'test image'
});

describe('src/kit/Image/index', () => {
  it('should render without crashing', () => {
    const propsStub = getDefaultProps();
    shallow(<Component {...propsStub} />);
  });
});
