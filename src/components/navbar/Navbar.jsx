import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Imagenes from "../../images/imagenes";
import "./_Navbar.scss";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="x2" className="navbar">
          <Toolbar disableGutters className="toolbar">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <img
                src={Imagenes.img1}
                className="logoName"
                alt=""
                onClick={() => navigate("/principalpage")}
              ></img>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <div>
                  <MenuItem onClick={() => navigate("/principalpage")}>
                    <Typography
                      className="navText"
                      textAlign="center"
                      style={{ fontFamily: "Rambla-Bold" }}
                    >
                      Inicio
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => navigate("/movies")}>
                    <Typography
                      textAlign="center"
                      style={{ fontFamily: "Rambla-Bold" }}
                    >
                      Películas
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      style={{ fontFamily: "Rambla-Bold" }}
                    >
                      Mi Lista
                    </Typography>
                  </MenuItem>
                </div>
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <img src={Imagenes.img1} className="logoName" alt=""></img>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <MenuItem onClick={() => navigate("/principalpage")}>
                <Typography
                  textAlign="center"
                  style={{ fontFamily: "Rambla-Bold", color: "black" }}
                >
                  Inicio
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => navigate("/movies")}>
                <Typography
                  textAlign="center"
                  style={{ fontFamily: "Rambla-Bold", color: "black" }}
                >
                  Películas
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  style={{ fontFamily: "Rambla-Bold", color: "black" }}
                >
                  Mi Lista
                </Typography>
              </MenuItem>
            </Box>
            <Typography
              style={{
                fontFamily: "Rambla-Bold",
                color: "black",
                marginRight: "10px",
              }}
            >
              Esteban Rodas
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="" src={Imagenes.img10} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <div>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      style={{ fontFamily: "Rambla-Bold" }}
                    >
                      Mi Perfil
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      style={{ fontFamily: "Rambla-Bold" }}
                    >
                      Cerrar Sesión
                    </Typography>
                  </MenuItem>
                </div>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
