import axios from 'axios';
import { url } from './constants'

const URL = url
const BASE_URL = URL.BASE_URL
const turboConfigUrl = `${BASE_URL}${URL.TURBO_CONFIG}`
const turboConfigSubmitUrl = `${BASE_URL}${URL.TURBO_CONFIG_SUBMIT}`
const testConfigUrl = `${BASE_URL}${URL.TEST_CONFIG}`
const paramConfigUrl = `${BASE_URL}${URL.PARAM_CONFIG}`
const graphChartDataUrl = `${BASE_URL}${URL.GRAPH_CHART_DATA}`
const shutdownClickEventUrl = `${BASE_URL}${URL.SHUTDOWN_CLICK}`
const resetClickEventUrl = `${BASE_URL}${URL.RESET_CLICK}`
const updateConfigDataUrl = `${BASE_URL}${URL.UPDATE_CONFIG_DATA}`
const loginValidationUrl = `${BASE_URL}${URL.LOGIN_VALIDATION}`
const forgotValidationUrl = `${BASE_URL}${URL.FORGOT_VALIDATION}`

let that = this;

const getTurboConfigData = (callBack) => {
  axios.get(turboConfigUrl).then(res => {
    let turboData = res.data
    callBack(turboData)
  }).catch((err) => {
    console.log(err);
  })
}

const turbineConfigSubmit = (values, callBack) => {
  axios.post(turboConfigSubmitUrl, values)
    .then(res => {
      if (res.data === "success") {
        getTurboConfigData((data) => {
          callBack(data)
        })
      }
      else { }
    }).catch(err => {
      console.log(err.res)
    })
}

const getTestConfigData = (callBack) => {
  axios.get(testConfigUrl)
    .then(res => {
      let testData = res.data;
      callBack(testData)
    }).catch((err) => {
      console.log(err);
    })
}

const getParamConfigData = (callBack) => {
  axios.get(paramConfigUrl)
    .then(res => {
      let paramData = res.data
      callBack(paramData)
    }).catch((err) => {
      console.log(err);
    })
}

const requestingChartData = (callBack) => {
  axios.get(graphChartDataUrl)
    .then(res => {
      let chartData = res.data;
      callBack(chartData)
    }).catch(err => {
      console.log(err);
    })
}






const shutdownClickEvent = (callBack) => {
  axios.post(shutdownClickEventUrl)
    .then(function (response) {
      let shutdownValue = response
      callBack(shutdownValue)
    }).catch((err) => {
      console.log(err);
    })
}

const resetClickEvent = (callBack) => {
  axios.post(resetClickEventUrl, { ResetRPM: this.state.ResetRPM, ResetTemp: this.state.ResetTemp })
    .then(function (response) {
      let resetValue = response
      callBack(resetValue)
    })
}

const updateConfigData = (data, callBack) => {
  axios.post(updateConfigDataUrl, data)
    .then(res => {
      let configData = res.data
      callBack(configData)
    }).catch(err => {
      console.log(err.res)
    })
}

const loginValidation = (values, callBack) => {
  axios.post(loginValidationUrl, values)
    .then(res => {
      if (res.data === "success") {
        alert("success")
        callBack(res.data)
        that.props.updateAppState('main')
        console.log(res.data)
      }
      else if (res.data === "failed") {
        // this.state.IsLogin = true;
        // this.setState({ redirect: false });
      }
    })
    .catch(err => {
      console.log(err.res)
    })
}

const forgotValidation = (values) => {
  axios.post(forgotValidationUrl, values)
    .then(res => {
      console.log(res.data)
      if (res.data == "success") {
        this.props.updateAppState('login');
      }
      else {
        this.state.IsUserName = true;
        this.setState({ redirect: false });
      }
      console.log(res)
    })
    .catch(err => {
      console.log(err.res)
    })
};

export {
  getTurboConfigData,
  turbineConfigSubmit,
  getTestConfigData,
  getParamConfigData,
  shutdownClickEvent,
  resetClickEvent,
  updateConfigData,
  loginValidation,
  forgotValidation,
  requestingChartData

}