
import {ModeToggle} from './mode-toggle'
export default function Nav({text}:{text:string}) {
    return(
        <nav className="p-4  border-b-4  w-full flex items-center justify-center bg-background">
            <span className="w-full flex text-center justify-center ">
            <h1 className=" font-futuristic">MyBlog</h1>
            <h2 className='pt-3 ml-1 text-accent font-bold'>{text.toUpperCase()}</h2></span>
            <ModeToggle/>
        </nav>
        
    )
    
}