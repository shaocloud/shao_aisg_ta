import { Book } from "../utils/data";
import { useState, useEffect } from "react";

/**
 * A component that displays a single search result in a card format.
 * @param {{ book: Book }} props
 * @prop {Book} book The book object to be displayed. It should contain the following properties:
 * - id: string
 * - imgUrl: string
 * - title: string
 * - author: string
 * - publisher: string
 * - categories: string[]
 * - description: string
 */
export default function ResultItem(
    { book } : { book: Book }
)
{
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        handleResize(); // Set initial width
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getResponsiveCategoryLimit = () => {
        if (windowWidth >= 1024) return 25; // lg and above
        if (windowWidth >= 768) return 20;  // md
        if (windowWidth >= 640) return 15;  // sm
        return 10; // xs
    };

    const shortenText = (description: string, maxLength: number = 100) => {
        if (description.length <= maxLength) {
            return description;
        }
        return description.substring(0, maxLength - 3) + '...';
    }

    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure className="px-4 py-4 flex-shrink-0" style={{ flex: '1' }}>
                <img 
                src={book.imgUrl} 
                alt={book.title} 
                style={{ width: '100%', height: 'auto', aspectRatio: '1 / 1.41' }} />
            </figure>
            <div className="card-body" style={{ flex: '2' }}>
                <h2 className="card-title">{book.title}</h2>
                <div className="flex flex-col md:justify-between">
                    <div className="w-full italic">{book.author}</div>
                    <div className="w-full text-base-content/50">
                    {shortenText(book.publisher, 25)}
                    </div>
                </div>
                {
                    book.categories.length > 0 &&

                    <div className="badge badge-primary tooltip" data-tip={book.categories.join(', ')}>
                        {shortenText(book.categories.join(', '), getResponsiveCategoryLimit())}
                    </div>

                }
                {
                    book.categories.length == 0 &&
                    <div className="badge badge-neutral">
                        Uncategorized
                    </div>
                    
                }
                <div className="tooltip" data-tip={book.description}>
                    { book.description === "No description available" ?
                        <div className="text-sm mt-2 text-base-content/50">
                            {book.description}
                        </div>
                        :
                        <div className="text-sm mt-2">
                            {shortenText(book.description, 100)}
                        </div>
                    }
                </div>
                <p/>
                <div className="card-actions justify-end">
                    <a href={`/book/${book.id}`} 
                    className="btn btn-primary btn-sm md:btn-md">View Details</a>
                </div>
            </div>
        </div>
    )
}
