import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";

const Transition = ({ children }: { children: React.ReactNode }) => {
  const { asPath } = useRouter();

  const variants = {
    out: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.15,
      },
    },
    in: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.25,
        delay: 0.15,
      },
    },
  };

  return (
    <div className="overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={asPath}
          variants={variants}
          animate="in"
          initial="out"
          exit="out"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Transition;
