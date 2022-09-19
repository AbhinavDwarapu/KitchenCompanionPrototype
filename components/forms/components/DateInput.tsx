import React, { Dispatch, SetStateAction, useState } from "react";

export default function DateInput(props: {
  name?: string;
  id: string;
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
}): JSX.Element {
  const [value, setValue] = useState(props.value ? props.value : "");

  let label;
  if (props.name) {
    label = <label className={"block w-full mb-4"}>{props.name}</label>;
  }

  return (
    <div className={"w-full flex flex-col"}>
      {label}
      <input
        type="date"
        aria-label={props.name ? props.name : props.id}
        className="h-full w-full rounded-lg h-full px-3.5 text-gray-900 bg-gray-100 transition focus:bg-gray-200 focus:outline-none selection:bg-gray-400"
        id={props.id}
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
          if (props.setValue) {
            props.setValue(e.currentTarget.value);
          }
        }}
      />
    </div>
  );
}
