const url = {
  BASE_URL: 'http://192.168.0.167:5000/',
  TURBO_CONFIG: 'turbo_config.php',
  TURBO_CONFIG_SUBMIT: 'turbo_config_validation.php',
  TEST_CONFIG: 'test_config.php',
  PARAM_CONFIG: 'param_config.php',
  GRAPH_CHART_DATA: 'graph.php',
  SHUTDOWN_CLICK: 'shutdown.php',
  RESET_CLICK: 'reset.php',
  UPDATE_CONFIG_DATA: 'testconfigedit.php',
  LOGIN_VALIDATION: 'login_validation.php',
  FORGOT_VALIDATION: 'forget.php'
}

const dashboardData = [{ "key": "1", "Name": "Combustor Outlet Temperature", "chosen": true },
{ "key": "2", "Name": "Turbo Chrager Outlet Temperature ", "chosen": true },
{ "key": "3", "Name": "Cumbustor Inlet pressure ", "chosen": true },
{ "key": "4", "Name": "RPM Combustor", "chosen": true },
{ "key": "5", "Name": "Gas Inlet pressure", "chosen": true },
{ "key": "6", "Name": "Gas Flow", "chosen": true }
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
  Resetdata: ['Reset Values']
}
const nozzleArea = {
  nozzleArea_min: "0.0002",
  nozzleArea_max: "0.0005",
  nozzleArea_step: "0.0001",
  nozzleArea_defalutValue: "0.0005"
}
export {
  url, dashboardData, titleElements,
  testParamHash, nozzleArea
}
