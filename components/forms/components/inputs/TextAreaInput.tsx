import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";

export default function TextAreaInput(props: {
  id: string;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  red?: boolean;
}): JSX.Element {
  const textRef = useRef<any>();

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "inherit";
      textRef.current.style.height = "30px";
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  }, [props.text]);

  let className =
    "transition-all align-middle text-center resize-y w-full h-full rounded-md py-2.5 px-3.5 text-gray-900 bg-gray-50 transition focus:bg-gray-200 focus:outline-none selection:bg-gray-400";
  if (props.red) {
    className += " text-red-600";
  }

  return (
    <div className={"w-full h-full"}>
      <textarea
        ref={textRef}
        aria-label={props.id}
        className={className}
        id={props.id}
        value={props.text}
        onChange={(e) => {
          props.setText(e.currentTarget.value);
        }}
      />
    </div>
  );
}
