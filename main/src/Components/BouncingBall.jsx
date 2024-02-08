import { motion } from "framer-motion";

export default function BouncingBall() {

 const ballStyle = {
   display: "block",
   width: "5rem",
   height: "5rem",
   backgroundColor: "black",
   borderRadius: "0.5rem",
 };
  const bounceTransition = {
    y: {
      duration: 0.4,
      yoyo: Infinity,
      ease: "easeOut",
    },
    backgroundColor: {
      duration: 0,
      yoyo: Infinity,
      ease: "easeOut",
      repeatDelay: 0.8,
    },
  };
  return (
    <div
      style={{
        width: "10rem",
        height: "10rem",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <motion.span
        style={ballStyle}
        transition={bounceTransition}
        animate={{
          y: ["100%", "-100%"],
          backgroundColor: ["#ff6699", "#6666ff"],
        }}
      />
    </div>
  );
}
