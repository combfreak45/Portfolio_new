import React, { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay

    if (window.innerWidth < 600) {
      navigate("/portfolio");
    }

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 9000); // Adjust the delay time as needed

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="h-screen">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
            >
              <animateTransform
                attributeName="transform"
                dur="0.75s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              />
            </path>
          </svg>
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <Spline
            style={{ display: "block" }}
            scene="https://prod.spline.design/HdCy3nN4QYWNODsN/scene.splinecode"
          />
        </div>
      )}
    </div>
  );
};

export default Main;
