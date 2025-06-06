import { Book } from "../utils/data";

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
                    <div className="badge badge-primary">
                        {book.categories.join(', ')}
                    </div>

                }
                {
                    book.categories.length == 0 &&
                    <div className="badge badge-neutral">
                        Uncategorized
                    </div>
                    
                }
                <div className="tooltip" data-tip={book.description}>
                    <div className="text-sm mt-2">
                        {shortenText(book.description, 300)}
                    </div>
                </div>
                <p/>
                <div className="card-actions justify-end">
                    <a href={`/book/${book.id}`} className="btn btn-primary">View Details</a>
                </div>
            </div>
        </div>
    )
}
