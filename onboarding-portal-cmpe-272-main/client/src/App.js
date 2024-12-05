import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import Landing from "./pages/landing/Landing";
import E404 from "./pages/error/E404";
import Dashboard from "./pages/dashboard/Dashboard";
import UserDashboard from "./pages/employeeDashboard/Dashboard";
import EmployeeSalary from "./pages/employeeDashboard/EmployeeSalary/EmployeSalary"; // Adjusted import
import UserLanding from "./pages/employeeLanding/EmployeeLanding";
import Documents from "./pages/documents/documents";
import EmployeeLanding from "./pages/employeeLanding/EmployeeLanding";
import ItDashboard from "./pages/it/Dashboard";
import TrainerDashboard from "./pages/trainer/Dashboard";
import NewEmployee from "./pages/employee/NewEmployee";
import EditEmployee from "./pages/employee/EditEmployee";
import Employee from "./pages/employee/Employee";
import Account from "./pages/account/Account";
import Letter from "./pages/letter/Letter";
import SingleEmployee from "./pages/employee/SingleEmployee";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import EmployeeProfile from "./pages/EmployeeProfile/EmployeeProfile";


import api from "./shared/api";
import { connect } from "react-redux";
import store from "./redux/store";
import { Alert, Spin } from "antd";

const App = (props) => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api();
    (async () => {
      try {
        const role = localStorage.getItem("role");
        setRole(role);
      } catch (error) {
        console.log(error);
      }
    })();
    setLoading(false);
  }, []);

  return (
    <div>
      {props.success_message !== null ? (
        <Alert
          type="success"
          message="Success"
          description={props.success_message}
          showIcon
          closable
          style={{
            position: "absolute",
            zIndex: 100,
            top: 30,
            right: 30,
            width: "300px",
          }}
          onClose={() =>
            store.dispatch({ type: "SUCCESS_DATA", payload: "" })
          }
        />
      ) : (
        ""
      )}
      {loading === true ? (
        <Spin />
      ) : (
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Landing />} exact />
              <Route path="/signup" element={<SignUp />} exact />
              <Route path="/signin" element={<SignIn />} exact />
              <Route path="/letter/:id" element={<Letter />} exact />
            </Route>

            {/* Employee Routes */}
            {role === "employee" ? (
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard/:id" element={<UserDashboard />} exact />
                <Route path="/landing/:id" element={<UserLanding />} exact />
                <Route path="/documents/:id" element={<Documents />} exact />
                <Route
                  path="/employeesalary"
                  element={<EmployeeSalary />} // Employee Salary Route
                  exact
                />
                <Route
                  path="/employeeprofile"
                  element={<EmployeeProfile />} // Employee Profile Route
                  exact
                />
              </Route>
            ) : null}

            {/* Other Roles (Admin, IT, Trainer) */}
            {/* ... Include other role-based routes here ... */}

            {/* Fallback Route */}
            <Route path="*" element={<E404 />} />
          </Routes>
        </Router>
      )}
    </div>
  );
};

const mapPropsWithState = (state) => ({
  success_message: state.user.success_message,
  error_message: state.user.error_message,
});

export default connect(mapPropsWithState)(App);

