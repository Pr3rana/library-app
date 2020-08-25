import React from 'react';
import renderer from 'react-test-renderer';
import AutoSuggestPanel, {SuggestionRow} from './Autosuggest'

it('renders correctly', () => {
  const tree = renderer
    .create(<AutoSuggestPanel list={[]} onClick={()=>{}}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
it('renders correctly', () => {
    const tree = renderer
      .create(<SuggestionRow title="Test" onClick={()=>{}}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});
