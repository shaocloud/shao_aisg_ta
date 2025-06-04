"use client"

// learned from 
// https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function SearchGroup({}){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const inputKeys = ['query', 'author', 'publisher', 'categories']

    // Reads all values in the form at once
    // replaces it in the url 
    const handleSubmit = (formData : FormData) => {
        const params = new URLSearchParams(searchParams);
        
        for(const key of inputKeys)
        {
            let val  = formData.get(key)

            if (val != null)
                params.set(key, val.toString())
            else
                params.delete(key)
        }

        replace(`${pathname}?${params.toString()}`);
    }

    const isKeepExpanded = () => {
        let optionalKeys = ['author', 'publisher', 'categories'];
        for(const key of optionalKeys)
        {
            if(searchParams.get(key))
                return false;
        }
        return true;
    }

    return (
        <form action={handleSubmit} className="flex flex-col w-lg m-auto align-middle justify-center">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                <legend className="fieldset-legend">Book Search</legend>
                <div className="join">                    
                    <label className="input join-item">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                            >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input
                        name="query"
                        type="search" 
                        required placeholder="Book Title, Keywords"
                        defaultValue={searchParams.get('query')?.toString()}/>
                    </label>
                    <button type="submit" className="btn join-item rounded-r-full">
                        Search
                    </button>
                </div>
                <div className="collapse bg-base-100 border-base-300 border">
                    <input type="checkbox" />
                    <div className="collapse-title font-semibold text-xs">Extra Filters</div>
                    <div className={`collapse-content 
                        bg-base-200 
                        border-base-300 
                        rounded-box border p-4 ` +
                        (isKeepExpanded() === true ? "collapse-open": "")}>
                        <div className="flex flex-col gap-2">
                            <label className="label">Author</label>
                            <input 
                                type="text" className="input" placeholder="Author"
                                name="author"
                                defaultValue={searchParams.get('author')?.toString()}/>

                            <label className="label">Publisher</label>
                            <input type="text" className="input" placeholder="Publisher"
                                name="publisher"
                                defaultValue={searchParams.get('publisher')?.toString()}/>

                            <label className="label">Categories</label>
                            <input type="text" className="input" placeholder="Category"
                                name="categories"
                                defaultValue={searchParams.get('categories')?.toString()}/>
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
    )
}