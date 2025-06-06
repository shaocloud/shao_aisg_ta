export async function fetchResults(
    query: string | null,
    author?: string | null,
    publisher?: string | null,
    categories?: string | null,
    page: number = 1
) {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${query}`

    if(author)
        url += `+inauthor:${author}`
    if(publisher)
        url += `+inpublisher:${publisher}`
    if(categories)
        url += `+subject:${categories}`

    url += `&startIndex=${(page-1)*10}`

    console.log("[fetchResults] "+url);

    const result = await fetch(url);
    if (!result.ok) {
        throw new Error(`Failed to fetch search results: ${result.statusText}`);
    }
    
    return result.json();
}

// Handles logic for changing results to book list
export async function parseResults(
    resultJson: any
) : Promise<Book[]>
{
    const awaitedJson = await resultJson;

    if (!awaitedJson.items) {
        return [];
    }
    
    return awaitedJson.items.map((item: any) => ({
        id: item.id,
        imgUrl: getImageUrl(item.volumeInfo?.imageLinks),
        title: item.volumeInfo?.title || "Unknown Title",
        author: item.volumeInfo?.authors?.[0] || "Unknown Author",
        publisher: item.volumeInfo?.publisher || "Unknown Publisher",
        categories: item.volumeInfo?.categories || [],
        description: item.volumeInfo?.description || "No description available",
        publishedDate: item.volumeInfo?.publishedDate || "Unknown Date",
        pageCount: item.volumeInfo?.pageCount || "Unknown Page Count",
    }));
}

export async function fetchVolume(volumeId: string) {
    const result = await fetch(`https://www.googleapis.com/books/v1/volumes/${volumeId}`);
    if (!result.ok) {
        throw new Error(`Failed to fetch ${volumeId}: ${result.statusText}`);
    }
    
    return await result.json();
}

export function getImageUrl(imageLinks?: any): string {
    if (!imageLinks) {
        return "/book_not_available.svg";
    }
    
    return imageLinks.thumbnail || imageLinks.smallThumbnail || "/book_not_available.svg";
}

export interface iSearch {
    query: string | "",
    author: string | null,
    publisher: string | null,
    categories: string | null,
}

export interface Book {
    id: string;
    imgUrl: string;
    title: string;
    author: string;
    publisher: string;
    categories: string[];
    description: string;
    publishedDate: string;
    pageCount: string | number;
}