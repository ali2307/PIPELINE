"use client";
import { ReactNode, useState } from "react";
import { Inter } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
const NavBar = dynamic(() => import("./navBar/page"), {
  ssr: false, // Disable server-side rendering for this component
  //  loading: () => <div>Loading Layout...</div>,
});

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: ReactNode;
}

const ComponentLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <AnimatePresence initial={false}>
        <NavBar />
        {children}
      </AnimatePresence>
    </>
  );
};

export default ComponentLayout;
