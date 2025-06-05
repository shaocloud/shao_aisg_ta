'use client'

import { fetchResults, Book, parseResults } from "../utils/data";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ResultItem from "./resultItem";
export default function ResultList(
    { books } : { books: Book[] }
) {
    return (
        <div className="overflow-x-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {books.map((book) => (
                    <ResultItem key={book.id} book={book} />
                ))}
            </div>
        </div>
    )
}