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

    let sandbox = sandboxReference

    const revocableSandbox = {
      revoke,

      emit,
      on,

      ask,
      answer,

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
    function revoke(){
      sandbox = undefined
    }

    function emit(...data) {
      if(sandbox)
        return sandbox.emit(...data)
      else return undefined
    }

    function on(...data) {
      if(sandbox)
        return sandbox.on(...data)
      else return undefined
    }

    function ask(...data) {
      if(sandbox)
        return sandbox.ask(...data)
      else return undefined
    }

    function answer(...data) {
      if(sandbox)
        return sandbox.answer(...data)
      else return undefined
    }

    function get(...data) {
      if(sandbox)
        return sandbox.http.get(...data)
      else return undefined
    }

    function post(...data) {
      if(sandbox)
        return sandbox.http.post(...data)
      else return undefined
    }

    function put(...data) {
      if(sandbox)
        return sandbox.http.put(...data)
      else return undefined
    }

    function del(...data) {
      if(sandbox)
        return sandbox.http.delete(...data)
      else return undefined
    }

  }


})(app)