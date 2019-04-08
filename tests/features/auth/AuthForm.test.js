import React from 'react';
import { shallow } from 'enzyme';
import { AuthForm } from '../../../src/features/auth/AuthForm';

describe('auth/AuthForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AuthForm {...props} />
    );

    expect(
      renderedComponent.find('.auth-auth-form').length
    ).toBe(1);
  });
});
