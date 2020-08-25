

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

import React from 'react';
import Enzyme, { shallow, mount } from "enzyme";
import SearchBar from "./searchBar/SearchBar";
import AutoSuggestPanel, {SuggestionRow} from "./autosuggestPanel/Autosuggest"
import {BookCard} from './cardTemplate/Template'
import Adapter from "enzyme-adapter-react-16";
import { unmountComponentAtNode } from "react-dom";

// let container = null;
// beforeEach(() => {
//   // setup a DOM element as a render target
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });
// it('renders without crashing', () => {
//   shallow(<SearchBar/>);
// });

// afterEach(() => {
//   // cleanup on exiting
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });
var data = [{"author": "Dan Harris","bookId": 0,"id": 0,
"summary": "The Book in Three Sentences: Practicing meditation and mindfulness will make you at least 10 percent happier. Being mindful doesn’t change the problems in your life, but mindfulness does help you respond to your problems rather than react to them. Mindfulness helps you realize that striving for success is fine as long as you accept that the outcome is outside your control.",
"title": "Anything You Want"},{"author": "Dan Harris","bookId": 1,"id": 2,
"summary": "The Book in Three Sentences: Practicing meditation and mindfulness will make you at least 10 percent happier. Being mindful doesn’t change the problems in your life, but mindfulness does help you respond to your problems rather than react to them. Mindfulness helps you realize that striving for success is fine as long as you accept that the outcome is outside your control.",
"title": "Anything"}]

Enzyme.configure({ adapter: new Adapter() });
  
describe("Search component", () => {
  /*SearchBar*/
  test("renders", () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.exists()).toBe(true);
  });

  /*SearchBar input test*/
  test("user text is echoed", () => {
    const wrapper = shallow(<SearchBar onSubmit={() => {}} />);
    wrapper.find("#myInput").simulate("change", {
      target: { value: "s" }
    });
    expect(wrapper.find("#myInput").props().value).toEqual("s");
  });

  /*AutoSuggestPanel*/
  test("renders AutoSuggestPanel", () => {
    const wrapper = shallow(<AutoSuggestPanel />);

    expect(wrapper.exists()).toBe(true);
  });
  test("when the value is passed to AutoSuggestPanel", () => {
    const wrapper = shallow(<AutoSuggestPanel list={data} onClick={()=>{}} />);
    wrapper.find("#autosuggestPanel").simulate("mouseover");
    expect(wrapper.find('#autosuggestPanel').length).toEqual(1);
  });

   /*SuggestionRow in AutoSuggestPanel*/
  test("render suggestion", () => {
    const wrapper = shallow(<SuggestionRow />);

    expect(wrapper.exists()).toBe(true);
  });
  test("when the value echoed", () => {
    const wrapper = shallow(<SuggestionRow value={data[0].title} onClick={()=>{}} />);
    wrapper.find(".suggestionRow").simulate("mouseover");
    expect(wrapper.find('.suggestionRow').length).toEqual(1);
    expect(wrapper.find('.suggestionRow').text()).toEqual("Anything You Want")
  });

  /*Book card template*/
  test("render bookcard", () => {
    const wrapper = shallow(<BookCard />);
    expect(wrapper.exists()).toBe(true);
  });
  test("when the value passed to book card", () => {
    const wrapper = shallow(<BookCard/>);
    wrapper.setProps({title:data[0].title, author:data[0].author, summary:data[0].summary});
    expect(wrapper.find('.bookCard').length).toEqual(1)
    expect(wrapper.find('.bookCard .title').text()).toEqual("Anything You Want")
  });
})
