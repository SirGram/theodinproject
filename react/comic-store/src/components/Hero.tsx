import { Link } from "react-router-dom";
import startbg from '../assets/startbg.png'
export default function Hero() {
  return (
    <section className="bg-[url('${startbg}')] bg-cover bg-center snap-start flex h-screen"  style={{ backgroundImage: `url(${startbg})` }}>
        <div className="flex-1 p-5 flex flex-col items-center justify-center backdrop-saturate-50 ">
      <h1 className="  text-5xl bg-slate-100 bg-opacity-90 w-2/3 text-center font-bold mb-36 mt-6">Turn the page, unleash the legend within!</h1>
      <h3 className=" text-2xl mb-10 text-black text-center bg-slate-100 bg-opacity-90">
        Calling all comic crusaders, manga masters, and graphic novel guardians!
        PrincestonComics has everything you need to fuel your fandom.
      </h3>
      <Link to = '/store'>
      <button className="text-xl mb-4 text-white bg-red-600 pl-6 pr-6 pb-2 pt-2 font-semibold"><h2> Let's shop</h2></button></Link></div>
    </section>
  );
}
