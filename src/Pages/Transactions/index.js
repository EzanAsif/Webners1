import React from "react";
import { useDispatch } from "react-redux";
import { AppLayout } from "../../Components/Layouts/AppLayout";
import { removeuserDataFromLocalStorage } from "../../Store/Reducers/AuthReducer";
import { useNavigate } from "react-router-dom";
import IndividualTransaction from "../../Components/IndividualTransaction";
import "./styles.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AddCardIcon from "@mui/icons-material/AddCard";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <AppLayout>
      <h2>Transactions</h2>
      {/* <div className="transactionStats">
        <div className="stats deposit">
          <div className={`statsIcon deposit`}>
            <AddCardIcon />
          </div>
        </div>
        <div className="stats withdraw">
          <div className={`statsIcon withdraw`}>
            <ArrowUpwardIcon style={{ transform: "rotate(225deg)" }} />
          </div>
        </div>
      </div> */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((obj, index) => {
          if (index % 2 == 0) {
            return (
              <IndividualTransaction
                isDeposit={true}
                dateTime="27th March Tue, 9:00pm"
                transactionAmount="200$"
                key={index}
              />
            );
          } else {
            return (
              <IndividualTransaction
                dateTime="27th March Tue, 9:00pm"
                transactionAmount="200$"
                key={index}
              />
            );
          }
        })}
      </div>
    </AppLayout>
  );
};

export default HomeScreen;
