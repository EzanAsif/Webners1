import React from "react";
import { useDispatch } from "react-redux";
import { AppLayout } from "../../Components/Layouts/AppLayout";
import { removeuserDataFromLocalStorage } from "../../Store/Reducers/AuthReducer";
import { useNavigate } from "react-router-dom";
import { UserLogout } from "../../Store/Reducers/AuthReducer";
import { getUserDataFunc } from "../../App/user";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <h2>Help</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {[1, 24, 2, 45, 5, 25, , 5, 42, 34, 24, 24, 2].map((obj, index) => {
          return (
            <button
              key={index}
              style={{ margin: "20px 0px" }}
              onClick={() => {
                try {
                  let refreshToken = localStorage.getItem("refreshToken");
                  refreshToken = JSON.parse(refreshToken);
                  dispatch(UserLogout({ refreshToken }));
                  dispatch(removeuserDataFromLocalStorage());
                  navigate("/");
                } catch (e) {
                  alert(e);
                }
              }}
            >
              Logout
            </button>
          );
        })}
      </div>
    </AppLayout>
  );
};

export default HomeScreen;
