(function (angular) {
  'use strict'
  const CustomForms = app.require('CustomForms')
  const customFormsDAO = CustomForms.DAO
  const sandbox = app.require('sandbox')

  angular
    .module('dtCustomForms', [])
    .run(['$http', 'socketService', ($http, socketService) => {
      sandbox.setHttp($http)
      sandbox.setIO(socketService)

      sandbox.on('loggedIn', session => {
        // customFormsDAO.load()
      })

    }])


})(angular)