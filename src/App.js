import React, { Fragment, useState } from "react";
import "h8k-components";

import { image1, image2, image3, image4 } from "./assets/images";
import { Thumbs, Viewer } from "./components";

const title = "Catalog Viewer";

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1,
    },
    {
      thumb: image2,
      image: image2,
    },
    {
      thumb: image3,
      image: image3,
    },
    {
      thumb: image4,
      image: image4,
    },
  ];

  const [catalogs] = useState([...catalogsList]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideTimer, setSlideTimer] = useState(null);
  const [slideDuration] = useState(3000);
  const [checked, setChecked] = useState(false);

  console.log("render", {
    activeIndex,
    catalogs,
  });

  const OnHandleNext = () => {
    console.log("entro", activeIndex);
    if (activeIndex === catalogs.length - 1) {
      console.log("entro if activeindex");
      setActiveIndex(0);
    } else {
      console.log("entro else activeindex");
      setActiveIndex(1);
    }
  };

  const onHandleBack = () => {
    if (activeIndex === 0) {
      setActiveIndex(catalogs.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleCheck = () => {
    const inputChecked = !checked;
    setChecked(inputChecked);
    if (inputChecked) {
      let interval = setInterval(() => {
        OnHandleNext();
      }, slideDuration);
      setSlideTimer(interval);
    } else {
      clearInterval(slideTimer);
      setSlideTimer(null);
    }
  };

  return (
    <Fragment>
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-column justify-content-center mt-75">
        <div className="layout-row justify-content-center">
          <div className="card pt-25">
            <Viewer catalogImage={catalogs[activeIndex].image} />
            <div className="layout-row justify-content-center align-items-center mt-20">
              <button
                className="icon-only outlined"
                data-testid="prev-slide-btn"
                onClick={() => onHandleBack()}
              >
                <i className="material-icons">arrow_back</i>
              </button>
              <Thumbs
                items={catalogs}
                currentIndex={activeIndex}
                changeIndex={(id) => setActiveIndex(id)}
              />
              <button
                className="icon-only outlined"
                data-testid="next-slide-btn"
                onClick={() => OnHandleNext()}
              >
                <i className="material-icons">arrow_forward</i>
              </button>
            </div>
          </div>
        </div>
        <div className="layout-row justify-content-center mt-25">
          <input
            type="checkbox"
            data-testid="toggle-slide-show-button"
            onChange={handleCheck}
            defaultChecked={checked}
          />
          <label className="ml-6">Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
