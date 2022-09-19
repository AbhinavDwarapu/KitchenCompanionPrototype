import React from "react";

export default function Error(props: { message: string }) {
  return (
    <div
      className={"text-center bg-red-300 rounded-3xl transition py-2 px-2 mb-4"}
    >
      {props.message}
    </div>
  );
}
