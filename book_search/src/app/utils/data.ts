export async function fetchResults(query: string) {
    const result = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    if (!result.ok) {
        throw new Error(`Failed to fetch search results: ${result.statusText}`);
    }
//    console.log('result', await result.json());
    return result.json();
}

export async function fetchVolume(volumeId: string) {
    const result = await fetch(`https://www.googleapis.com/books/v1/volumes/${volumeId}`);
    if (!result.ok) {
        throw new Error(`Failed to fetch ${volumeId}: ${result.statusText}`);
    }
    
    return result.json();
}

export interface iSearch {
    query: string | "",
    author: string | null,
    publisher: string | null,
    categories: string | null,
}