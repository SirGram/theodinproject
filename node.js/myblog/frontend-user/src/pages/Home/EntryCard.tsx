import { formatDate, formatDateMonthAndYear } from "@/lib/utils";
import { Link } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import HoverAvatarCard from "@/components/HoverAvatarCard";
import { BlogEntry } from "@/types/types";



function EntryCard({ entry }:{entry:BlogEntry}) {
  return (
    <div className="flex flex-row  w-full">
      {/* Left side:*/}
      <div className="w-1/4">
        <img
          src={entry.image}
          alt="Entry"
          className="w-full h-auto rounded-md -skew-x-6"
        />
      </div>
      {/* Right side: */}
      <div className="flex flex-col justify-between mx-6 flex-1">
        <Link className="hover:underline flex my-2" to={`/blogs/${entry._id}`}>
          <h2 className="text-xl font-bold h-full items-center  flex">
            {entry.title}
          </h2>
        </Link>

        <div className="flex gap-3  text-gray-500 items-center justify-between">
          <div className="flex gap-3 items-center justify-between">
            <p className="flex items-center h-10">
              
              <HoverAvatarCard entry={entry}/>
              {formatDate(new Date(entry.creationDate))}
            </p>
          </div>
          <span className="flex items-center gap-1">
            {entry.likes} <BiLike />
          </span>
        </div>
      </div>
    </div>
  );
}

export default EntryCard;
