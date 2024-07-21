"use client";
import React from "react";
import { AnimatePresence } from "framer-motion";

const AnimPresence = ({ children }: { children: React.ReactNode }) => {
  return <AnimatePresence>{children}</AnimatePresence>;
};

export default AnimPresence;
