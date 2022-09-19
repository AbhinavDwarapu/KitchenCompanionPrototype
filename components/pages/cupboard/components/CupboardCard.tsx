import { Ingredient } from "../../../../utils/types";
import { formatDistanceToNow, isPast } from "date-fns";
import ModalContainer from "../../../forms/components/ModalContainer";
import { useState } from "react";
import IngredientModal from "./IngredientModal";

const CupboardCard = (props: {
  ingredient: Ingredient;
  handleDelete: (ingredient: Ingredient) => Promise<void>;
  handleChange: (ingredient: Ingredient) => Promise<void>;
}): JSX.Element => {
  const [open, setOpen] = useState(false);
  let expired = false;
  let expiredText;

  // Check if ingredient is expired and exists in cupboard
  if (props.ingredient.expiration && props.ingredient.quantity !== 0) {
    expired = isPast(Date.parse(props.ingredient.expiration));
    if (!expired) {
      // Expires in text
      expiredText = (
        <div className={"text-xs opacity-40 font-bold text-left w-full pt-0.5"}>
          {"Expires in "}
          {formatDistanceToNow(Date.parse(props.ingredient.expiration))}.
        </div>
      );
    } else {
      // Expired text
      expiredText = (
        <div
          className={
            "text-xs text-red-700 opacity-70 font-bold text-left w-full pt-0.5"
          }
        >
          Expired {formatDistanceToNow(Date.parse(props.ingredient.expiration))}{" "}
          ago.
        </div>
      );
    }
  }

  // If unit exists
  let unit;
  if (props.ingredient.unit) {
    unit = <div className={"text-sm"}>{props.ingredient.unit}</div>;
  } else {
    unit = <div className={"text-sm"}>unit(s)</div>;
  }

  // Change colour of card, red if expired, orange if empty
  let containerClassName =
    "flex flex-col justify-center p-4 rounded-lg shadow-md w-full";
  if (expired) {
    containerClassName += " bg-red-200 text-red-700";
  } else {
    containerClassName += " bg-gray-200 ";
    if (props.ingredient.quantity === 0) {
      containerClassName += " bg-orange-200 text-orange-700";
    }
  }

  return (
    <div className={containerClassName}>
      <div className={"flex flex-col justify-center"}>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          <ModalContainer
            open={open}
            setOpened={setOpen}
            ModalContent={
              <IngredientModal
                ingredient={props.ingredient}
                handleDelete={props.handleDelete}
                handleChange={props.handleChange}
              />
            }
          />
          <div className={"flex flex-row justify-between px-2"}>
            <div className={"flex flex-col justify-center"}>
              <div className={"flex text-2xl text-left w-full"}>
                {props.ingredient.name}
              </div>
              {expiredText}
            </div>

            <div
              className={"flex flex-col text-right items-center justify-center"}
            >
              <div className={"text-2xl font-bold"}>
                {props.ingredient.quantity}
              </div>
              {unit}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CupboardCard;
