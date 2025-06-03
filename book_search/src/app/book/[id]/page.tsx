import { fetchResults, fetchVolume } from '@/app/utils/data'

export default async function Page({
    params,
}:{
    params: Promise<{ id: string }>,
}) {
    const bookId = (await params).id;

    const response = await fetchVolume( bookId );

    const bookNo = 0;
    console.log('response', response);
    return (
        <>
            <h1>{response.volumeInfo.title} ({response.volumeInfo.publishedDate})</h1>
            <p>{response.id}</p>
            <p>Authors: {response.volumeInfo.authors?.join(', ')}</p>
            <img src={response.volumeInfo.imageLinks?.thumbnail} alt={"Image for "+ response.volumeInfo.title} />
            <p>{response.volumeInfo.description}</p>
        </>
    )
}