import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import AuthPage from "../Pages/Register/Register";
import Sidebar from "../Components/Sidebar/Sidebar";
import Public from "../Pages/Public/Public";

const Routing = () => {
  const token = localStorage.getItem("token");
  console.log(token);

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            token && token != "undefined" ? (
              <Navigate to="/home" />
            ) : (
              <AuthPage />
            )
          }
        />
        {/* <Route path="/quiz/:id" element={<QuizContainer />} /> */}
        <Route
          path="/"
          element={
            token && token != "undefined" ? (
              <Navigate to="/home" />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/task/:id"
          element={
              <Public />
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Sidebar />
            </PrivateRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default Routing;
