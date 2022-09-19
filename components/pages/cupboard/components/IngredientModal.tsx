import { Ingredient } from "../../../../utils/types";
import React, { useEffect, useRef, useState } from "react";
import DateInput from "../../../forms/components/DateInput";
import NumberInputGroup from "../../../forms/components/NumberInputGroup";
import CostInput from "../../../forms/components/CostInput";
import TextInput from "../../../forms/components/TextInput";
import TextAreaInput from "../../../forms/components/TextAreaInput";
import toast, { Toaster } from "react-hot-toast";
import { IngredientSchema } from "../../../../utils/schema";
import CategoriesDropdown from "../../../forms/components/CategoriesDropdown";
import { getObjectByNameFromDb } from "../../../../utils/storage";

const IngredientModal = (props: {
  ingredient: Ingredient;
  handleDelete: (ingredient: Ingredient) => Promise<void>;
  handleChange: (ingredient: Ingredient) => Promise<void>;
}): JSX.Element => {
  async function schemaValidate(tempIngredient: Ingredient) {
    const existingIngredient = await getObjectByNameFromDb(
      tempIngredient.name,
      "ingredient"
    );

    if (
      typeof existingIngredient !== "undefined" &&
      existingIngredient.id !== props.ingredient.id
    ) {
      const notify = () => toast("Name already exists!");
      notify();
      return;
    }

    const message = IngredientSchema.safeParse(tempIngredient);
    if (message.success) {
      await props.handleChange({ ...tempIngredient });
    } else {
      console.log(message.error.issues);
      toast.dismiss();
      const notify = () => toast(message.error.issues[0].message);
      notify();
    }
  }
  const [openCategories, setOpenCategories] = useState(false);
  const [ingredientName, setIngredientName] = useState(props.ingredient.name);
  const [quantity, setQuantity] = useState(props.ingredient.quantity);
  const [date, setDate] = useState(
    props.ingredient.expiration === undefined ? "" : props.ingredient.expiration
  );
  const [cost, setCost] = useState(
    props.ingredient.cost === undefined ? 0 : props.ingredient.cost
  );
  const [notes, setNotes] = useState(
    props.ingredient.notes === undefined ? "" : props.ingredient.notes
  );
  const [units, setUnits] = useState(
    props.ingredient.unit === undefined ? "" : props.ingredient.unit
  );
  const [category, setCategory] = useState(props.ingredient.category);
  const textRef = useRef<any>();

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "30px";
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
    const tempIngredient = { ...props.ingredient };
    tempIngredient.name = ingredientName;
    tempIngredient.quantity = quantity;
    tempIngredient.expiration = date;
    tempIngredient.cost = cost;
    tempIngredient.notes = notes;
    tempIngredient.unit = units;
    tempIngredient.category = category;
    schemaValidate(tempIngredient);
  }, [ingredientName, quantity, date, cost, notes, units, category]);

  return (
    <div>
      <Toaster />
      <div className={"flex flex-col w-full mt-12 justify-center items-center"}>
        <textarea
          ref={textRef}
          value={ingredientName}
          className={
            "resize-none text-center text-7xl py-4 font-serif rounded-3xl w-full transition-all focus:mb-2 focus:bg-gray-200 focus:outline-none selection:bg-gray-400"
          }
          onChange={(e) => {
            setIngredientName(e.currentTarget.value);
          }}
        />
      </div>

      <div
        className={"flex flex-col mb-4 justify-center items-center text-center"}
      >
        <button
          className={
            "bg-gray-300 text-xs rounded-full p-2 shadow-md text-center m-1"
          }
          onClick={() => {
            setOpenCategories(!openCategories);
          }}
        >
          {category.name}
        </button>
        <CategoriesDropdown
          id={ingredientName}
          category={category}
          setCategory={setCategory}
          open={openCategories}
          setOpen={setOpenCategories}
        />
      </div>

      <div className={"flex flex-col w-full justify-center items-center"}>
        <div className={"max-w-[270px]"}>
          <div className={"flex flex-col mt-4"}>
            <label className={"font-mono text-sm pb-1"}>Quantity</label>

            <NumberInputGroup setCount={setQuantity} count={quantity} />
          </div>
          <div className={"flex flex-col mt-4"}>
            <label className={"font-mono text-sm pb-1"}>Units</label>
            <TextInput id={"units"} text={units} setText={setUnits} />
          </div>
          <div className={"flex flex-col mt-4"}>
            <label className={"font-mono text-sm pb-1"}>Expiration</label>
            <div className={"flex w-full h-10"}>
              <DateInput
                id={"expiration"}
                name={""}
                value={date}
                setValue={setDate}
              />
            </div>
          </div>

          <div className={"flex flex-col mt-4"}>
            <label className={"font-mono text-sm pb-1"}>Cost</label>
            <CostInput id={"cost"} cost={cost} setCost={setCost} />
          </div>
        </div>
      </div>
      <div className={"flex flex-col mt-4"}>
        <label className={"font-mono text-sm pb-1"}>Notes</label>
        <TextAreaInput id={"notes"} text={notes} setText={setNotes} />
      </div>

      <div className={"flex justify-center mt-16"}>
        <button
          className={"bg-red-100 text-red-800 rounded-full p-4"}
          onClick={() => {
            props.handleDelete(props.ingredient);
          }}
        >
          Delete Ingredient
        </button>
      </div>
    </div>
  );
};

export default IngredientModal;
