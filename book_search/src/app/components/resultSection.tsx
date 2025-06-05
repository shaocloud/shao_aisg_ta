'use client'

import { fetchResults, Book, parseResults } from "../utils/data";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ResultTable from "./resultTable";
import ResultList from "./resultList";
import { PageBar } from "./pageBar";

export default function ResultSection(){
    const searchParams = useSearchParams();
    const [books, setBooks] = useState<Book[]>([]);
    const [bookCount, setBookCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [useTable, setUseTable] = useState(false);
    const [page, setPage] = useState(1);

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
                const results = await fetchResults(query, author, publisher, categories, page);
                setBookCount(results.totalItems || 0);
                console.log(`Total items found: ${bookCount}`);
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
    }, [searchParams, page]);
    
    if (loading) {
        return <div className="loading loading-spinner loading-lg"></div>;
    }

    if (error) {
        return <div className="alert alert-error">{error}</div>;
    }

    if (books.length === 0) {
        return <div>No results found.</div>;
    }

    const resultText =  bookCount === 1 ? 
                        "(1 result found)" : 
                        bookCount < 1000 ?`(${bookCount} results found)` : "(1000+ results found)";

    return (
        <div className="overflow-x-auto p-4">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-4">Results{` ` + resultText}</h1>
                <input 
                    type="checkbox" 
                    id="useTable"
                    checked={useTable} 
                    onChange={(e) => setUseTable(e.target.checked)}
                    className="toggle" 
                />
            </div>
            {useTable ? <ResultTable books={books}/> : <ResultList books={books} />}
            <PageBar page={page} setPage={setPage} totalResults={bookCount} resultsPerPage={10} />
        </div>
    )
}