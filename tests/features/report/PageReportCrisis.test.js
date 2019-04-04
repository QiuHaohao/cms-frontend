import React from 'react';
import { shallow } from 'enzyme';
import { PageReportCrisis } from '../../../src/features/report/PageReportCrisis';

describe('report/PageReportCrisis', () => {
  it('renders node with correct class name', () => {
    const props = {
      report: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PageReportCrisis {...props} />
    );

    expect(
      renderedComponent.find('.report-page-report-crisis').length
    ).toBe(1);
  });
});
