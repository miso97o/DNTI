import { useState, useRef, useEffect } from "react";

export default function DntiCarousel({ data }) {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  console.log("maxScrollWidth", maxScrollWidth);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >=
        maxScrollWidth.current + 1
      );
    }

    return false;
  };

  useEffect(() => {
    console.log("carousel.current.scrollLeft", carousel.current.scrollLeft);
    console.log("carousel.current.offsetWidth", carousel.current.offsetWidth);
    console.log("currentIndex", currentIndex);
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    console.log("data", data);
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 4624;
    console.log("maxScrollWidth : ", maxScrollWidth);
  }, [data]);

  return (
    <div className="carousel mx-auto">
      <div className="relative overflow-hidden">
        <div className="flex justify-between absolute top left w-full h-full">
          <button
            onClick={movePrev}
            className="hover:text-dntiblue text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled("prev")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="hover:text-dntiblue text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled("next")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
        >
          {data &&
            data.map((resource, index) => {
              return (
                <div
                  key={index}
                  className="carousel-item text-center relative w-40 h-45 snap-start mx-3"
                >
                  <div
                    className="carousel-image h-44 w-44 aspect-square block bg-gray-200 rounded-3xl bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
                    style={{
                      backgroundImage: resource.type
                        ? `url(${process.env.PUBLIC_URL}/img/dnti_type/${resource.type}.png)`
                        : "",
                    }}
                  ></div>
                  <div className="ml-2">
                    <div className="flex flex-row items-end mt-3">
                      <p className="font-extrabold text-black text-lg text-start">
                        {index + 1}위 {resource.type}
                      </p>
                      <p className="ml-2 text-gray-500">{resource.percent}%</p>
                    </div>
                    <p className="font-medium text-start">
                      #{resource.keyword.replace(" ", "_")}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
