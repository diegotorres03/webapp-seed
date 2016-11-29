
/**
 * Simple test for js modules
 */
(function (app) {
  'use strict'

  function testModule(sandbox) {
    sandbox.on('test', () => {
      console.log('test present')
    })
    return {
      test() { console.log('testing...') },
      testSandbox(msg) { sandbox.emit('testSandbox', msg) }
    }
  }


  console.time('appTest')
  console.info('Testing app!')

  registerModule(app, testModule)

  returnsTheSameModule(app, testModule)

  initApp(app)




  console.timeEnd('appTest')

  function registerModule(app, testModule) {
    console.group()
    console.info('registering module')
    console.time('registerModule')
    let isRegistered

    isRegistered = app.register(4, testModule)
    console.assert(isRegistered === false, 'Should not accept numbers as module name')

    isRegistered = app.register({}, testModule)
    console.assert(isRegistered === false, 'Should not accept objects as module name')

    isRegistered = app.register('testModule', null)
    console.assert(isRegistered === false, 'Should not accept empty modules')

    isRegistered = app.register('testModule', testModule)
    console.assert(isRegistered, 'Should register the module with the rigth conditions')

    console.timeEnd('registerModule')
    console.groupEnd()
  }

  function returnsTheSameModule(app, testModule) {
    console.group()
    console.info('should return the same module')
    console.time('returnsTheSameModule')
    let returnedTestModule = app.require('testModule')
    let isTheSameModule = testModule == returnedTestModule
    console.assert(isTheSameModule, 'app don\'t return the same module')
    console.timeEnd('returnsTheSameModule')
    console.groupEnd()
  }

  function initApp() {
    console.group()
    console.info('should run and instaciate a sandbox')
    console.time('Init application')
    let isInit = app.init()
    console.assert(isInit, 'app has a sandbox instance up and running')
    console.timeEnd('Init application')
    console.groupEnd()
  }




})(app)
