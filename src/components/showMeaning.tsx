import { useState } from "react";
import { type Word } from "~/server/types";

export const ShowMeaning = ({ word }: { word: Word }) => {
  const [show, changeShow] = useState<boolean>(false);

  return (
    <div className="grid h-[4rem] w-full grid-cols-2 items-center gap-8">
      <p className="text-center text-5xl font-extrabold tracking-tight">
        Meaning:
      </p>
      {show == true && (
        <p className="text-3xl tracking-tight">{word.meaning}</p>
      )}
      {show == false && (
        <div
          onClick={() => {
            changeShow(true);
          }}
          className="bg-sky-700 px-8 py-4 hover:opacity-75"
        >
          <p className="text-center text-3xl text-white">Show</p>
        </div>
      )}
    </div>
  );
};
