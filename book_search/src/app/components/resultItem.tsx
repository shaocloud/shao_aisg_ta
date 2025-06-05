import { Book } from "../utils/data";

export default function ResultItem(
    { book } : { book: Book }
)
{
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                <img src={book.imgUrl} alt={book.title} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>Publisher: {book.publisher}</p>
                <p>Categories: {book.categories.join(', ')}</p>
                <div className="card-actions justify-end">
                    <a href={`/book/${book.id}`} className="btn btn-primary">View Details</a>
                </div>
            </div>
        </div>
    )
}
