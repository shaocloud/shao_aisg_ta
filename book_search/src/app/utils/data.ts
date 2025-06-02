export async function fetchResults(query: string) {
    const result = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    if (!result.ok) {
        throw new Error(`Failed to fetch search results: ${result.statusText}`);
    }
//    console.log('result', await result.json());
    return result.json();
}