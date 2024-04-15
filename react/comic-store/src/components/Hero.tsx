import { Link } from "react-router-dom";
export default function Start() {
  return (
    <section className="bg-[url('./assets/startbg.jpg')] h-auto bg-cover snap-start flex ">
        <div className="backdrop-brightness-35 flex-1 p-5 flex flex-col items-center justify-center">
      <h1 className="text-5xl text-white w-2/3 text-center font-bold mb-36 mt-6">Turn the page, unleash the legend within!</h1>
      <p className=" text-2xl mb-10 text-white text-center">
        Calling all comic crusaders, manga masters, and graphic novel guardians!
        PrincestonComics has everything you need to fuel your fandom.
      </p>
      <Link to = '/store'>
      <button className="text-xl mb-4 text-white bg-red-600 pl-6 pr-6 pb-2 pt-2 font-semibold">Shop</button></Link></div>
    </section>
  );
}
