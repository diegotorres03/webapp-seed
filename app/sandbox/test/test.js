/**
 * Test for sandbox and revocable sandbox
 */

const app = (function () {
  let sandboxFactory
  let sandbox
  let revocableSandboxFactory
  let revocableSandbox
  let assertionsFailed

  let app = {
    setSandbox,
    setRevocableSandbox
  }

  function setSandbox(sandboxFactoryRef) {
    sandboxFactory = sandboxFactoryRef
    initTest()
  }


  function setRevocableSandbox(revocableSandboxFactoryRef) {
    revocableSandboxFactory = revocableSandboxFactoryRef
    initTest()
  }

  return app


  function initTest() {
    if (sandboxFactory && revocableSandboxFactory) {
      assertionsFailed = 0
      console.time('Testing sandbox!')

      testFactoriesIntegrity()


      testEventFunctionality()


      testCrossSandboxIntegration()


      testRevokeSandbox()


      if(assertionsFailed > 0)
        console.warn(`${assertionsFailed} test failed!`)
      else
        console.info(`all test passed successfully!`)
      console.timeEnd('Testing sandbox!')
    }
  }


  /**
   * 
   */
  function testFactoriesIntegrity() {
    console.group()
    console.time('Testing factories integrity!')
    console.log('sandboxFactory should return a object with the rigth methods')
    sandbox = sandboxFactory()
    assert(typeof sandbox === 'object', 'sandbox should be an object')
    assert(checkSandboxMethods(sandbox), 'sandbox does not content the required methods!')
    console.log('revocableSandboxFactory should return a object with the rigth methods')
    revocableSandbox = revocableSandboxFactory(sandbox)
    assert(typeof revocableSandbox === 'object', 'revocableSandbox should be an object')
    assert(checkSandboxMethods(revocableSandbox), 'revocableSandbox does not content the required methods!')
    console.timeEnd('Testing factories integrity!')
    console.groupEnd()
  }


  function testEventFunctionality() {
    console.group()
    console.time('Testing sandboxes event functionallity!')
    let data = {
      name: 'test data',
      type: {
        format: 'JS Object'
      }
    }
    console.log('sandbox showld allow to subscrive listeners and trigger them')
    let eventRecived = false
    sandbox.on('testSandboxEvent', eventData => {
      console.log('the data recived by the event has to be the same as de data emited!')
      assert(JSON.stringify(eventData) === JSON.stringify(data),
        'the data recived by the event is not the same as de data emited!')
      eventRecived = true
    })
    sandbox.emit('testSandboxEvent', data)
    assert(eventRecived, 'the event was not recived by the sandbox listener!')
    console.log('revocableSandbox showld allow to subscrive listeners and trigger them')
    eventRecived = false
    revocableSandbox.on('testRevSandboxEvent', eventData => {
      console.log('the data recived by the event has to be the same as de data emited!')
      assert(JSON.stringify(eventData) === JSON.stringify(data),
        'the data recived by the event is not the same as de data emited!')
      eventRecived = true
    })
    revocableSandbox.emit('testRevSandboxEvent', data)
    assert(eventRecived, 'the event was not recived by the revocableSandbox listener!')
    console.timeEnd('Testing sandboxes event functionallity!')
    console.groupEnd()
  }


  function testCrossSandboxIntegration() {
    console.group()
    console.time('Testing cross sandbox integration!')
    let eventRecived = false
    let data = { text: 'example data' }

    console.log('an event emited on revocableSandbox should be listened on sandbox')
    sandbox.on('crossSandboxEvent', eventData => {
      console.log('the data recived by the event has to be the same as de data emited!')
      assert(JSON.stringify(eventData) === JSON.stringify(data),
        'the data recived by the event is not the same as de data emited!')
      eventRecived = true
    })
    revocableSandbox.emit('crossSandboxEvent', data)
    assert(eventRecived, 'the event was not recived by the sandbox listener!')

    console.log('an event emited on sandbox should be listened on revocableSandbox')
    eventRecived = false
    revocableSandbox.on('crossSandboxEvent2', eventData => {
      console.log('the data recived by the event has to be the same as de data emited!')
      assert(JSON.stringify(eventData) === JSON.stringify(data),
        'the data recived by the event is not the same as de data emited!')
      eventRecived = true
    })
    sandbox.emit('crossSandboxEvent2', data)
    assert(eventRecived, 'the event was not recived by the sandbox listener!')

    console.timeEnd('Testing cross sandbox integration!')
    console.groupEnd()
  }


  function testRevokeSandbox() {
    console.group()
    console.time('Testing revoke functionality and isolation!')
    // let eventRecived = false
    revocableSandbox.on('revokedEvent', () => {
      assert(false, 'revocable sandbox should not recive this event')
    })
    sandbox.on('emitedByRevokedSandbox', () => {
      assert(false, 'revocable sandbox should not emit events')
    })
    revocableSandbox.revoke()
    console.log('after revoke the revocableSandbox should not be able to fire events')
    revocableSandbox.emit('emitedByRevokedSandbox', {})
    console.log('after revoke the revocableSandbox should not be able to listen events')
    sandbox.emit('revokedEvent', {})
    console.timeEnd('Testing revoke functionality and isolation!')
    console.groupEnd()
  }



  /**
   * Check that the required methods for the sandbox exist
   * @param {Object} sandbox
   * @returns {Boolean} success
   */
  function checkSandboxMethods(sandbox) {
    let success = true
    success = success && !!sandbox.emit && !!sandbox.on && !!sandbox.removeListener
    success = success && !!sandbox.ask && !!sandbox.answer && !!sandbox.removeAnswer
    success = success && !!sandbox.io && !!sandbox.io.on && !!sandbox.io.emit
    success = success && !!sandbox.http
      && !!sandbox.http.get && !!sandbox.http.post
      && !!sandbox.http.put && !!sandbox.http.delete
    return success
  }

  function assert(condition, message) {
    // condition = !condition // just for test failure
    console.assert(condition, message)
    if(!condition) assertionsFailed += 1
  }



})()