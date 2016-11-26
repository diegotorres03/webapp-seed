(function(app){
  'use strict'
  app.register('testModule', testModuleFactory)

  function testModuleFactory(sandbox) {
    console.log(sandbox)
    sandbox.on('test', ()=> {
      console.log('test present')
    })
  }

})(app)