import React from 'react';
import { shallow } from 'enzyme';
import { Crisis } from '../../../src/features/map';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Crisis />);
  expect(renderedComponent.find('.map-crisis').length).toBe(1);
});
