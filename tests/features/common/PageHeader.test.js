import React from 'react';
import { shallow } from 'enzyme';
import { PageHeader } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<PageHeader />);
  expect(renderedComponent.find('.common-page-header').length).toBe(1);
});
