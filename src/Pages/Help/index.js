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
    </AppLayout>
  );
};

export default HomeScreen;
