const url = {
  BASE_URL: 'http://192.168.0.167:5000/',
  LOGIN_VALIDATION: 'login_validation.php',
  FORGOT_VALIDATION: 'forget.php',
  REGISTERPAGE_VALIDATION: 'Registration.php',
  TURBO_CONFIG: 'turbo_config.php',
  TURBO_CONFIG_SUBMIT: 'turbo_config_validation.php',
  TEST_CONFIG: 'test_config.php',
  PARAM_CONFIG: 'param_config.php',
  UPDATE_CONFIG_DATA: 'testconfigedit.php',
  TABLE_VIEW: 'tableview.php',
  SHUTDOWN_CLICK: 'shutdown.php',
  RESET_CLICK: 'reset.php',
  SENSOR_DATA: 'getdata.php',
  TURBOID_VALUE: 'turboIdValue.php',
  TABLE_STATUSDATA: 'statusValue.php',
  GRAPH_DATA: 'graph.php',
}

const FormDetails = {
  enter_email: 'Please input your e-mail!',
  enter_password: 'Please input your password!',
  enter_username: 'Please input your username!',
  email_notvalid: 'The input is not valid E-mail!',
  password_notmatch: 'The two passwords that you entered do not match!',
  confirm_password: 'Please confirm your password!',
  alert_email: 'Please enter a valid e-mail',
  alert_registered_email: 'Sorry... e-mail already registered',
  alert_msg_login: 'Username or Password is incorrect',
  success_msg: 'success',
  alert_username_taken: 'Sorry... username already taken',
  alert_email_taken: 'email already taken'

}
const CompanyDetails = {
  company_name: 'EnerTek Combuster',
  company_data: 'A product powerd by Vaigunth EnerTek (Pvt.) Ltd.',
  company_link: 'http://www.v-enertek.com/',
  drdo_logo: 'https://www.drdo.gov.in/sites/default/files/drdo_logo_0.png',
}

const dashboardDataVal = [
  { "key": "0", "Name": "Combustor Outlet Temperature", "chosen": false },
  { "key": "1", "Name": " Turbine Inlet Temperature", "chosen": true },
  { "key": "2", "Name": "Turbine Outlet Temperature", "chosen": true },
  { "key": "3", "Name": "Compressor Inlet Temperature", "chosen": false },
  { "key": "4", "Name": "Compressor Outlet Temperature", "chosen": true },
  { "key": "5", "Name": "Ambient Temperature", "chosen": false },
  { "key": "6", "Name": "Combustor Inlet Pressure", "chosen": false },
  { "key": "7", "Name": "Fuel Line Pressure", "chosen": false },
  { "key": "8", "Name": "Turbine Inlet Pressure", "chosen": true },
  { "key": "9", "Name": "Ambient Pressure", "chosen": false },
  { "key": "10", "Name": " Compressor Inlet Pressure", "chosen": false },
  { "key": "11", "Name": "Compressor Outlet Pressure", "chosen": false },
  { "key": "12", "Name": "Ventury meter differential pressure", "chosen": false },
  { "key": "13", "Name": "Fuel Flow Rate", "chosen": true },
  { "key": "14", "Name": "Rpm sensor", "chosen": true },
]
const dashboardSensor = {
  sensorLabel: [
    "Combustor Outlet Temperature", "Turbine Inlet Temperature",
    "Turbine Outlet Temperature", "Compressor Inlet Temperature",
    "Compressor Outlet Temperature", "Ambient Temperature",
    "Combustor Inlet Pressure", "Fuel Line Pressure",
    "Turbine Inlet Pressure", "Ambient Pressure ",
    "Compressor Inlet Pressure", "Compressor Outlet Pressure",
    "Ventury meter differential pressure",
    "Fuel Flow Rate", "Rpm sensor",]
}
const targetKeysVal = ["1", "2", "4", "8", "13", "14"]

const titleElements = [
  {
    title: '',
    type: '',
  }
]

