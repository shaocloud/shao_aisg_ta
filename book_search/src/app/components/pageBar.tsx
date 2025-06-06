"use client"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export function PageBar(
    {
        page,
        totalResults,
        resultsPerPage
    } : {
        page: number,
        totalResults: number,
        resultsPerPage: number
    }
) {
    // Seems to only be accurate for the last page!
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
    };
    
    return (
        <div className="flex w-full justify-center join mt-4">
            <button 
                className="join-item btn" 
                onClick={() => changePage(Math.max(1, page - 1))}
                disabled={page === 1}
            >
                «
            </button>
            <div className="join-item btn">{`Page ${page}`}</div>
            <button 
                className="join-item btn" 
                onClick={() => changePage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
            >
                »
            </button>
        </div>
    );
}