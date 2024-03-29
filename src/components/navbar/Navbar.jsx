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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneUserAsync, toUser } from "../../slices/userSlice.js";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const user = useSelector(toUser);
  const ID = JSON.parse(localStorage.getItem("infoUser"))._id;

  const endSession = async () => {
    await localStorage.removeItem("infoUser");
    window.location = "/";
  };

  useEffect(() => {
    if (!user) dispatch(getOneUserAsync(ID));
  }, []);

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
                  <MenuItem onClick={() => navigate("/mylist")}>
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
              <MenuItem
                onClick={() => navigate("/principalpage")}
                data-test-id="principal-page"
              >
                <Typography
                  textAlign="center"
                  style={{ fontFamily: "Rambla-Bold", color: "black" }}
                >
                  Inicio
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => navigate("/movies")}
                data-test-id="movies"
              >
                <Typography
                  textAlign="center"
                  style={{ fontFamily: "Rambla-Bold", color: "black" }}
                >
                  Películas
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => navigate("/mylist")}
                data-test-id="my-list"
              >
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
              {user?.name}
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  data-test-id="open-menu"
                >
                  <Avatar alt="" src={user?.photo_url} />
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
                  <MenuItem
                    onClick={() => navigate("/profile")}
                    data-test-id="visit-profile"
                  >
                    <Typography
                      textAlign="center"
                      style={{ fontFamily: "Rambla-Bold" }}
                    >
                      Mi Perfil
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={endSession} data-test-id="end-session">
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
