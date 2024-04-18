import Hero from "../components/Hero.tsx"
import Comic from "../interfaces/Comic.tsx"
import FeaturedItems from "../components/FeaturedItems.tsx"
import Loading from "../components/Loading.tsx"
import NewsLetter from "../components/NewsLetter.tsx"

export default function Home( { items, isLoading}: { items: Comic[], isLoading:  boolean}){
    console.log(items)
    return(
        <>
        <Hero/>
        {isLoading ? 
<Loading/>
        :
        <FeaturedItems items = {items}/>}
        <NewsLetter/>
        </>
    )

}