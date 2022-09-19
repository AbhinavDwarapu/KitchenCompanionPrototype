import { useRouter } from "next/router";
import { RiMenuFill } from "react-icons/ri";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import { DragControls, useCycle } from "framer-motion";

const Header = (props: {
  controls: DragControls;
  startDrag: (event: any) => void;
}): JSX.Element => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  const router = useRouter();
  let buttonIcon;
  let currentPath: string;
  if (router.pathname === "/") {
    currentPath = "/home";
  } else {
    currentPath = router.pathname;
  }

  if (currentPath.slice(1).includes("/")) {
    buttonIcon = (
      <button
        className={"hs-dropdown-toggle mt-4 ml-4 min-sm:ml-8 min-sm:mt-8"}
        onClick={() => {
          router.back();
        }}
      >
        <IoIosArrowBack size={"32"} />
      </button>
    );
  } else {
    buttonIcon = (
      <button
        className={"hs-dropdown-toggle mt-4 ml-4 min-sm:ml-8 min-sm:mt-8"}
        onClick={() => {
          toggleOpen();
        }}
      >
        <RiMenuFill size={"32"} />
      </button>
    );
  }

  return (
    <div className="top-0 w-full rounded-b-2xl pb-4">
      {buttonIcon}
      <Sidebar open={isOpen} toggle={toggleOpen} controls={props.controls} />
      <div className="truncate text-right min-md:text-center px-4 min-sm:px-8 pb-8 text-5xl min-sm:text-7xl font-bold">
        {currentPath}
      </div>
      {/*<div className={"pb-4"}>*/}
      {/*  <SearchBar />*/}
      {/*</div>*/}
    </div>
  );
};

export default Header;
