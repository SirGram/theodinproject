export default   function LettersFilter({
    titleStartsWith,
    setTitleStartsWith,
  }: {
    titleStartsWith: string;
    setTitleStartsWith: (newTitle: string) => void;
  }) {
    const updateTitleStartsWith = (letter: string) => {
      console.log(letter);
      setTitleStartsWith(letter.toLowerCase());
    };
    const letters: string[] = [
      "all",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    return (
      <div className=" flex flex-1 flex-col justify-start  gap-0 pt-5 pl-2  bg-slate-50 text-md ">
        {letters.map((letter) => (
          <button
            className={
              titleStartsWith === letter
                ? " font-black"
                : "font-thin text-slate-400 hover:text-black hover:font-black "
            }
            onClick={() => updateTitleStartsWith(letter)}
            key={letter}
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }