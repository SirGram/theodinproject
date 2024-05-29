import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

function ButtonWithIcon({children}:{children:ReactNode}){
  return(
    <button className="rounded-full text-gray-500 hover:text-black  border-2 w-fit p-2 hover:bg-foreground hover:text-background hover:border-accent">
      {children}</button>
  )
}

export default function SocialMedia() {
    return (
     
        <ul className="flex gap-6 text-2xl">
          <li>
            {" "}
            <ButtonWithIcon >
              <FaTwitter />
            </ButtonWithIcon>
          </li>
          <li>
            {" "}
            <ButtonWithIcon >
              <FaLinkedinIn />
            </ButtonWithIcon>
          </li>
          <li>
            {" "}
            <ButtonWithIcon >
              <FaInstagram />
            </ButtonWithIcon>
          </li>
        </ul>
    );
  }