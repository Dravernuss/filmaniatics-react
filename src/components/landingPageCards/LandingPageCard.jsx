import "./_LandingPageCard.scss";

const LandingPageCard = ({ info, img }) => {
  return (
    <div className="cardContainerLP">
      <img src={img} className="cardImage" alt=""></img>
      <p className="cardInfo">{info}</p>
    </div>
  );
};
export default LandingPageCard;
