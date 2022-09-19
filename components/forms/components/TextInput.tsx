import React, { Dispatch, SetStateAction } from "react";

export default function TextInput(props: {
  id: string;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}): JSX.Element {
  return (
    <div className={"w-full"}>
      <input
        type={"text"}
        aria-label={props.id}
        className="resize-y text-center w-full rounded-md py-2.5 px-3.5 text-gray-900 bg-gray-100 transition focus:bg-gray-200 focus:outline-none selection:bg-gray-400"
        id={props.id}
        value={props.text}
        onChange={(e) => {
          props.setText(e.currentTarget.value);
        }}
      />
    </div>
  );
}
