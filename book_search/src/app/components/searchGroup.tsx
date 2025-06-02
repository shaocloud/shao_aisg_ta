export default function SearchGroup({}){
    return (
        <div className="flex flex-col w-lg h-lg mx-auto justify-center">
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
                        <input type="search" required placeholder="Book Title, Keywords" />
                    </label>
                    <button className="btn join-item rounded-r-full">
                        Search
                    </button>
                </div>
                <div className="collapse bg-base-100 border-base-300 border">
                    <input type="checkbox" />
                    <div className="collapse-title font-semibold text-xs">Extra Filters</div>
                    <div className="collapse-content bg-base-200 border-base-300 rounded-box border p-4">
                        <div className="flex flex-col gap-2">
                            <label className="label">Author</label>
                            <input type="text" className="input" required placeholder="Author" />

                            <label className="label">Publisher</label>
                            <input type="text" className="input" required placeholder="Publisher" />

                            <label className="label">Categories</label>
                            <input type="text" className="input" required placeholder="Category" />
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    )
}