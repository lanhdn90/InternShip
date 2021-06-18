import React from "react";
import Carousel from "react-multi-carousel";
function Slidergallery() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const pictures = [
    {
      source:
        "https://www.cfdtraining.vn/uploads/gallery/cfd5-team03.jpg",
    },
    {
      source:
        "https://www.cfdtraining.vn/uploads/gallery/cfd-team-cfd5%20(1).jpg",
    },
    {
      source:
        "https://www.cfdtraining.vn/uploads/gallery/cfd1-team.jpg",
    },
    {
      source:
        "https://www.cfdtraining.vn/uploads/gallery/cfd-team-3.jpg",
    },
    {
      source:
        "https://www.cfdtraining.vn/uploads/gallery/cfd-team-87.jpg",
    },
    {
      source:
        "https://www.cfdtraining.vn/uploads/gallery/cfd5-team-04.jpg",
     
    },
    {
      source:
        "https://www.cfdtraining.vn/uploads/gallery/cfd-team-15.jpg",
    },
  ];
  return (
    <>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        focusOnSelect={true}
        infinite
        responsive={responsive}
        keyBoardControl
        minimumTouchDrag={80}
        partialVisible
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        showDots={false}
        slidesToSlide={3}
        swipeable
        className="slidergallerys"
      >
        {pictures.map((item, index) => {
          return (
            <div>
              <img
                src={item.source}
                alt="sliders"
                className="slidergallerys__item"
              />
            </div>
          );
        })}
      </Carousel>
    </>
  );
}

export default Slidergallery;
