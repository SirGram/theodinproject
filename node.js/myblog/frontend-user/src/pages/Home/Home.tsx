import Nav from "@/components/Nav";
import mockData from "../../../../shared/frontend/src/lib/mockData";
import Blogs from "./Blogs";
import Layout from "@/components/Layout";

export default function Home() {
    return(       
        <Layout>
        <Blogs entries={mockData.entries} />
        </Layout>       

    )    
}