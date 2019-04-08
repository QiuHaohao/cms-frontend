import React from 'react';
import { shallow } from 'enzyme';
import { PageAuth } from '../../../src/features/auth/PageAuth';

describe('auth/PageAuth', () => {
  it('renders node with correct class name', () => {
    const props = {
      login: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PageAuth {...props} />
    );

    expect(
      renderedComponent.find('.auth-page-auth').length
    ).toBe(1);
  });
});
