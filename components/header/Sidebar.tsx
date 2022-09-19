import { DragControls, motion } from "framer-motion";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function Sidebar(props: {
  open: boolean;
  toggle: any;
  controls: DragControls;
}): JSX.Element {
  const router = useRouter();

  const ref: any = useRef(null);
  const [divWidth, setDivWidth] = useState(100);

  useEffect(() => {
    if (ref.current.offsetWidth) {
      setDivWidth(ref.current.offsetWidth);
    }
  }, [router]);

  let routes = [
    "/home",
    "/recipes",
    "/cupboard",
    "/categories",
    "/new/recipe",
    "/new/ingredient",
  ];

  let home =
    "m-2 pl-2 h-12 align-middle text-xl text-center hover:bg-gray-50 rounded-md transition " +
    (router.pathname === "/" ? "bg-gray-50 text-black" : " text-gray-300");

  let recipes =
    "m-2 pl-2 h-12 align-middle text-xl text-center hover:bg-gray-50 rounded-md transition " +
    (router.pathname === "/recipes"
      ? "bg-gray-50 text-black"
      : " text-gray-300");

  let cupboard =
    "m-2 pl-2 h-12 align-middle text-xl text-center hover:bg-gray-50 rounded-md transition " +
    (router.pathname === "/cupboard"
      ? "bg-gray-50 text-black"
      : " text-gray-300");

  let category =
    "m-2 pl-2 h-12 align-middle text-xl text-center hover:bg-gray-50 rounded-md transition " +
    (router.pathname === "/category"
      ? "bg-gray-50 text-black"
      : " text-gray-300");

  let newRecipe =
    "m-2 pl-2 h-12 align-middle text-xl text-center hover:bg-gray-50 rounded-full transition " +
    (router.pathname === "/new/recipe"
      ? "bg-gray-50 text-black"
      : " text-gray-300");

  let newIngredient =
    "m-2 pl-2 h-12 align-middle text-xl text-center hover:bg-gray-50 rounded-full transition " +
    (router.pathname === "/new/ingredient"
      ? "bg-gray-50 text-black"
      : " text-gray-300");

  let newCategory =
    "m-2 pl-2 h-12 align-middle text-xl text-center hover:bg-gray-50 rounded-full transition " +
    (router.pathname === "/new/category"
      ? "bg-gray-50 text-black"
      : " text-gray-300");

  let debug =
    "m-2 pl-2 h-12 align-middle text-xl text-center hover:bg-gray-50 rounded-full transition " +
    (router.pathname === "/debug/database"
      ? "bg-gray-50 text-black"
      : " text-gray-300");

  return (
    <motion.div
      ref={ref}
      animate={
        props.open ? { x: 0, opacity: 1 } : { x: -divWidth - 10, opacity: 0 }
      }
      transition={{ duration: 0.1, type: "tween" }}
      drag={"x"}
      onDragEnd={(event, info) => {
        if (props.open) {
          if (info.point.x < 100) {
            props.toggle();
          } else if (info.velocity.x < -100) {
            props.toggle();
          }
        } else {
          if (info.velocity.x < -100) {
            props.toggle();
          }
        }
      }}
      // dragListener={false}
      dragMomentum={false}
      dragConstraints={{ right: 0 }}
      // dragControls={props.controls}
      dragElastic={0}
      className="fixed top-0 h-full w-2/3 md:w-1/2 min-lg:w-1/4 z-50 text-gray-900 bg-gray-700 bg-opacity-90 backdrop-filter backdrop-blur-md pt-16"
    >
      <div className={"flex flex-col "}>
        <div className={home}>
          <Link href={"/"}>
            <button
              className={"w-full h-full text-left pl-2"}
              onClick={() => {
                props.toggle();
              }}
            >
              Home
            </button>
          </Link>
        </div>

        <div className={recipes}>
          <Link href={"/recipes"}>
            <button
              className={"w-full h-full text-left pl-2"}
              onClick={() => {
                props.toggle();
              }}
            >
              Your Recipes
            </button>
          </Link>
        </div>

        <div className={cupboard}>
          <Link href={"/cupboard"}>
            <button
              className={"w-full h-full text-left pl-2"}
              onClick={() => {
                props.toggle();
              }}
            >
              Your Cupboard
            </button>
          </Link>
        </div>

        <div className={category}>
          <Link href={"/category"}>
            <button
              className={"w-full h-full text-left pl-2"}
              onClick={() => {
                props.toggle();
              }}
            >
              Your Categories
            </button>
          </Link>
        </div>

        <div className={debug}>
          <Link href={"/debug/database"}>
            <button
              className={"w-full h-full text-left pl-2"}
              onClick={() => {
                props.toggle();
              }}
            >
              Reset Database
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Sidebar;
