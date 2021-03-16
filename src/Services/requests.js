import axios from 'axios';
import {url} from './constants'

const URL = url
const BASE_URL = URL.BASE_URL
const turboConfigUrl = `${BASE_URL}${URL.TURBO_CONFIG}`
const turboConfigSubmitUrl = `${BASE_URL}${URL.TURBO_CONFIG_SUBMIT}`

const getTurboConfigData = (callBack) => {
  axios.get(turboConfigUrl).then(res => {
    let TurboData = res.data
    callBack(TurboData)   
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
export {    
  getTurboConfigData,
  turbineConfigSubmit
}