import { fetchData } from "./dataHandler"
import { input } from "../assets/sampleData" 

/*fetches the raw data and create a hash map as per word*/
export async function dataProcessor(){
    const data = await fetchData(input)
    const dataById = data.reduce((acc, book) => {
        acc[book.id] = book
        return acc
    }, {})
    const wordByBook = uniqueWordSetById(data)
    const processedData = {"wordByBook": wordByBook, "dataById": dataById }
    sessionStorage.setItem("processedData", JSON.stringify(processedData))
}
/*
    {word: "abc", ids:{summaryId: repetationCount}}
    e.g.
    { word: "ability",
      ids: {3 : 1, 7 : 2 }
    }
    where 3 and 7 are summaryId, 1, 2 are repetationCount of that word in the respective summary for calculating relevancy
*/

/*checks all the words prrsent in each summary and returns a sorted list of unique words along with it's mapping with the respective summary ID's */ 
const uniqueWordSetById = (data) =>  {
    const words = {}
    data.forEach(({summary, id}) => {
        const cleanedSummary = summary.toLowerCase()
        .replace(/[^a-z]/ig, ' ')
        .split(" ")
        .filter(a=>a)

        cleanedSummary.reduce((acc, val) => {
            if (!acc[val]) {
                acc[val] = {
                    word: val,
                    ids: {}
                }
            }
            if(!acc[val].ids[id]){
                acc[val].ids[id] = 1
            }else{
                acc[val].ids[id] = acc[val].ids[id]+1
            }
            return acc
        }, words)
    })
    const sortedWords = Object.values(words).sort((a,b) => {
        const str1 = a.word
        const str2 = b.word
        return str1.localeCompare(str2)
    })
    return sortedWords
}

