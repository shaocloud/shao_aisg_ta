"use client"

import { useState } from 'react';
import Form from 'next/form'
// learned from 
// https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { iSearch } from "@/app/utils/data";
import { useDebouncedCallback } from 'use-debounce';

export default function SearchGroup({}){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [inputValue, setInputValue] = useState<iSearch>(
        { 
            query: '', 
            author: '', 
            publisher: '', 
            categories: '' 
        });

    const handleUpdateSearch = () => {

    }

    const handleSearch = useDebouncedCallback((term: string) => {
        console.log(term);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <Form action="/search" className="flex flex-col w-lg h-lg mx-auto justify-center">
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
                        type="search" 
                        required placeholder="Book Title, Keywords"
                        onChange={(e) => {
                        handleSearch(e.target.value);
                        }}
                        defaultValue={searchParams.get('query')?.toString()}/>
                    </label>
                    <button type="submit" className="btn join-item rounded-r-full">
                        Search
                    </button>
                </div>
                <div className="collapse bg-base-100 border-base-300 border">
                    <input type="checkbox" />
                    <div className="collapse-title font-semibold text-xs">Extra Filters</div>
                    <div className="collapse-content bg-base-200 border-base-300 rounded-box border p-4">
                        <div className="flex flex-col gap-2">
                            <label className="label">Author</label>
                            <input type="text" className="input" placeholder="Author" />

                            <label className="label">Publisher</label>
                            <input type="text" className="input" placeholder="Publisher" />

                            <label className="label">Categories</label>
                            <input type="text" className="input" placeholder="Category" />
                        </div>
                    </div>
                </div>
            </fieldset>
        </Form>
    )
}