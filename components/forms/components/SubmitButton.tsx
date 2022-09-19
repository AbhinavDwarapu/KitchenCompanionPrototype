import React from "react";

export default function SubmitButton(): JSX.Element {
  return (
    <div>
      <button className={"bg-amber-500 w-24 h-12 rounded-3xl"} type={"submit"}>
        Save
      </button>
    </div>
  );
}
