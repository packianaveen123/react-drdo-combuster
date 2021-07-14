const url = {
  BASE_URL: 'http://192.168.0.167:5000/',
  TURBO_CONFIG: 'turbo_config.php',
  TURBO_CONFIG_SUBMIT: 'turbo_config_validation.php',
  TEST_CONFIG: 'test_config.php',
  PARAM_CONFIG: 'param_config.php',
  SHUTDOWN_CLICK: 'shutdown.php',
  RESET_CLICK: 'reset.php',
  UPDATE_CONFIG_DATA: 'testconfigedit.php',
  LOGIN_VALIDATION: 'login_validation.php',
  FORGOT_VALIDATION: 'forget.php',
  REGISTERPAGE_VALIDATION: 'Registration.php',
  TABLE_VIEW: 'tableview.php',
  GRAPH_CHART_DATA: 'graph.php',
  SENSOR_DATA: 'getdata.php',
  TURBOID_VALUE: 'turboIdValue.php',
  TABLE_STATUSDATA: 'statusValue.php'
}

// const dashboardData = [{ "key": "1", "Name": "Combustor Outlet Temperature", "chosen": true },
// { "key": "2", "Name": "Turbo Chrager Outlet Temperature ", "chosen": true },
// { "key": "3", "Name": "Cumbustor Inlet pressure ", "chosen": true },
// { "key": "4", "Name": "RPM Combustor", "chosen": true },
// { "key": "5", "Name": "Gas Inlet pressure", "chosen": true },
// { "key": "6", "Name": "Gas Flow", "chosen": true }
// ]

const dashboardData = [
{ "key": "1", "Name": "Combustor Outlet Temperature ", "chosen": true },
{ "key": "2", "Name": " Turbine Inlet Temperature ", "chosen": true },
{ "key": "3", "Name": "Turbine Outlet Temperature ", "chosen": true },
{ "key": "4", "Name": "Compressor Inlet Temperature ", "chosen": true },
{ "key": "5", "Name": "Compressor Outlet Temperature", "chosen": true },
{ "key": "6", "Name": "Ambient Temperature", "chosen": true },
{ "key": "7", "Name": "Combustor Inlet Pressure", "chosen": false },
{ "key": "8", "Name": "Fuel Line Pressure  ", "chosen": false },
{ "key": "9", "Name": "Turbine Inlet Pressure", "chosen": false },
{ "key": "10", "Name": "Ambient Pressure  ", "chosen": false },
{ "key": "11", "Name": " Compressor Inlet Pressure", "chosen": false },
{ "key": "12", "Name": "Compressor Outlet Pressure ", "chosen": false },
{ "key": "13", "Name": "Ventury meter differential pressure", "chosen": false },
{ "key": "14", "Name": "Fuel Flow Rate  ", "chosen": false },
{ "key": "15", "Name": "Rpm sensor  ", "chosen": false },
]

const titleElements = [
  {
    title: '',
    type: '',
  }
]

const testParamHash = {
  Initializedata: ['Communication', 'Initialize Started', 'Initialize Completed'],
  Startdata: ['Start Completed', 'ignite', 'gasopened', 'stage1', 'fuelopened', 'stage2', 'fuelopened', 'stage2', 'gasclosed', 'stage3'],
  Shutdowndata: ['shutdownInitiated', 'nshutdowncompleted'],
  Resetdata: ['Reset Values'],
  Tester_warning: 'Already exists',
  Witness_warning: 'Already exists'
}
const turboConfigValue = {
  nozzleArea_min: 0.0002,
  nozzleArea_max: 0.0005,
  nozzleArea_step: 0.0001,
  nozzleArea_defalutValue: 0.00023,
  blade_defalutValue: 6,
  blade_min: 1,
  blade_max: 10,
  error_turbo_msg: 'Turbo ID alreadt exists',
  error_blade_msg: 'Please enter number of blades',
  added_turbo_msg: 'TurboID added successfully'
}
const dashboardDataMessage = {
  transfer_warning: 'select transfer data',
  transfer_success: 'submitted successfully'
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
  url, dashboardData, titleElements,
  testParamHash, turboConfigValue,
  dashboardDataMessage, endurence, performance, ComparisonTableDetails, Details
}
