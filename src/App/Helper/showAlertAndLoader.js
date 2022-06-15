const showAlertAndLoader = (
  muiAlert,
  setMuiAlert,
  setOpen,
  alertType,
  alertMsg,
  func = () => {}
) => {
  setMuiAlert({
    open: true,
    alertStatus: `${alertType}`,
    alertMessage: `${alertMsg}`,
  });
  setTimeout(() => {
    setMuiAlert({ ...muiAlert, open: false });
    setOpen(false);
    if (func) func();
  }, 2000);
};

export default showAlertAndLoader;
