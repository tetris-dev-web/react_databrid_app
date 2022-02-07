import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import UserList from "./components/UserList";
import UserItem from "./components/UserItem";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.min.css";

const StyledApp = styled.div`
  background-color: #f4f6f8;
  height: 100vh;
  padding: 1rem;
`;

function App() {
  return (
    <BrowserRouter>
      <StyledApp>
        <CssBaseline />
        <Switch>
          <Route path={"/"} exact component={UserList} />
          <Route path={"/edit/:id"} exact component={UserItem} />
        </Switch>
        {/* <UserList /> */}
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
        />
      </StyledApp>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
