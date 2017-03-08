/**
 * app core or controller
 * Is in charge of manage all the modules in the app, and if there is a library or
 * a framework, just the app shoul know about it, 
 * that will decouple the rest of the application from the library
 */
const app = (function () {
  'use strict'

  let sandbox
  let sandboxFactory
  let revocableSandboxFactory
  // let httpUrl = 'http://localhost:8080' // for HTTP API
  // let ioUrl // for Web Sockets

  /**
	 * This map holds the reference of the module and the sandbox, when a module is stoped
	 * the reference to the sandbox must be assigned to undefined so the module won`t be able
	 * to perform actions
	 */
  const sandboxList = new Map()
  const moduleList = new Map()
  const moduleInstanceList = new Map()

  let publicMethods = {
    init,
    stop,

    register, // to register a modules
    require,
    setSandbox,
    setRevocableSandbox,

    initModule,
    initAllModules,

    stopModule,
    stopAllModules
  }

  return Object.freeze(publicMethods)

  /**
   * Initialize the application
   */
  function init() {
    sandbox = sandboxFactory()
    if(sandbox) {
      initAllModules()
      return true
    }
    else return false
    // initAllModules()
  }

  function stop() { }

  /**
   * Register a module and store it in the modules map
   * @param {String} moduleName
   * @param {Object} moduleInstance
   * @return {Boolean} success
   */
  function register(moduleName, moduleInstance) {
    if (typeof moduleName === 'string'
      && !moduleList.has(moduleName)
      && moduleInstance
    ) {
      moduleList.set(moduleName, moduleInstance)
      return true
    }
    else return false
  }

  function require(moduleName) {
    if (!moduleList.has(moduleName)) return false
    return moduleList.get(moduleName)
  }

  /**
   * Set the sandbox factory wich will be used as mediator trougth
   * the app.
   * Just allow to set sandbox one time.
   * @param {Function} sandboxFactoryReference
   * @returns {Boolean} success
   */
  function setSandbox(sandboxFactoryReference) {
    if (!sandboxFactory) {
      console.info(`setting sandboxFactory`)
      sandboxFactory = sandboxFactoryReference
      return true
    }
    else return false
  }


  /**
   * Set the revocalbe sandbox factory 
   * wich will be used as mediator trougth
   * the app.
   * Just allow to set sandbox one time.
   * @param {Function} revocableSandboxFactoryReference
   * @returns {Boolean} success
   */
  function setRevocableSandbox(revocableSandboxFactoryReference) {
    if (!revocableSandboxFactory) {
      console.info(`setting revocableSandboxFactory`)
      revocableSandboxFactory = revocableSandboxFactoryReference
      return true
    }
    else return false
  }

  /**
   * Call the module init method and pass it a revocableSandbox
   * @param {String} moduleName
   * @returns {Boolean} success
   */
  function initModule(moduleName) {
    if (moduleList.has(moduleName)) {
      console.info(`initializing ${moduleName}`)
      let revocableSandbox = revocableSandboxFactory(sandbox)
      let moduleiInstance = moduleList.get(moduleName)
      sandboxList.set(moduleName, revocableSandbox)
      let moduleInstance = moduleiInstance.init(revocableSandbox)
      moduleInstanceList.set('moduleName', moduleInstance)
      return true
    }
    else {
      console.ingfo(`not initializing ${moduleName}`)      
      return false
    }
  }

  /**
   * Init all the modules in the moduleList
   */
  function initAllModules() {
    console.log(moduleList)
    moduleList.forEach((moduleInstance, moduleName) => {
      console.info(`initializing ${moduleName}!`)
      initModule(moduleName)
    })
    // moduleList.keys(moduleName => {
    // })
  }


  /**
   * Call the module stop method and call revocableSandbox's revoke method
   * @param {String} moduleName
   * @returns {Boolean} success
   */
  function stopModule(moduleName) {
    if (moduleInstanceList.has(moduleName)) {
        let revocableSandbox = sandboxList.get(moduleName)
        revocableSandbox.revoke()
        moduleInstanceList.delete(moduleName)
        return true
    }
    else return false
  }

  /**
   * Stop all the modules in the moduleList
   */
  function stopAllModules() {
    moduleList.keys(moduleName => {
      console.info(`stoping ${moduleName}!`)
      stopModule(moduleName)
    })
  }

})()