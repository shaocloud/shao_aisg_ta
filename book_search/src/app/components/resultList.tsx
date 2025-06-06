'use client'

import { Book } from "../utils/data";
import ResultItem from "./resultItem";

/**
 * Displays a list of book results using the ResultItem component
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Book[]} props.books - Array of book objects to display
 * @returns Rendered ResultList component
 */
export default function ResultList(
    { books } : { books: Book[] }
) {
    return (
        <div className="overflow-x-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {books.map((book) => (
                    <ResultItem key={book.id} book={book} />
                ))}
            </div>
        </div>
    )
}