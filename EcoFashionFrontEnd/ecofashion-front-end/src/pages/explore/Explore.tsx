import { useEffect, useRef } from "react";
import AOS from "aos";
import OwlCarousel from "react-owl-carousel";
import NavbarOne from "../../components/navbar/navbar-one";

function Explore() {
  useEffect(() => {
    AOS.init();
  }, []);
  const carouselRef = useRef<OwlCarousel | null>(null);

  const goToPrevSlide = () => {
    if (carouselRef.current) {
      carouselRef.current?.prev(300);
    }
  };

  const goToNextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current?.next(300);
    }
  };

  return (
    <>
      <NavbarOne/>
    </>
  );
}

export default Explore;
