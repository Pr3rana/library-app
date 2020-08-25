import React from 'react';
import renderer from 'react-test-renderer';
import Template, {BookCard} from './Template'

it('renders correctly', () => {
  const tree = renderer
    .create(<Template />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
it('renders correctly', () => {
    const tree = renderer
      .create(<BookCard title="Test" author="Prerna" summary="true"/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});
