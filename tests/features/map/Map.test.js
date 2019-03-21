import React from 'react';
import { shallow } from 'enzyme';
import { Map } from '../../../src/features/map';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Map />);
  expect(renderedComponent.find('.map-map').length).toBe(1);
});
