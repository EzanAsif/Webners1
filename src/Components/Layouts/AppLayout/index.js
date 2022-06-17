import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import AppLogo from "../../../Assets/logo-sams-club.jpeg";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/Help";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useNavigate, useLocation } from "react-router-dom";
import Web3 from "web3";
import "./styles.css";
import CtaBtn from "../../CtaBtn";
import {
  disableLoading,
  enableLoading,
  fillOutState,
  fillUpState,
} from "../../../Store/Reducers/MetamaskAccount";

const AppWrapper = ({ children, hideHeaderFooter = false }) => {
  return (
    <div
      className={`App-wrapper ${!hideHeaderFooter ? "" : "hideHeaderFooter"}`}
    >
      {children}
    </div>
  );
};

const AppLayout = ({ children, hideHeaderFooter = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, metamaskAccount } = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(metamaskAccount);

  const [value, setValue] = React.useState(
    location && location.pathname == "/" ? "home" : location.pathname.slice(1)
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue !== "home") {
      navigate(`/${newValue}`);
    } else {
      navigate(`/`);
    }
  };

  const userData = async (web3) => {
    try {
      let chainId = await web3.eth.getChainId();
      console.log(chainId);
      if (chainId == 4 || chainId == 80001) {
        // AFTER GETTING CHAINID WE CAN CONDITION IF ELSE
        let account = await web3.eth.getAccounts();

        // THIS HAS TO BE GLOBAL (account)
        let address = account[0];
        address = address.toLowerCase();
        let balance = await web3.eth.getBalance(address);
        console.log(balance);
        dispatch(fillUpState({ user: { address, chainId, balance } }));
        dispatch(disableLoading());
      } else {
        alert("Switch to Rinkeby Network...");
      }
    } catch (e) {
      dispatch(disableLoading());
      console.log(e);
    }
  };

  const loadWeb3ViaMetaMask = async () => {
    // Account Change Handling
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        dispatch(enableLoading());
        dispatch(fillOutState());
        // If user has locked/logout from MetaMask, this resets the accounts array to empty
        if (!accounts.length) {
          console.log("locked");
          dispatch(disableLoading());
          // logic to handle what happens once MetaMask is locked
        } else {
          console.log("account changed");
          const web3 = new Web3(window.ethereum);
          userData(web3);
        }
      });
      window.ethereum.on("chainChanged", () => {
        // If user has locked/logout from MetaMask, this resets the accounts array to empty
        // if (!accounts.length) {
        //     // logic to handle what happens once MetaMask is locked
        //   }
        console.log("heyy");
        dispatch(enableLoading());
        dispatch(fillOutState());
        const web3 = new Web3(window.ethereum);
        userData(web3);
      });
    }

    // Meta Mask Connectivity
    try {
      dispatch(enableLoading());
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
      const web3 = window.web3;
      userData(web3);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {!hideHeaderFooter && (
        <AppBar style={{ backgroundColor: "#f6f6f6" }} position="sticky">
          <Container maxWidth="xl">
            <Toolbar
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
              disableGutters
            >
              <img src={AppLogo} width={50} height={50} />
              <Typography className="name-app-header" variant="h6">
                Sam's Club
              </Typography>
              <CtaBtn
                isFullWidth={false}
                label={
                  metamaskAccount.loading ? (
                    <CircularProgress
                      style={{
                        justifySelf: "center",
                        alignSelf: "center",
                      }}
                      size="26px"
                      color="inherit"
                    />
                  ) : // "Wait..."
                  metamaskAccount.account.address ? (
                    metamaskAccount.account.address.substring(0, 6) +
                    "..." +
                    metamaskAccount.account.address.substring(37, 42)
                  ) : (
                    "Connect Wallet"
                  )
                }
                variant="contained"
                size="large"
                onClickFunc={() =>
                  metamaskAccount.account.address
                    ? alert("Already connected")
                    : loadWeb3ViaMetaMask()
                }
              />
            </Toolbar>
          </Container>
        </AppBar>
      )}
      <AppWrapper hideHeaderFooter={hideHeaderFooter}>{children}</AppWrapper>
      {!hideHeaderFooter && (
        <BottomNavigation
          // sx={{ width: 500 }}
          fullWidth={true}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={<HomeIcon size={20} />}
          />
          <BottomNavigationAction
            label="Transactions"
            value="transactions"
            onClick={(e) => {
              return e;
            }}
            icon={<ReceiptIcon size={20} />}
          />
          <BottomNavigationAction
            label="Help"
            value="help"
            icon={<HelpIcon size={35} />}
          />
          <BottomNavigationAction
            label="Profile"
            value="profile"
            icon={<AccountCircleIcon size={25} />}
          />
        </BottomNavigation>
      )}
    </div>
  );
};

export { AppLayout, AppWrapper };
