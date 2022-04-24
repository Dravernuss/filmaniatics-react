import "./_Carousel.scss";
import Carousel from "react-multi-carousel";
import Imagenes from "../../images/imagenes";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";

const CarouselComponent = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 2000, min: 1300 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1300, min: 890 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 890, min: 0 },
      items: 1,
      centerMode: false,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      centerMode={true}
      itemClass="carousel-item-padding-40-px"
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
