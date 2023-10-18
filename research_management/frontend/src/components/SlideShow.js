import React, { useState, useEffect } from "react";
import dntuIrastImage from "../assets/img/dntu-irast.jpg";
import dntu2Image from "../assets/img/dntu-2.jpg";
import dntu3Image from "../assets/img/dntu-3.jpg";
import "../assets/css/Slider.css";

const SlideShow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  const images = [
    dntuIrastImage,
    dntu2Image,
    dntu3Image,
    // Thêm các hình ảnh khác nếu cần
  ];

  const toggleArrows = (show) => {
    setShowArrows(show);
  };

  const goToNextSlide = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  };

  const goToPrevSlide = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 3000); // Chuyển ảnh tự động sau mỗi 3 giây

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <div className="slideshow">
      <div
        className="image-container"
        onMouseEnter={() => toggleArrows(true)}
        onMouseLeave={() => toggleArrows(false)}
      >
        {showArrows && (
          <button className="arrow arrow-left" onClick={goToPrevSlide}>
            &lt;
          </button>
        )}
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          style={{ maxWidth: "100%", maxHeight: "100%", marginTop: "0" }}
        />
        {showArrows && (
          <button className="arrow arrow-right" onClick={goToNextSlide}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default SlideShow;
