const url = {
  BASE_URL: 'http://192.168.0.167:5000/',
  TURBO_CONFIG: 'turbo_config.php',
  TURBO_CONFIG_SUBMIT: 'turbo_config_validation.php',
  TEST_CONFIG: 'test_config.php',
  PARAM_CONFIG: 'param_config.php',
  LOGIN_VALIDATION: 'login_validation.php',
  GRAPH_CHART_DATA: 'graph.php',
  SHUTDOWN_CLICK: 'shutdown.php',
  RESET_CLICK: 'reset.php',
  UPDATE_CONFIG_DATA: 'testconfigedit.php'
}

const dashboardData = [{ "key": "1", "Name": "Combustor Outlet Temperature 1" },
{ "key": "2", "Name": "Turbo Chrager Outlet Temperature 1" },
{ "key": "3", "Name": "Cumbustor Inlet pressure 1" },
{ "key": "4", "Name": "RPM Combustor 1" },
{ "key": "5", "Name": "RPM Combustor 2" },
{ "key": "6", "Name": "Combustor Outlet Temperature 2" },
{ "key": "7", "Name": "Turbo Chrager Outlet Temperature 2" },
{ "key": "8", "Name": "Cumbustor Inlet pressure 2" },
{ "key": "9", "Name": "Gas Inlet pressure" }]

const titleElements = [
  // {
  //   Name: "graphView",
  //   Title: "Graph View",
  //   Type: "Dashboard"
  // },
  // {
  //   Name: "tableView",
  //   Title: "Table View",
  //   Type: "Dashboard"
  // },
  // {
  //   Name: "testConfig",
  //   Title: "Test Config",
  //   Type: "Config"
  // },
  // {
  //   Name: "turboConfig",
  //   Title: "Turbo Config",
  //   Type: "Config"
  // },
  // {
  //   Name: "paramConfig",
  //   Title: "Param Config",
  //   Type: "Config"
  // },
  // {
  //   Name: "dashboardConfig",
  //   Title: "Dashboard Config",
  //   Type: "Config"
  // },
  // {
  //   Name: "testPage",
  //   Title: "Test Page",
  //   Type: "Test"
  // },
  // {
  //   Name: "runningReport",
  //   Title: "Running Report",
  //   Type: "Report"
  // },
  // {
  //   Name: "exportData",
  //   Title: "Export Data",
  //   Type: "Report"
  // },

  {
    title: '',
    type: '',
  }
]
export {
  url, dashboardData, titleElements
}