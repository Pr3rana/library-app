/* Fetches the original data once from the source and then stores to localStorage */
export function fetchData(value){
    return new Promise((resolve, reject) => {
        const cachedData = localStorage.getItem("data")
        if (cachedData){
            resolve(JSON.parse(cachedData))
        } else {
            resolve(createBookSet(value))
        }
    })
}

/* Maps the title, author and summary using the id, and stores to localStorage */
function createBookSet({titles, summaries, authors}) {
    const authorBookMap = authors.reduce((acc, val) => {
        acc[val.book_id] = val
        return acc
    }, {})
    const data = summaries.map(({summary, id}) => {
        return {
            id,
            bookId: authorBookMap[id].book_id,
            author: authorBookMap[id].author,
            summary,
            title: titles[id]
        }
    })
    localStorage.setItem("data", JSON.stringify(data))
    return data
}
