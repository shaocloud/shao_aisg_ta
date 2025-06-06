import { fetchVolume } from '@/app/utils/data'
import { getImageUrl } from '@/app/utils/data';

export default async function Page({
    params,
}:{
    params: Promise<{ id: string }>,
}) {
    const bookId = (await params).id;

    const response = await fetchVolume( bookId );

    const imgUrl = 
        getImageUrl(response.volumeInfo?.imageLinks) ||
        "https://placehold.co/128x200?text=No+Image+Available";
        
    console.log('response', response);
    return (
        <div className='flex flex-col md:flex-row items-center p-4'>
            <div className='flex-shrink-0 px-4 py-4'>
                <img src={imgUrl} alt={"Image for "+ response.volumeInfo.title} />
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