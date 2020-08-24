import { dataProcessor } from "./dataProcesser"

/*
    {
        bookId: number
        author: string
        id: number
        summary: string
        titles: string
    }
*/
/* */
export async function searchBook(searchText, noOfItems) {
    const result = []
    let dataById, wordByBook
    if (sessionStorage.getItem("processedData") === null) {
        await dataProcessor()
    }
    dataById =  JSON.parse(sessionStorage.getItem('processedData'))["dataById"]
    wordByBook = JSON.parse(sessionStorage.getItem('processedData'))["wordByBook"]
    const matches = []// [{bookId: count},....]
    searchText.split(" ").filter(a => a).forEach((text) => {
        const searchResult = cumstomSearch(wordByBook, text)
        if (searchResult) {
            Object.keys(searchResult.ids).reduce((acc, val)=>  {
                if (!acc[val]) {
                    acc[val] = searchResult.ids[val]
                }
                acc[val] += searchResult.ids[val]
                return acc
            }, matches) 
        }
    })
    const bookIds = Object.keys(matches) // [bookids, ...]
    const rankedBookIds= bookIds.sort((a, b) => matches[b] - matches[a] || a-b)
    rankedBookIds.forEach((id) => {
        result.push(dataById[id])
    })
    noOfItems? result.length = noOfItems-1 : result.filter(a => a)
    return result
}


/*applying binary search sorted list of unique words(wordByBook)*/
function cumstomSearch(uniqueWords, inputText){
    let firstIndex  = 0,
        lastIndex   = uniqueWords.length - 1,
        middleIndex = Math.floor((lastIndex + firstIndex)/2) 
    if (uniqueWords[firstIndex] === inputText) {
        return uniqueWords[firstIndex]
    } else if (uniqueWords[lastIndex] === inputText) {
        return uniqueWords[lastIndex]
    }
    while((uniqueWords[middleIndex].word !== inputText) && firstIndex < lastIndex)
    {
        let currKey = uniqueWords[middleIndex].word 
        if (inputText < currKey)
        {
            lastIndex = middleIndex - 1 
        } 
        else if (inputText > currKey)
        {
            firstIndex = middleIndex + 1 
        } else {
            break 
        }
        middleIndex = Math.floor((lastIndex + firstIndex)/2) 
    }
  return (uniqueWords[middleIndex].word === inputText) ?  uniqueWords[middleIndex]: false
}
