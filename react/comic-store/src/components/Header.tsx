import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <header className="w-full flex   p-2 shadow justify-between pl-3 pr-3">
     
        <div className="ml-2 mr-2"> <Link to="/">
          <h1 className="font-bold">COMICSTORE</h1>
          <h3 className="text-end">Princeton</h3></Link>
        </div> 
        <div className=" flex items-center">
          <Link to="/store">
            <h2>Shop</h2>
          </Link>
        </div>
     
    </header>
  );
}
