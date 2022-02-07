import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container } from "@material-ui/core";
import { RouteComponentProps, Link, Switch, Route } from "react-router-dom";
import CreateCustomer from "./components/customer/CreateCustomer";
import Home from "./components/Home";
import EditCustomer from "./components/customer/EditCustomer";

const App: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <div>
        <nav>
          <ul>
            <li>
              <Link to={"/"}> Home </Link>
            </li>
            <li>
              <Link to={"/create"}> Create Customer </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path={"/create"} exact component={CreateCustomer} />
          <Route path={"/"} exact component={Home} />
          <Route path={"/edit/:id"} exact component={EditCustomer} />
        </Switch>
      </div>
    </Container>
  );
};

export default App;
