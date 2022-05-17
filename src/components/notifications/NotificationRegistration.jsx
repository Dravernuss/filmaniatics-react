import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NotificationRegistration({
  alertOnRegistration,
  message,
}) {
  const [openUser, setOpenUser] = React.useState(alertOnRegistration);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenUser(false);
  };
  React.useEffect(() => {
    setOpenUser(alertOnRegistration);
  }, [alertOnRegistration]);

  return (
    <Snackbar
      open={openUser}
      autoHideDuration={3000}
      onClose={handleClose}
      data-test-id="registration-success"
    >
      <Alert
        onClose={handleClose}
        severity="success"
        sx={{ width: "100%" }}
        data-test-id="registration-success"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
