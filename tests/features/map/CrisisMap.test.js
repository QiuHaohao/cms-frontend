import React from 'react';
import { shallow } from 'enzyme';
import { CrisisMap } from '../../../src/features/map/CrisisMap';

describe('map/CrisisMap', () => {
  it('renders node with correct class name', () => {
    const props = {
      map: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CrisisMap {...props} />
    );

    expect(
      renderedComponent.find('.map-crisis-map').length
    ).toBe(1);
  });
});
