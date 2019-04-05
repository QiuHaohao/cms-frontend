import React from 'react';
import { shallow } from 'enzyme';
import { ReportConfirmModal } from '../../../src/features/report';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ReportConfirmModal />);
  expect(renderedComponent.find('.report-report-confirm-modal').length).toBe(1);
});
