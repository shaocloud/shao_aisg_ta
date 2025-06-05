"use client"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export function PageBar(
    {
        page,
        setPage,
        totalResults,
        resultsPerPage
    } : {
        page: number,
        setPage: (page: number) => void,
        totalResults: number,
        resultsPerPage: number
    }
) {
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const changePage = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) {
            return;
        }
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());

        replace(`${pathname}?${params.toString()}`);
        
        setPage(newPage);
    };
    
    return (
        <div className="btn-group">
            <button 
                className="btn" 
                onClick={() => changePage(Math.max(1, page - 1))}
                disabled={page === 1}
            >
                Previous
            </button>
            <span className="btn">{`Page ${page} of ${totalPages}`}</span>
            <button 
                className="btn" 
                onClick={() => changePage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
            >
                Next
            </button>
        </div>
    );
}