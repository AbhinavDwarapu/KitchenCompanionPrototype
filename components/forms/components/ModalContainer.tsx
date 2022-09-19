import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";

const ModalContainer = (props: {
  open: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  ModalContent: JSX.Element;
  onCloseAction?: () => Promise<void>;
}): JSX.Element => {
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          props.setOpened(false);
        }}
        open={props.open}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity backdrop-blur-sm backdrop-filter transition-all" />
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex justify-center h-full text-center items-center">
                <Dialog.Panel className="relative h-full overflow-y-auto bg-white text-left shadow-xl transition-all w-full max-w-[600px] ">
                  <div className="bg-white py-8 pb-32 mx-8 min-h-full">
                    <button
                      className={
                        "relative mini:left-[80%] left-[87%] bg-red-200 rounded-full w-16 h-8 hover:bg-red-400 transition"
                      }
                      onClick={() => {
                        if (typeof props.onCloseAction !== "undefined") {
                          props.onCloseAction().then(() => {
                            props.setOpened(false);
                          });
                        } else {
                          props.setOpened(false);
                        }
                      }}
                    >
                      X
                    </button>

                    {props.ModalContent}
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalContainer;
