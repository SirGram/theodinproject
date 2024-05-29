import EntryCard from "@/components/EntryCard";
import Layout from "@/components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import mockData from "../../../../shared/frontend/src/lib/mockData";
import { formatDate } from "@/lib/utils";
import Markdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router-dom";
import SocialMedia from "@/components/SocialMedia";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import React from "react";

import { createRoot } from "react-dom/client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialLight,
  nord,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { SlLike } from "react-icons/sl";
import { BiLike } from "react-icons/bi";
import HoverAvatarCard from "@/components/HoverAvatarCard";
import { useTheme } from "../../context/theme-provider";
import { GrFormNextLink, GrFormPreviousLink, GrNext, GrPrevious } from "react-icons/gr";

function Share() {
  return (
    <article className="flex justify-between items-center">
      <h2 className="font-futuristic font-semibold">SHARE THIS POST</h2>
      <SocialMedia />
    </article>
  );
}
function Comments({ entry }) {
  return (
    <article className="flex flex-col justify-between ">
      <h2 className="font-futuristic font-semibold">COMMENTS</h2>
      {entry.comments.map((comment) => (
        <span>
          {comment.author}
          {comment.content}
        </span>
      ))}
    </article>
  );
}
function JoinMail() {
  return (
    <article className="flex flex-col justify-between ">
      <h2 className="font-futuristic font-semibold mb-2">
        JOIN OUR NEWSLETTER
      </h2>
      <div className="w-full h-8 flex gap-2">
        <input
          type="text"
          className="border-4 rounded-md border-gray-200 h-full p-2"
          placeholder="Enter email"
        />
        <button className=" bg-orange-300 text-white h-full px-3 rounded-md">
          Join
        </button>
      </div>
    </article>
  );
}

function BreadCrumbContainer({ id }: { id: string }) {
  return (
    <Breadcrumb className="text-gray-500 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/home" className="hover:bg-secondary p-2">
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <span>Entries</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <span>{id}</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function BlogEntry() {
  const { id } = useParams();
 // Check if id is valid
 const entryId = Number(id);
 if (isNaN(entryId) || entryId < 0 || entryId >= mockData.entries.length) {
   return <div>Entry not found.</div>;
 }

  const entry = mockData.entries[id];  const prevEntryId = entryId - 1;
  const nextEntryId = entryId + 1;
  const prevEntry = prevEntryId >= 0 ? mockData.entries[prevEntryId] : null;
  const nextEntry = nextEntryId < mockData.entries.length ? mockData.entries[nextEntryId] : null;

  const { theme } = useTheme();
  console.log(theme);
  const navigate = useNavigate();
  return (
    <Layout>
      <section className="p-8 pr-0">
        <BreadCrumbContainer id={id!} />
        <header className="mb-10 border-b-4  bg-primary-foreground p-4 ">
          <h1 className="mb-10">{entry.title}</h1>
          <div className="flex gap-1 items-center">
            <HoverAvatarCard entry={entry} />
            <p className="text-gray-500 flex gap-2">
              <span>{entry.author.name}</span>|{" "}
              <span>
                {"  "}
                {formatDate(entry.date)}
              </span>
            </p>
          </div>
        </header>
        <div className="">
          <div className="mb-6 min-h-dvh p-2 pr-6">
            <Markdown
              children={entry.content}
              components={{
                code(props) {
                  const { children, className, node, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      {...rest}
                      PreTag="div"
                      children={String(children).replace(/\n$/, "")}
                      language={match[1]}
                      style={theme === "dark" ? nord : materialLight}
                    />
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          </div>
          <div className="flex flex-col w-full justify-between py-4">
            <div className="flex items-center text-2xl mb-2">
              <span>{entry.likes}</span>
              <button className="text-2xl m-2 font-bold">
                <BiLike className=" hover:fill-slate-500 " />
              </button>
            </div>
            <div className="flex w-full justify-between p-4 gap-2">
            {prevEntry ? (
                <Link to={`/entry/${prevEntryId}`} className="flex flex-col items-center hover:bg-secondary p-2 rounded-md text-2xl bg-primary-foreground">
                  <span className="flex items-center text-lg w-full justify-start">
                    <GrFormPreviousLink />
                    Previous Entry{" "}
                  </span>
                  <span className="text-lg">{prevEntry.title}</span>
                </Link>
              ) : (
                <div className="flex flex-col items-center p-2 rounded-md text-2xl bg-primary-foreground text-gray-400">
                  <span className="flex items-center text-lg">
                   
                  This is the first entry
                  </span>
                </div>
              )}
              {nextEntry ? (
                <Link to={`/entry/${nextEntryId}`} className="flex flex-col items-center hover:bg-secondary p-2 rounded-md text-2xl bg-primary-foreground">
                  <span className="flex items-center text-lg w-full justify-end" >
                    Next Entry{" "}
                    <GrFormNextLink />
                  </span>
                  <span className="text-lg">{nextEntry.title}</span>
                </Link>
              ) : (
                <div className="flex flex-col items-center p-2 rounded-md text-2xl bg-primary-foreground text-gray-400">
                  <span className="flex items-center text-lg">
                   This is the last entry
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="border-t-4 mb-4  pt-4">
            <Comments entry={entry} />
          </div>
          <div className="border-t-4 mb-4 pt-4">
            <Share />
          </div>
          <div className=" border-t-4  pt-4">
            <JoinMail />
          </div>{" "}
        </div>
      </section>
    </Layout>
  );
}
