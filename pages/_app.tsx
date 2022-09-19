import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavigationBar from "../components/navigation/NavigationBar";
import Header from "../components/header/Header";
import PageTransition from "../components/transitions/PageTransition";
import { useDragControls, motion } from "framer-motion";
import { MouseEvent, TouchEvent, PointerEvent } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const controls = useDragControls();

  function startDrag(event: MouseEvent | TouchEvent | PointerEvent) {
    controls.start(event);
  }
  return (
    <motion.div onPointerDown={startDrag}>
      <Header controls={controls} startDrag={startDrag} />
      <PageTransition>
        <Component {...pageProps} />
      </PageTransition>
      <NavigationBar />
    </motion.div>
  );
}

export default MyApp;
