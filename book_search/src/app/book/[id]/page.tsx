import { fetchVolume } from '@/app/utils/data'
import { getImageUrl } from '@/app/utils/data';
import Link from 'next/link'

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
        <div className='flex flex-col items-center h-screen justify-center max-w-4xl mx-auto'>
            <div className='flex flex-col md:flex-row items-center p-4'>
                <div className='flex-shrink-0 px-4 py-4'>
                    <img src={getImageUrl(response.volumeInfo?.imageLinks)} alt={"Image for "+ response.volumeInfo.title} />
                </div>
                <div className='card card-xl card-border bg-base-100 shadow-xl flex-1'>
                    <div className='card-body'>
                        <div className='card-title flex items-center gap-2'>
                            <h1 className='text-2xl font-bold'>{response.volumeInfo.title}</h1>
                        </div>
                        <p className='text-xs italic text-base/50'>{response.id}</p>
                        <p>By {response.volumeInfo.authors?.join(', ') || "Author Unknown"}</p>
                        <p>{response.volumeInfo.description || "No description available"}</p>
                        <div className='card-actions justify-end'>
                            {
                                response.volumeInfo.previewLink &&
                                <Link 
                                    href={response.volumeInfo.previewLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className='btn btn-primary'
                                >
                                    Preview
                                </Link>
                            }
                            <Link 
                                href={response.volumeInfo.infoLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className='btn btn-primary'
                            >
                                View on Google Books
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}