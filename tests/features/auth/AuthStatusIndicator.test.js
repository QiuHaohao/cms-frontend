import React from 'react';
import { shallow } from 'enzyme';
import { AuthStatusIndicator } from '../../../src/features/auth/AuthStatusIndicator';

describe('auth/AuthStatusIndicator', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AuthStatusIndicator {...props} />
    );

    expect(
      renderedComponent.find('.auth-auth-status-indicator').length
    ).toBe(1);
  });
});
