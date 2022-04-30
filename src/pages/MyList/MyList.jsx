import { Avatar, IconButton, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Imagenes from "../../images/imagenes";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./_MyList.scss";
import CarouselComponent from "../../components/Carousel/Carousel";

const MyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openInfo, setOpenInfo] = useState(false);
  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      //   navigate(`/search/${searchTerm}`);
    }
  };
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="backgroundList">
      <div>
        <Navbar />
        <div className="listHeader">
          <h1 className="myList">Mi Lista</h1>
          <form onSubmit={handleOnSubmit} className="searchInList">
            <input
              className="searchInputList"
              type="search"
              placeholder="Buscar Películas"
              value={searchTerm}
              onChange={handleOnChange}
            />
            <button type="submit" className="searchButtonList">
              <img src={Imagenes.img15} className="lupaList" alt="lupa" />
            </button>
          </form>
          <div className="totalMovies">
            <p className="totalWord">Total</p>
            <p className="amountMovies">22</p>
            <p className="levelUser">Novato</p>
            <IconButton onClick={handleOpenInfo} className="iconButtonList">
              <Avatar alt="" src={Imagenes.img12} className="movieImageList" />
            </IconButton>
            <Modal
              open={openInfo}
              onClose={handleCloseInfo}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="boxModal">
                <div className="modalUpperHead">
                  <img src={Imagenes.img14} width="100" alt=""></img>
                  <p className="modalTitle">Niveles de FilManiatics</p>
                </div>
                <div className="modalBody">
                  <Box
                    component="div"
                    sx={{
                      "& .MuiTextField-root": { m: 2, width: "100%" },
                    }}
                    noValidate
                    autoComplete="off"
                    className="modalBodyBox"
                    style={{ alignItems: "flex-start" }}
                  >
                    <p className="levelText">
                      • <span>Iniciado</span> (0-20 Peliculas Vistas o
                      Valoradas)
                    </p>
                    <p className="levelText">
                      • <span style={{ color: "#217D00" }}>Novato</span> (21-40
                      Peliculas Vistas o Valoradas)
                    </p>
                    <p className="levelText">
                      • <span style={{ color: "#0E0062" }}>Conocedor</span>{" "}
                      (41-60 Peliculas Vistas o Valoradas)
                    </p>
                    <p className="levelText">
                      • <span style={{ color: "#584B28" }}>Experto</span>{" "}
                      (61-100 Peliculas Vistas o Valoradas)
                    </p>
                    <p className="levelText">
                      • <span style={{ color: "#C39500" }}>FilManiatico</span>{" "}
                      (+100 Peliculas Vistas o Valoradas)
                    </p>
                  </Box>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
        <div className="listBody">
          <Accordion defaultExpanded className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <p className="accordionTitle">Favoritos</p>
            </AccordionSummary>
            <AccordionDetails>
              <CarouselComponent />
            </AccordionDetails>
          </Accordion>
          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <p className="accordionTitle">Agregados Recientemente</p>
            </AccordionSummary>
            <AccordionDetails>
              <CarouselComponent />
            </AccordionDetails>
          </Accordion>
          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <p className="accordionTitle">Peliculas Vistas</p>
            </AccordionSummary>
            <AccordionDetails>
              <CarouselComponent />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
export default MyList;
