import React from 'react';
import { shallow } from 'enzyme';
import { PageCrisisMap } from '../../../src/features/map/PageCrisisMap';

describe('map/PageCrisisMap', () => {
  it('renders node with correct class name', () => {
    const props = {
      map: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PageCrisisMap {...props} />
    );

    expect(
      renderedComponent.find('.map-page-crisis-map').length
    ).toBe(1);
  });
});
