var { default_config, config, storage_name: _storage_name } = require('../config.js')(runtime, this)
let singletonRequire = require('../lib/SingletonRequirer.js')(runtime, this)
var configStorage = storages.create(_storage_name)
let FileUtils = singletonRequire('FileUtils')
let commonFunctions = singletonRequire('CommonFunction')
let { logInfo, errorInfo, warnInfo, debugInfo, infoLog, debugForDev, clearLogFile, flushAllLogs } = singletonRequire('LogUtils')
config._auto_start_with_current_engine = true
config.not_lingering_float_window = true
if (!commonFunctions.ensureAccessibilityEnabled()) {
  errorInfo('获取无障碍权限失败')
  exit()
}
let unlocker = require('../lib/Unlock.js')
unlocker.exec()
configStorage.put("auto_start_rain", true)
toastLog("配置完毕done")
let mainScriptPath = FileUtils.getRealMainScriptPath(true)
engines.execScriptFile(mainScriptPath + "/unit/能量雨收集.js", { path: mainScriptPath + "/unit/", arguments: { executeByTimeTask: true, needRelock: unlocker.needRelock() } })
