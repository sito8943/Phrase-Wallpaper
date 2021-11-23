import React, { useState, useEffect } from "react";
import { useContext } from "./context/ContextProvider";

import "uikit/dist/css/uikit.min.css";

import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import ui from "./lang/ui.json";

import Loading from "./components/loading/Loading";
import Navbar from "./components/navbar/Navbar";
import Notification from "./components/notification/Notification";

import Main from "./views/main/Main";
import Login from "./views/login/Login";
import Forgot from "./views/forgot/Forgot";
import SignUp from "./views/signUp/SignUp";
import NotMatch from "./views/notmatch/NotMatch";

import { connectionState } from "./services/get";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { contextState, setContextState } = useContext();

  const init = async () => {
    const netStatus = await connectionState();
    if (netStatus == 200) setContextState({ type: "online" });
    else setContextState({ type: "offline" });
  };

  useEffect(() => {
    init();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loading />
        </div>
      ) : (
        <Router>
          
            <Notification texts={ui.ES.Notification} />
            <Routes>
              <Route path="/" element={<Navbar texts={ui.ES.Navbar} />}>
                <Route
                  index
                  element={
                    contextState.user.name == "" ? (
                      <Login texts={ui.ES.Login} />
                    ) : (
                      <Main texts={ui.ES.Main} />
                    )
                  }
                />
                <Route
                  path="forgot"
                  element={<Forgot texts={ui.ES.Forgot} />}
                />
                <Route
                  path="signup"
                  element={<SignUp texts={ui.ES.SignUp} />}
                />
                <Route path="*" elemet={<NotMatch texts={ui.ES.NotMatch} />} />
              </Route>
            </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
