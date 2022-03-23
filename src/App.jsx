import React, { Component } from "react";
import { connect } from "react-redux";
import MainComponent from "./Scenes/Pages/MainComponent";
import LoginPage from "./Scenes/Components/Forms/LoginPage";
import RegisterPage from "./Scenes/Components/Forms/RegisterPage";
import ForgotPassword from "./Scenes/Components/Forms/ForgotPassword";
import "antd/dist/antd.css";
import "../src/Styles/style.css";
import Cookies from "universal-cookie";
import { gettingConfigurationValue } from "./Services/requests";
import {
  fetchingDelayValue,
  fetchingCvstageValue,
  updatingAirFCVInput,
  updatingKeroseneFCVInput,
} from "./Redux/action";

class App extends Component {
  componentDidMount() {
    gettingConfigurationValue((data) => {
      this.props.fetchingDelayValue(data[0].Delay * 1000);
      this.props.fetchingCvstageValue(data[0]);
      this.props.updatingAirFCVInput(data[0].AirFCV_Valve);
      this.props.updatingKeroseneFCVInput(data[0].KeroseneFCV_Valve);
    });
  }

  render() {
    const cookies = new Cookies();

    cookies.set("appState", "main", { path: "/" });

    const appState = this.props.appState;
    return (
      <div className="site-layout-background">
        {appState === "main" ? <MainComponent /> : []}
        {appState === "login" ? <LoginPage /> : []}
        {appState === "signup" ? <RegisterPage /> : []}
        {appState === "forgotPassword" ? <ForgotPassword /> : []}
        {appState === "logout" ? <LoginPage /> : []}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appState: state.app.appState,
});

const mapDispatchToProps = {
  fetchingDelayValue,
  fetchingCvstageValue,
  updatingAirFCVInput,
  updatingKeroseneFCVInput,
};

const appPage = connect(mapStateToProps, mapDispatchToProps)(App);
export default appPage;
