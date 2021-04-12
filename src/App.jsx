import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainComponent from './Scenes/Pages/MainComponent';
import LoginPage from './Scenes/Components/Forms/LoginPage';
import RegisterPage from './Scenes/Components/Forms/RegisterPage';
import ForgotPassword from './Scenes/Components/Forms/ForgotPassword';
import 'antd/dist/antd.css';
import '../src/Styles/style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.stste = {
    }
  }

  render() {
    const appState = this.props.appState;
    return (
      <div className="site-layout-background">
        {appState === 'main' ? <MainComponent /> : []}
        {appState === 'login' ? <LoginPage /> : []}
        {appState === 'signup' ? <RegisterPage /> : []}
        {appState === 'forgotPassword' ? <ForgotPassword /> : []}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  appState: state.app.appState
})

const mapDispatchToProps = {

}

const appPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
export default appPage;

