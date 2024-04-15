import Hero from "../components/Hero.tsx"
import Comic from "../interfaces/Comic.tsx"
import FeaturedItems from "../components/FeaturedItems.tsx"
import Loading from "./Loading.tsx"

export default function Home( { items, isLoading}: { items: Comic[], isLoading:  boolean}){
    console.log(items)
    return(
        <>
        <Hero/>
        {isLoading ? 
<Loading/>
        :
        <FeaturedItems items = {items}/>}
        </>
    )

}