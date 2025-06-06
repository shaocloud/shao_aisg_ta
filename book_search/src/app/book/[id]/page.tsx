import { fetchVolume } from '@/app/utils/data'
import { getImageUrl } from '@/app/utils/data';
import Link from 'next/link'
import { LinkExternalIcon } from '@primer/octicons-react';
import type { Metadata } from 'next';
import BackButton from '@/app/book/[id]/backButton';

/**
 * Dynamically adds the title to the page.
 * 
 * @param {Promise<{ id: string }>} params - A promise that resolves to an object containing the book ID.
 * 
 * @returns Metadata object with the book title.
 */
export async function generateMetadata({
    params,
}:{
    params: Promise<{ id: string }>,
}): Promise<Metadata> {
    const bookId = (await params).id;

    const response = await fetchVolume( bookId );

    return {
        title: response.volumeInfo?.title || "Book Details",
    }
}


/**
 * Page showing information for a specific book.
 * 
 * @param {Promise<{ id: string }>} params - A promise that resolves to an object containing the book ID.
 * 
 * @returns The book's image, title, ID, authors, and description.
 */

// Client component for back button functionality


export default async function Page({
    params,
}:{
    params: Promise<{ id: string }>,
}) {
    const bookId = (await params).id;
    const response = await fetchVolume( bookId );

    return (
        <div className='flex flex-col items-center justify-center max-w-4xl mx-auto p-4'>
            <BackButton />
            <div className='flex flex-col md:flex-row items-center p-2'>
                <div className='flex-shrink-0 px-4 py-4'>
                    <img src={getImageUrl(response.volumeInfo?.imageLinks)} alt={"Image for "+ response.volumeInfo.title} />
                </div>
                <div className='card card-xl card-border bg-base-100 shadow-xl flex-1'>
                    <div className='card-body'>
                        <div className='card-title'>
                            <h1 className='text-2xl font-bold'>{response.volumeInfo.title}</h1>
                        </div>
                        {/* <p className='text-xs italic text-base/50'>{response.id}</p> */}
                        <p className='text-sm text-base-content/70'>{response.volumeInfo.authors?.join(', ') || <i>No authors listed</i>}</p>
                        <div className='divider my-1'></div>
                        <div className='flex flex-wrap gap-2'>
                            {
                                response.volumeInfo.categories?.length > 0 ?
                                    response.volumeInfo.categories.map((category : string, index : number) => (
                                        <span 
                                        key={index+category} 
                                        className='tooltip badge badge-primary badge-sm' 
                                        data-tip={category}>
                                            {
                                                // get the last 20 characters of the category
                                                category.length > 20 ?
                                                "..." + category.substring(category.length - 20) :
                                                category
                                        }</span>
                                    ))
                                    :
                                    <span className='badge badge-neutral'>Uncategorized</span>
                            }
                        </div>
                        {
                            response.volumeInfo.description ?
                                <p className='text-sm mt-2'>{response.volumeInfo.description}</p>
                                :
                                <p className='text-sm mt-2 text-base-content/50'>No description available</p>
                        }
                        <div className='divider my-1'></div>
                        <div>Bibliographical Info.</div>
                        <div className='text-sm text-base-content/70'>
                            <p>Publisher: {response.volumeInfo.publisher || <i>No publisher available</i>}</p>
                            <p>Published Date: {response.volumeInfo.publishedDate || <i>No published date available</i>}</p>
                            <p>ISBN: {response.volumeInfo.industryIdentifiers?.find((id: {type: string}) => id.type === 'ISBN_13')?.identifier || <i>No ISBN available</i>}</p>
                            <p>Page Count: {response.volumeInfo.pageCount || <i>No page count available</i>}</p>
                        </div>
                        <div className='card-actions justify-end mt-4'>
                            {
                                response.volumeInfo.previewLink &&
                                <Link 
                                    href={response.volumeInfo.previewLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className='btn btn-primary'
                                >
                                    Preview
                                    <LinkExternalIcon />
                                </Link>
                            }
                            <Link 
                                href={response.volumeInfo.infoLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className='btn btn-primary'
                            >
                                View on Google Books
                                    <LinkExternalIcon />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}