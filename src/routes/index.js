// import React from "react";
// import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "../Components/Dashboard/Dashboard";

// const Routing = () => {
//     const token = localStorage.getItem("token");
//     console.log(token);
//     return (
//       <HashRouter>
//         <Routes>
//           <Route
//             path="/auth"
//             element={token ? <Navigate to="/dashboard" /> : <Auth />}
//           />
//           <Route path="/quiz/:id" element={<QuizContainer />} />
//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute>
//                 <Dashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/"
//             element={
//               token ? <Navigate to="/dashboard" /> : <Navigate to="/auth" />
//             }
//           />
//         </Routes>
//       </HashRouter>
//     );
//   };
  
  export default Routing;