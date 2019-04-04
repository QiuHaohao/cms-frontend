import React from 'react';
import { shallow } from 'enzyme';
import { ReportForm } from '../../../src/features/report/ReportForm';

describe('report/ReportForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      report: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ReportForm {...props} />
    );

    expect(
      renderedComponent.find('.report-report-form').length
    ).toBe(1);
  });
});
