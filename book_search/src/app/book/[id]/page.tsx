async function getSearchResults({ term }: { term: string }) {
    const result = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${term}`);
    if (!result.ok) {
        throw new Error(`Failed to fetch search results: ${result.statusText}`);
    }
//    console.log('result', await result.json());
    return result.json();
}

export default async function Page({
    params,
}:{
    params: Promise<{ id: string }>,
}) {
    const bookId = (await params).id;

    const response = await getSearchResults({ term: bookId });

    const bookNo = 4;
    console.log('response', response);
    return (
        <>
            <h1>{response.items[bookNo].volumeInfo.title} ({response.items[bookNo].volumeInfo.publishedDate})</h1>
            <p>Authors: {response.items[bookNo].volumeInfo.authors?.join(', ')}</p>
            <img src={response.items[bookNo].volumeInfo.imageLinks?.thumbnail} alt={"Image for "+ response.items[bookNo].volumeInfo.title} />
            <p>{response.items[bookNo].volumeInfo.description}</p>
        </>
    )
}