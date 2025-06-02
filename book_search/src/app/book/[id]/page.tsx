import { fetchResults } from '@/app/utils/data'

export default async function Page({
    params,
}:{
    params: Promise<{ id: string }>,
}) {
    const bookId = (await params).id;

    const response = await fetchResults( bookId );

    const bookNo = 0;
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