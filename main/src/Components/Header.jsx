import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

const Header = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <motion.div
        className="h-[10%] bg-[#FF9843] text-[#3468C0] m-5 rounded-2xl text-2xl font-bold flex flex-row flex-wrap justify-between items-center px-10"
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 2, type: "spring", stiffness: 50 }}
      >
        <div className="hover:cursor-pointer hover:scale-125 text-2xl">
          <Link to="/portfolio/">Portfolio</Link>
        </div>
        <div className=" block sm:hidden" onClick={() => setVisible(!visible)}>
          {visible ? <RxCross1 /> : <GiHamburgerMenu />}
        </div>
        <div className=" hidden sm:block">
          <div className="flex flex-row flex-wrap gap-5">
            <div className="hover:cursor-pointer hover:scale-125">
              <Link to="/portfolio/skill">Skills</Link>
            </div>
            <div className="hover:cursor-pointer hover:scale-125">
              <Link to="/portfolio/project">Projects</Link>
            </div>
            <div className="hover:cursor-pointer hover:scale-125">
              <Link to="/portfolio/contact">Contact Us</Link>
            </div>
          </div>
        </div>
      </motion.div>
      <div>
        {visible ? (
          <div className="flex flex-col  gap-5 bg-[#FF9843] mx-5 py-4 px-10 rounded-xl text-lg font-bold text-[#3468C0] ">
            <div className="hover:cursor-pointer ">
              <Link to="/portfolio/skill">Skills</Link>
            </div>
            <div className="hover:cursor-pointer">
              <Link to="/portfolio/project">Projects</Link>
            </div>
            <div className="hover:cursor-pointer">
              <Link to="/portfolio/contact">Contact Us</Link>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default Header;
