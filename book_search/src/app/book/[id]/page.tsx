import { fetchVolume } from '@/app/utils/data'
import { getImageUrl } from '@/app/utils/data';

/**
 * Page showing information for a specific book.
 * 
 * @param {Promise<{ id: string }>} params - A promise that resolves to an object containing the book ID.
 * 
 * @returns The book's image, title, ID, authors, and description.
 */

export default async function Page({
    params,
}:{
    params: Promise<{ id: string }>,
}) {
    const bookId = (await params).id;

    const response = await fetchVolume( bookId );

    return (
        <div className='flex flex-col md:flex-row items-center p-4'>
            <div className='flex-shrink-0 px-4 py-4'>
                <img src={getImageUrl(response.volumeInfo?.imageLinks)} alt={"Image for "+ response.volumeInfo.title} />
            </div>
            <div>
                <h1>{response.volumeInfo.title} ({response.volumeInfo.publishedDate})</h1>
                <p>{response.id}</p>
                <p>Authors: {response.volumeInfo.authors?.join(', ')}</p>
                <p>{response.volumeInfo.description}</p>
            </div>
        </div>
    )
}