'use client'

import { fetchResults, Book, parseResults } from "../utils/data";
import { useSearchParams } from "next/navigation";

export default function ResultList(){
    const searchParams = useSearchParams();
    const results = fetchResults(
        searchParams.get('query'),
        searchParams.get('author'),
        searchParams.get('publisher'),
        searchParams.get('categories')
    )
    const parsedResults : Book[] = parseResults(results);
    
    const columns = ['title', 'author', 'publisher', 'categories']

    console.log("[resultList] " + searchParams);
    console.log("[resultList] " + JSON.stringify(results));

    const dummyResults: Book[] = [
        {
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            publisher: "Allen & Unwin",
            categories: ["Fantasy", "Adventure"]
        },
        {
            title: "Pride and Prejudice",
            author: "Jane Austen",
            publisher: "T. Egerton, Whitehall",
            categories: ["Romance", "Classic"]
        },
        {
            title: "1984",
            author: "George Orwell",
            publisher: "Secker & Warburg",
            categories: ["Dystopian", "Science Fiction"]
        },
        {
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            publisher: "J. B. Lippincott & Co.",
            categories: ["Classic", "Fiction"]
        }
    ];
    
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
                    {dummyResults &&
                    dummyResults.map((row, index)=>
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