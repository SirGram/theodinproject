
import newsletter from "../assets/newsletter.jpg"; // Import the newsletter image

export default function NewsLetter() {
  return (
    <div
      className="flex items-center justify-center bg-cover bg-center h-80 "
      style={{ backgroundImage: `url(${newsletter})` }}
    >
      <div className="flex flex-col items-center justify-around p-8 w-full  shadow-lg h-full backdrop-hue-rotate-30 backdrop-contrast-50 backdrop-saturate-50">
        {/* Newsletter content */}
        <h1 className="font-bold mb-4 text-yellow-300 text-center bg-slate-700  bg-opacity-30 ">
          Subscribe to Our Newsletter
        </h1>

        {/* Newsletter form */}
        <form className="flex items-center h-10 mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300p-2 w-full h-full p-2  "
            required
          />
          <button
            type="submit"
            className="bg-yellow-300 text-black font-semibold px-4 py-2 transition-opacity hover:opacity-75 focus:outline-none focus:bg-yellow-300"
          >
            Subscribe
          </button>
        </form>
        <ul className="gap-4 flex text-white mb-8 text-center text-lg font-semibold bg-slate-700 bg-opacity-30">
          <li>Latest releases </li>
          <li>|</li>
          <li>Promotions</li>
          <li>|</li>
          <li>Events</li>
        </ul>
      </div>
    </div>
  );
}
