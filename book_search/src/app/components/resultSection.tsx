'use client'

import { fetchResults, Book, parseResults } from "../utils/data";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ResultTable from "./resultTable";

export default function ResultSection(){
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
            <ResultTable books={books}/>
        </div>
    )
}