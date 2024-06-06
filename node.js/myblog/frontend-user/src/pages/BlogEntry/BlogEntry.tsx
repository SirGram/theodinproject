import Layout from "@/components/Layout/Layout";
import { formatDate } from "@/lib/utils";
import { Link,  useParams } from "react-router-dom";
import SocialMedia from "@/components/SocialMedia";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { BiLike } from "react-icons/bi";
import HoverAvatarCard from "@/components/HoverAvatarCard";
import { IBlogEntry } from "@/types/types";
import { useBlogQuery } from "@/api/queries";
import AdjustedMarkdown from "@/components/AdjustedMarkdown";


function Comments({ entry }: { entry: IBlogEntry }) {
  return (
    <article className="flex flex-col justify-between ">
      <h2 className=" font-semibold">{`(${entry.comments?.length}) COMMENTS`}</h2>
      {entry.comments?.map((comment) => (
        <span>
          {comment.user}
          {comment.content}
        </span>
      ))}
    </article>
  );
}


function BreadCrumbContainer({ id }: { id: string }) {
  return (
    <Breadcrumb className="text-muted mb-4 ">
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
  const entry = data;

  if (!entry) return <h1>No entry was found</h1>;

  return (
    <Layout showAside={false}>
      <section className="max-w-screen-lg py-6 ">
        <BreadCrumbContainer id={entry._id} />
        <header className="mb-10 py-6 border-b-4   p-4 ">
          <h1 className="mb-10 font-bold text-ring">{entry.title}</h1>
          <div className="w-full mb-4">
            <img
              src={entry.image}
              alt="Entry"
              className="w-full h-auto rounded-md "
            />
          </div>
          <div className="flex gap-1 items-center w-full justify-center">
            <HoverAvatarCard entry={entry} />
            <p className="text-muted-foreground flex gap-2">
              <span title="created on">
              Created on:{"  "}
                {formatDate(new Date(entry.creationDate))}
              </span>
              {entry.lastEditionDate && (
                <span title="last edition">
                  {"  | "}Last Edition:{"  "}
                  {formatDate(new Date(entry.creationDate))}
                </span>
              )}
            </p>
          </div>
        </header>
        <div className="container">
          <div className="mb-6 min-h-dvh p-2 pr-6">
            <AdjustedMarkdown children={entry.content} />
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
          
         
        </div>
      </section>
    </Layout>
  );
}
