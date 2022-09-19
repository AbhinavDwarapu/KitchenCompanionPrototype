import { AiFillHome } from "react-icons/ai";
import { MdMenuBook } from "react-icons/md";
import { RiFridgeFill } from "react-icons/ri";
import Link from "next/link";

const NavigationBar = (): JSX.Element => {
  return (
    <div
      className={
        "flex flex-row bg-gray-100 fixed bottom-0 w-full shadow-md z-40 h-14"
      }
    >
      <div className={"flex flex-row justify-evenly w-full"}>
        <Link href={"/recipes"}>
          <button>
            <MdMenuBook size={"26"} />
          </button>
        </Link>
        <Link href="/">
          <button className={"align-baseline"}>
            <AiFillHome size={"26"} />
          </button>
        </Link>

        {/*<Link href={"/lists"}>*/}
        {/*  <button>*/}
        {/*    <FaShoppingBasket size={"20"} />*/}
        {/*  </button>*/}
        {/*</Link>*/}
        <Link href={"/cupboard"}>
          <button>
            <RiFridgeFill size={"26"} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
