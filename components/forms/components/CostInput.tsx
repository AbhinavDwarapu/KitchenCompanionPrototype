import React, { Dispatch, SetStateAction } from "react";

export default function CostInput(props: {
  id: string;
  setCost: Dispatch<SetStateAction<number>>;
  cost: number;
}): JSX.Element {
  return (
    <div className={"flex flex-grow justify-center h-10 w-full"}>
      <div
        className={
          "flex rounded-l-lg w-32 bg-gray-200 justify-center items-center"
        }
      >
        €
      </div>
      <input
        step={0.01}
        type="number"
        aria-label={props.id}
        className="flex-grow text-center text-xl rounded-r-lg text-gray-900 bg-gray-100 transition focus:bg-gray-200 focus:outline-none selection:bg-gray-400"
        id={props.id}
        value={props.cost}
        onChange={(e) => {
          props.setCost(parseFloat(e.currentTarget.value));
        }}
      />
    </div>
  );
}
