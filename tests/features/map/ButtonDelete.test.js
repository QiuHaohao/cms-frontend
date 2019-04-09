import React from 'react';
import { shallow } from 'enzyme';
import { ButtonDelete } from '../../../src/features/map/ButtonDelete';

describe('map/ButtonDelete', () => {
  it('renders node with correct class name', () => {
    const props = {
      map: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ButtonDelete {...props} />
    );

    expect(
      renderedComponent.find('.map-button-delete').length
    ).toBe(1);
  });
});
