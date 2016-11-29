/**
 * This is a wraper for the sadbox, this give the avility to the application
 * controller to disconnect a given module from the sandbox.
 * 
 * Is an extra layer of scurity in the application
 */
(function (app) {
  'use strict'

  app.setRevocableSandbox(revocableSandboxFactory)

  function revocableSandboxFactory(sandboxReference) {

    const eventList = new Map()
    const askListeners = new Map()

    let sandbox = sandboxReference

    const revocableSandbox = {
      revoke,

      emit,
      on,
      removeListener,

      ask,
      answer,
      removeAnswer,

      http: {
        get,
        post,
        put,
        delete: del
      },

      io: {
        emit,
        on
      }
    }

    return Object.freeze(revocableSandbox)

    /**
     * Revoke the current access to the main sandbox
     * this disable the comunication of the module
     */
    function revoke() {
      // remove all callbacks from listeners
      eventList.forEach((events, eventName) => {
        events.forEach(event => sandbox.removeListener(eventName, event))
      })
      eventList.clear()      

      // remove all the answers
      askListeners.forEach((event, question) => sandbox.removeAnswer(question, event))
      askListeners.clear()

      sandbox = undefined
    }


    function emit(...data) {
      if (sandbox)
        return sandbox.emit(...data)
      else return undefined
    }

    function on(eventName, callback) {
      if (!eventList.has(eventName)) eventList.set(eventName, new Set())
      eventList.get(eventName).add(callback)

      if (sandbox) return sandbox.on(eventName, callback)
      else return undefined
    }

    function removeListener() { }

    function ask(...data) {
      if (sandbox)
        return sandbox.ask(...data)
      else return undefined
    }

    function answer(...data) {
      if (sandbox)
        return sandbox.answer(...data)
      else return undefined
    }

    function removeAnswer() { }

    function get(...data) {
      if (sandbox)
        return sandbox.http.get(...data)
      else return undefined
    }

    function post(...data) {
      if (sandbox)
        return sandbox.http.post(...data)
      else return undefined
    }

    function put(...data) {
      if (sandbox)
        return sandbox.http.put(...data)
      else return undefined
    }

    function del(...data) {
      if (sandbox)
        return sandbox.http.delete(...data)
      else return undefined
    }

  }


})(app)