import React from 'react';
import { shallow } from 'enzyme';
import { ButtonResolve } from '../../../src/features/map/ButtonResolve';

describe('map/ButtonResolve', () => {
  it('renders node with correct class name', () => {
    const props = {
      map: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ButtonResolve {...props} />
    );

    expect(
      renderedComponent.find('.map-button-resolve').length
    ).toBe(1);
  });
});