const testParamHash = {
  Initializedata: ['Communication', 'Initialize Started', 'Initialize Completed'],
  Startdata: ['Start Completed', 'Ignite', 'Gas Opened', 'Stage1', 'Ruel Opened', 'Stage2', 'Fuel Opened', 'Stage2', 'Gas Closed', 'Stage3'],
  Shutdowndata: ['Shutdown Initiated', 'N.Shutdown Completed'],
  Resetdata: ['Reset Values'],
  Tester_warning: 'Already exists',
  Witness_warning: 'Already exists',
  duplicate_msg: 'Duplicate value',
  warning_Id: "Please select the turbo ID",
  warning_mode: "Please select turbo mode",
  warning_name: "Please enter tester name",
  alert_targetval: "Please enter target values",
}
const helpPopup = {
  value: 'Valve status at :',
  PilotFlameAir: 'PilotFlameAir :',
  FuelInjectorAir: 'FuelInjectorAir :',
  PilotFlameGas: 'PilotFlameGas : ',
  FCVAir: 'FCVAir : ',
  FCVKeroseneFuel: 'FCVKeroseneFuel : ',
  ByPassValueI: 'ByPassValueI : ',
  ByPassValueII: 'ByPassValueII : ',
  IgnitorSwitch: 'IgnitorSwitch : ',
  KerosenePump: 'KerosenePump : ',
  LubeOilPump: 'LubeOilPump : ',
}

const turboConfigValue = {
  installed_turbine: 1,
  nozzleArea_min: 0.0002,
  nozzleArea_max: 0.0005,
  nozzleArea_step: 0.0001,
  nozzleArea_defalutValue: 0.00023,
  blade_defalutValue: 6,
  blade_min: 1,
  blade_max: 10,
  error_turbo_msg: 'Turbo ID alreadt exists',
  error_blade_msg: 'Please enter number of blades',
  added_turbo_msg: 'TurboID added successfully',
  message_title: "INSTALLED MORE THAN 1 TURBINES",
  description_data:
    "The system is installed with more than 1 turbines. Make sure there is only 1 turbine is installed. ",
}
const dashboardDataMessage = {
  transfer_warning: 'Select transfer data',
  transfer_success: 'Submitted successfully',
  message_title: "SELECTED SENSORS ",
  description_data: " Must select 6 sensors.",
  msg_warning: "Select only 6 data",
}
const endurence = {
  RPM: "53900+/-1%",
  Minutes: "10+/-1",
  trubineInletTemp: "700/-50"
}
const performance = {
  RPM1: "41500+/-1%",
  RPM2: "49000+/-1%",
  Minutes: "2",
  trubineInletTemp: "700/-50",
  ComprInletPr: '',
  ComprOutletPr: '',
  PrRatio: '2.4+/-0.1',
  AirMassFlow: '0.97'
}
const ComparisonTableDetails = {
  FixedSpeed: '5000',
  FixedOilPr: '5.00 - 6.00',
  FixedOilTemp: '70 - 80',
  FixedTurbineInletGasTemp: '300 - 400',
  FixedComprInletPr: '2 - 8',
  FixedComprOutletPr: '3',
  FixedPrRatio: '40',
  FixedComperMassFlowRate: '50',
  FixedTotalMassFlowOfAir: '10',
}
const Details = {
  Speed: '3000',
  OilPr: '5.55',
  OilTemp: '75',
  TurbineInletGasTemp: '350',
  ComprInletPr: '2',
  ComprOutletPr: '30000',
  PrRatio: '490000',
  ComperMassFlowRate: '55000',
  TotalMassFlowOfAir: '9000',
}


export {
  url, FormDetails, CompanyDetails,
  dashboardDataVal, targetKeysVal,
  titleElements, dashboardSensor,
  testParamHash, turboConfigValue,
  dashboardDataMessage, endurence, performance,
  ComparisonTableDetails, Details, helpPopup
}
