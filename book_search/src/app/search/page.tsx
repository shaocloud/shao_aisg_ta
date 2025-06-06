import ResultSection from "@/app/components/resultSection";
import SearchGroup from "../components/searchGroup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description: "Book Search Page",
};

export default async function SearchPage() {
  return(
    <>
        <div>
            <SearchGroup/>
            <ResultSection/> 
        </div>
    </>
    )
}