type Props={
  text:string
  onClick?: ()=>void
}
export default function SubmitButton({text, onClick}:Props) {
  return (
    <div className="flex items-center justify-between">
      <button
      onClick={onClick}
        type="submit"
        className="w-full text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-full text-sm px-5 py-2.5 text-center text-xl mr-2 mb-2"
      >
       {text}
      </button>{" "}
    </div>
  );
}
