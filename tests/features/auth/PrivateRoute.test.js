import React from 'react';
import { shallow } from 'enzyme';
import { PrivateRoute } from '../../../src/features/auth/PrivateRoute';

describe('auth/PrivateRoute', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PrivateRoute {...props} />
    );

    expect(
      renderedComponent.find('.auth-private-route').length
    ).toBe(1);
  });
});
