import { useState } from "react";
import EntryCard from "./EntryCard";
import { PaginationDemo } from "./PaginationDemo";

export default function Blogs({ entries }) {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 3;
  const totalPages = Math.ceil(entries.length / entriesPerPage);

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * entriesPerPage;
  const selectedEntries = entries.slice(startIndex, startIndex + entriesPerPage);

  return (
    <section className="p-4 pr-0 ">
      <h1 className=" font-extrabold py-10 pr-10 border-b-4 font-futuristic">READ THROUGH OUR LATEST POSTS</h1>
      <div className="flex flex-col  mb-6 ">
        {selectedEntries.map((entry) => (
          <article className="border-b-4 py-6 pr-4" key={entry.id}>
            <EntryCard entry={entry} />
          </article>
        ))}
      </div>
      <PaginationDemo
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}