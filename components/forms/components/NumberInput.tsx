import React, { Dispatch, SetStateAction } from "react";

export default function NumberInput(props: {
  id: string;
  number: number;
  setNumber: Dispatch<SetStateAction<number>>;
}): JSX.Element {
  return (
    <div>
      <input
        step={0.01}
        type="number"
        aria-label={props.id}
        className="w-full text-center rounded-md py-2.5 px-3.5 text-gray-900 bg-gray-100 transition focus:bg-gray-200 focus:outline-none selection:bg-gray-400"
        id={props.id}
        value={props.number}
        onChange={(e) => {
          props.setNumber(
            parseInt(e.currentTarget.value)
              ? parseInt(e.currentTarget.value)
              : 0
          );
        }}
      />
    </div>
  );
}
