import Layout from "@/components/Layout";
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
import {
  materialLight,
  nord,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { SlLike } from "react-icons/sl";
import { BiLike } from "react-icons/bi";
import HoverAvatarCard from "@/components/HoverAvatarCard";
import { useTheme } from "../../context/theme-provider";
import {
  GrFormNextLink,
  GrFormPreviousLink,
  GrNext,
  GrPrevious,
} from "react-icons/gr";
import { IBlogEntry } from "@/types/types";
import { useBlogQuery } from "@/api/queries";
import AdjustedMarkdown from "@/components/AdjustedMarkdown";

function Share() {
  return (
    <article className="flex justify-between items-center">
      <h2 className="font-futuristic font-semibold">SHARE THIS POST</h2>
      <SocialMedia />
    </article>
  );
}
function Comments({ entry }: { entry: IBlogEntry }) {
  return (
    <article className="flex flex-col justify-between ">
      <h2 className="font-futuristic font-semibold">{`(${entry.comments?.length}) COMMENTS`}</h2>
      {entry.comments?.map((comment) => (
        <span>
          {comment.user}
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

  const { isLoading, error, data } = useBlogQuery(id);
  const entry = data
  

  if (!entry) return <h1>No entry was found</h1>;

  return (
    <Layout>
      <section className="p-8 pr-0">
        <BreadCrumbContainer id={entry._id} />
        <header className="mb-10 border-b-4  bg-primary-foreground p-4 ">
          <h1 className="mb-10">{entry.title}</h1>
          <div className="flex gap-1 items-center">
            <HoverAvatarCard entry={entry} />
            <p className="text-gray-500 flex gap-2">
              <span>{entry.user.fullname}</span>|{" "}
              <span>
                {"  "}
                {formatDate(new Date(entry.creationDate))}
              </span>
            </p>
          </div>
        </header>
        <div className="">
          <div className="mb-6 min-h-dvh p-2 pr-6">
            <AdjustedMarkdown children={entry.content}/>
           
          </div>
          <div className="flex flex-col w-full justify-between py-4">
            <div className="flex items-center text-2xl mb-2">
              <span>{entry.likes}</span>
              <button className="text-2xl m-2 font-bold">
                <BiLike className=" hover:fill-slate-500 " />
              </button>
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
