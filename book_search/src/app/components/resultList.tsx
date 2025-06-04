'use client'

import { fetchResults, Book, parseResults } from "../utils/data";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultList(){
    const searchParams = useSearchParams();
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const query = searchParams.get('query');
        const author = searchParams.get('author');
        const publisher = searchParams.get('publisher');
        const categories = searchParams.get('categories');
        
        if (!query && !author && !publisher && !categories) {
            setBooks([]);
            return;
        }

        setLoading(true);
        setError(null);

        const fetchData = async () => {
            try {
                const results = await fetchResults(query, author, publisher, categories);
                const parsedResults = await parseResults(Promise.resolve(results));
                setBooks(parsedResults);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setBooks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchParams]);

    const columns = ['title', 'author', 'publisher', 'categories']

    console.log("[resultList] searchParams: " + searchParams);
    console.log("[resultList] results: " + JSON.stringify(books));    
    
    if (loading) {
        return <div className="loading loading-spinner loading-lg"></div>;
    }

    if (error) {
        return <div className="alert alert-error">{error}</div>;
    }

    if (books.length === 0) {
        return <div>No results found. Try a different search.</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((key)=>
                            <th key={key}>
                                {key}
                            </th>
                        )
                        }
                    </tr>
                </thead>
                <tbody>
                    {books.map((row, index)=>
                        <tr key={index}>
                            {columns.map((col,idx)=>
                                 <td key={idx}>
                                    {
                                    row[col as keyof Book] === undefined ? (
                                        'N/A'
                                        ) : col === 'categories' ? (
                                            (row[col as keyof Book] as string[]).map((item : string, itemIdx : number) => (
                                                <div className="badge badge-primary" key={itemIdx}>{item}</div>
                                            ))
                                        ) : (row[col as keyof Book] as string)
                                    }
                                </td>
                            )
                        }
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </div>
    )
}