import { Book } from "../utils/data";
import Link from "next/link";

export default function ResultTable(
    { books } : { books: Book[] }
){
    const columns = ['imgUrl', 'title', 'author', 'publisher', 'categories'] 

    const getRowImg = (url: string) => {
        if(url === "")
            return undefined
        else
            return url
    }

    return (            
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
    )


}