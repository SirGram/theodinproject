
type Props = {
    title: string;
    path: string;
    price: number;
}

export default function Card({title, path, price}: Props){

    return(
        <div className=" bg-white  w-52 hover:shadow-md mb-5 " >
            
            <div className=" h-80 overflow-hidden">
            <img src={path} alt={title} className=" w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"/>
            </div>
            <div className="text-center p-3">
            <h4 className=" mb-4  text-lg h-14 overflow-hidden  overflow-ellipsis line-clamp-2">{title}</h4>
            <h3 className=" font-semibold">$ {price}</h3></div>
        </div>
    )

}