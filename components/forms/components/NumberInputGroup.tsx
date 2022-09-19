import React, { Dispatch, SetStateAction } from "react";

export default function NumberInputGroup(props: {
  setCount: Dispatch<SetStateAction<number>>;
  count: number;
}) {
  return (
    <div className={"flex flex-grow justify-center h-10 w-full"}>
      <button
        type={"button"}
        className={"w-16 text-2xl h-full bg-gray-300 rounded-l-lg"}
        onClick={() => {
          props.setCount(props.count + 1);
        }}
      >
        <b>+</b>
      </button>
      <input
        type={"number"}
        min={"0"}
        className={
          "w-full h-full text-2xl appearance-none outline-none focus:ring-2 ring-gray-400 bg-gray-200 text-center"
        }
        value={props.count}
        onChange={(e) => {
          props.setCount(parseInt(e.currentTarget.value));
        }}
      />
      <button
        type={"button"}
        className={"w-16 text-2xl h-full bg-gray-500 rounded-r-lg"}
        onClick={() => {
          if (props.count > 0) {
            props.setCount(props.count - 1);
          }
        }}
      >
        <b>-</b>
      </button>
    </div>
  );
}
