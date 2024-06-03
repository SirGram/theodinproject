
import Blogs from "./Blogs";
import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "@/api/api";
import { BlogEntry } from "@/types/types";
import { useBlogsQuery } from "@/api/queries";

export default function Home() {
  const { isLoading, error, data = [] } = useBlogsQuery();

  return <Layout>
     <Blogs entries={data} />
     </Layout>;
}
