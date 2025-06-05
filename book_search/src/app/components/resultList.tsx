'use client'

import { fetchResults, Book, parseResults } from "../utils/data";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ResultList(){
    const searchParams = useSearchParams();
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getRowImg = (url: string) => {
        if(url === "")
            return undefined
        else
            return url
    }

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
                const parsedResults = await parseResults(results);
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

    const columns = ['imgUrl', 'title', 'author', 'publisher', 'categories'] 
    
    if (loading) {
        return <div className="loading loading-spinner loading-lg"></div>;
    }

    if (error) {
        return <div className="alert alert-error">{error}</div>;
    }

    if (books.length === 0) {
        return <div>No results found.</div>;
    }

    return (
        <div className="overflow-x-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Results</h1>
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((key)=>
                            <th key={key} className={key === 'publisher' ? 'max-md:hidden' : ''}>
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
                                 <td key={idx} className={col === 'publisher' ? 'max-md:hidden' : ''}>
                                    {
                                    row[col as keyof Book] === undefined ? (
                                        'N/A'
                                        ) : col === 'imgUrl' ? (
                                            (<img 
                                                src={getRowImg(row[col])}
                                                width={50} 
                                                height={50}
                                                alt={row['title']}
                                                />)
                                        ) : col === 'title' ? (
                                            (<Link href={`/book/${row['id']}`}>{row[col as keyof Book] as string}</Link>)
                                        ) : col === 'publisher' ? (
                                            (row[col as keyof Book] as string)
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