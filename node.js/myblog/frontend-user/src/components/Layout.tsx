import React, { ReactNode, useState } from "react";
import Nav from "./Nav";
import { FiSearch } from "react-icons/fi";
import SocialMedia from "./SocialMedia";
import mockData from "../lib/mockData";
import { Link } from "react-router-dom";
import { fetchBlogs } from "@/api/api";
import { IBlogEntry } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useBlogsQuery } from "@/api/queries";
import { useAuth } from "@/context/AuthContext";

function Search() {
  const posts = useBlogsQuery()
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<IBlogEntry[]>([]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.user.fullname.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term),
    );
    setSearchResults(results);
  };

  return (
    <div className="relative ">
      <div className="border p-3 px-6 w-full rounded-md bg-background items-center gap-4 flex focus-within:border-primary">
        <FiSearch className="text-primary"/>
        <input
          type="text"
          placeholder="Search in posts..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full bg-background focus:outline-none"
        />
      </div>
      {searchTerm && (
        <div className="absolute top-14 bg-background w-full z-20 h-screen overflow-y-auto">
          {searchResults.length > 0 ? (
            searchResults.map((post) => (
              <Link to={`/blogs/${post._id}`}>
                <div
                  key={post._id}
                  className="border-b-2 p-2 hover:bg-secondary"
                >
                  <span className="text-blue-500 hover:underline">
                    {post.title}
                  </span>
                  <p>by {post.user.username}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="p-2">No results were found.</p>
          )}
        </div>
      )}
    </div>
  );
}

function TopPosts({ topPosts }: { topPosts: IBlogEntry[] }) {
  return (
    <div>
      <h2 className="font-futuristic font-semibold mb-4">TOP ENTRIES</h2>
      {topPosts.map((post, index) => (
        <div
          key={index}
          className=" mb-4 pb-2  border-b-4 flex gap-3 items-center h-10 "
        >
          <div className="size-10">
            <img
              src={post.image}
              alt="top post image"
              className="h-full w-full object-contain"
            />
          </div>
          <Link to={`/blogs/${post._id}`}>
            <span className="font-medium w-full overflow-hidden  overflow-ellipsis hover:underline opacity-80">
              {post.title}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
}

function Layout({ showAside=true, children }: { showAside?:boolean, children: ReactNode }) {
  const {data} = useBlogsQuery()
  const posts: IBlogEntry[] = data.sort((a, b) => b.likes - a.likes);
  const topPosts = posts.slice(0, 3);

  return (
    <>
      <div className="min-h-screen flex flex-col relative">
        <Nav />
        <main className="container flex flex-col md:flex-row gap-0 justify-center flex-1  ">
          <section className=" md:col-span-1  flex-1 w-full ">
            {/* Left side content */}
            {children}
          </section>
          {showAside &&
          <aside className="md:col-span-1 md:border-l-4 p-4 flex flex-col gap-12 md:w-60 lg:w-96 bg-primary-foreground">
            {/* Right side content */}
            <Search />
            <TopPosts topPosts={topPosts} />
            <div>
              <h2 className="mb-4 font-futuristic font-semibold">FOLLOW US</h2>
              <SocialMedia />
            </div>
          </aside>}
        </main>
      </div>
    </>
  );
}

export default Layout;
