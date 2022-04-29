import "./_Carousel.scss";
import Carousel from "react-multi-carousel";
import Imagenes from "../../images/imagenes";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";

const CarouselComponent = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 2000, min: 1700 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1700, min: 1200 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 1200, min: 0 },
      items: 1,
      centerMode: false,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      centerMode={true}
      itemClass="carousel-item-padding-50-px"
      className="carousel"
    >
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
    </Carousel>
  );
};
export default CarouselComponent;
