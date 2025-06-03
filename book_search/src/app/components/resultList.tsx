'use client'


interface Book {
    title: string;
    author: string;
    publisher: string;
    categories: string[];
}

export default function ResultList({ 
    params 
}: { 
    params: any
}){
    const columns = ['title', 'author', 'publisher', 'categories']

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
                            <th>
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
                                 <td>
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