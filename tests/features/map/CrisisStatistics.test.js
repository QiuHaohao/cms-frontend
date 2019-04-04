import React from 'react';
import { shallow } from 'enzyme';
import { CrisisStatistics } from '../../../src/features/map';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<CrisisStatistics />);
  expect(renderedComponent.find('.map-crisis-statistics').length).toBe(1);
});
