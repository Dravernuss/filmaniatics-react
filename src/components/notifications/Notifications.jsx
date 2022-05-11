import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notifications({ alertOnUser, message }) {
  const [openUser, setOpenUser] = React.useState(alertOnUser);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenUser(false);
    alertOnUser(false);
  };
  React.useEffect(() => {
    setOpenUser(alertOnUser);
  }, [alertOnUser]);

  return (
    <Snackbar open={openUser} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
