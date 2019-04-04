import React from 'react';
import { shallow } from 'enzyme';
import { CrisisList } from '../../../src/features/map';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<CrisisList />);
  expect(renderedComponent.find('.map-crisis-list').length).toBe(1);
});
