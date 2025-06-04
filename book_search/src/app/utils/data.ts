export async function fetchResults(
    query: string | null,
    author?: string | null,
    publisher?: string | null,
    categories?: string | null
) {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${query}`

    if(author)
        url += `+inauthor=${author}`
    if(publisher)
        url += `+inpublisher=${publisher}`
    if(categories)
        url += `+subject=${categories}`

    console.log("[fetchResults] "+url);

    const result = await fetch(url);
    if (!result.ok) {
        throw new Error(`Failed to fetch search results: ${result.statusText}`);
    }
//    console.log('result', await result.json());
    return result.json();
}

// Handles logic for changing results to book list
export function parseResults(
    resultJson: Promise<{ [key: string]: string | string[] | undefined }>
) : 
    Book[]
{
    return [
        {
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            publisher: "J. B. Lippincott & Co.",
            categories: ["Classic", "Fiction"]
        }
    ]
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

export interface Book {
    title: string;
    author: string;
    publisher: string;
    categories: string[];
}