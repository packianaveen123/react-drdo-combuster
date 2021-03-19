import axios from 'axios';
import { url } from './constants'

const URL = url
const BASE_URL = URL.BASE_URL
const turboConfigUrl = `${BASE_URL}${URL.TURBO_CONFIG}`
const turboConfigSubmitUrl = `${BASE_URL}${URL.TURBO_CONFIG_SUBMIT}`
const testConfigUrl = `${BASE_URL}${URL.TEST_CONFIG}`
const paramConfigUrl = `${BASE_URL}${URL.PARAM_CONFIG}`
const loginValidationUrl = `${BASE_URL}${URL.LOGIN_VALIDATION}`
const graphChartDataUrl = `${BASE_URL}${URL.GRAPH_CHART_DATA}`

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

const requestChartData = (callBack) => {
  axios.get(graphChartDataUrl)
    .then(res => {
      let chartData = res.data;
      callBack(chartData)
    }).catch(err => {
      console.log(err);
    })
}

const loginValidation = (values, callBack) => {
  axios.post(loginValidationUrl, values)
    .then(res => {
      if (res.data === "success") {
        alert("success")
        callBack(res.data)
      }
      else if (res.data === "failed") {
        this.state.IsLogin = true;
        this.setState({ redirect: false });
      }
    })
    .catch(err => {
      console.log(err.res)
    })
}

export {
  getTurboConfigData,
  turbineConfigSubmit,
  getTestConfigData,
  getParamConfigData,
  requestChartData,
  loginValidation
}