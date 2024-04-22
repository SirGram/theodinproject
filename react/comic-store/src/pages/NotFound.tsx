import spiderman from '../assets/spiderman.png'
export default function NotFound(){
    
    return(
        <div className="flex-1 flex items-center justify-center bg-red-800">
            <div className="flex-1 flex bg-amber-200 pt-10 pr-10 justify-center ">
        <img src={spiderman} alt="spiderman" />
        <div className=" h-full">
            <h1 className=" text-center text-8xl mb-10">Oooops!</h1>
            <h2 className=" text-center text-2xl">Looks like this page doesn't exist</h2></div>
            </div>
        </div>
    )
}