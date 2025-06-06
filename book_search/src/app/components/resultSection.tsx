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

    useEffect(() => {
        const query = searchParams.get('query');
        const author = searchParams.get('author');
        const publisher = searchParams.get('publisher');
        const categories = searchParams.get('categories');
        const urlPage = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
        
        if (!query && !author && !publisher && !categories) {
            setBooks([]);
            return;
        }

        setLoading(true);
        setError(null);

        const fetchData = async () => {
            try {
                const results = await fetchResults(query, author, publisher, categories, urlPage);
                setBookCount(results.totalItems || 0);
                console.log(`Total items found: ${results.totalItems || 0}`);
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

    const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;

    return (
        <div className="overflow-x-auto p-4 flex flex-col">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-4">Results</h1>
                <input 
                    type="checkbox" 
                    id="useTable"
                    checked={useTable} 
                    onChange={(e) => setUseTable(e.target.checked)}
                    className="toggle" 
                />
            </div>    
            <div className="">
                {/*Loading spinner*/
                loading && 
                    <div className="loading loading-spinner loading-lg"></div>
                }
                {/*Error message*/
                error && 
                    <div className="alert alert-error">{error}</div>
                }
                {/* No results found message */
                !loading && !error && books.length === 0 && 
                    <div>No results found.</div>
                }
                {/* Display results in table or list format */
                !loading && !error && books.length > 0 && (
                    useTable ? 
                        <ResultTable books={books}/> : 
                        <ResultList books={books} />
                )}
            </div>    
            <div className="justify-end mt-4">
                <PageBar page={currentPage} totalResults={bookCount} resultsPerPage={10} />
            </div>
        </div>
    )
}