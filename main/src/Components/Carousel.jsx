import { useEffect, useState } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

const Carousel = ({skills}) => {

  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(skills.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === skills.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };


    const autoChangeSlide = () => {
      setCurrent((prev) => (prev === skills.length - 1 ? 0 : prev + 1));
    };


  useEffect(()=>{

    const intervalId = setInterval(autoChangeSlide,3000);
    return () => clearInterval(intervalId);
  },[current]);


  return (
    <div className="overflow-hidden relative  h-[20rem] w-[20rem] bg-[#343434]     rounded-2xl  text-white text-xl shadow-lg shadow-black">
      <div
        className={`flex transition ease-out duration-40`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {skills.map((s, i) => {
          return (
            <div className="min-h-[20rem] min-w-[20rem] flex flex-row items-center justify-center hover:scale-125">
              <button className="min-h-[4rem] min-w-[11rem] max-w-[16rem] bg-white text-black rounded-[2rem] text-xl font-bold shadow-lg shadow-black ">
                {s}
              </button>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-5 py-4 flex justify-center gap-3 w-full">
        {skills.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-2 h-2 cursor-pointer  ${
                i == current ? "bg-white" : "bg-gray-500"
              }`}
            ></div>
          );
        })}
      </div>

      <div className=" absolute bottom-0 w-full justify-between px-[6rem] items-center flex text-white  text-xl">
        <button onClick={previousSlide}>
          <BsFillArrowLeftCircleFill />
        </button>
        <button onClick={nextSlide}>
          <BsFillArrowRightCircleFill />
        </button>
      </div>
    </div>
  );
}

export default Carousel
