import React from 'react';
import './Autosuggest.css'

/*template for row in autosuggest panel*/
export function SuggestionRow({value, click}){
  return(
    <div className="suggestionRow" onClick={click}>
      {value}
    </div>
  )
}
// list: [{label, id}]
function AutoSuggestPanel ({list = [], onClick}) {
  return(
    <div id="autosuggestPanel">
      {
        /*Mapping the relevancy search result to  autosuggest*/
      list.map((el, index) => {
        return (<SuggestionRow 
          key = {`${el}${index}`}
          click={() => onClick(el)} 
          value = {el.label} 
        />)
      })
      }
    </div>
  )
}

export default AutoSuggestPanel;
