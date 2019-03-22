import React from 'react';
import { shallow } from 'enzyme';
import { InfoBoxContent } from '../../../src/features/map';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InfoBoxContent />);
  expect(renderedComponent.find('.map-info-box-content').length).toBe(1);
});
