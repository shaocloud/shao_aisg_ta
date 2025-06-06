import SearchGroup from "@/app/components/searchGroup";
import ResultSection from "@/app/components/resultSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | BookSearch",
};

export default function Home() {

  return (
    <>
    <div className="flex h-screen m-auto">
      <SearchGroup/>
    </div>
    </>
  );
}
