(function (app) {
  'use strict'

  const sandbox = app.require('sandbox')
  const CustomForms = app.require('CustomForms')
  const customFormsStorage = CustomForms.storage


	const customFormDAO = {
    find,
    list,
    create,
    read,
    update,
    delete: deleteForm,


    // addGroupInvitation,
    // removeGroupInvitation,
    // addGroup,
    // removeGroup,
    load
  }

  CustomForms.DAO = Object.freeze(customFormDAO)


  function find(query){
    return sandbox.http.post(`${app.backendUrl}/api/findusers`, {query})
  }

  function list(query = {}) {
    // sandbox.request("GET", `${app.backendUrl}/api/customforms`, query)
    return sandbox.http.get(`${app.backendUrl}/api/customforms`, query)
    // return sandbox.http.get(`${app.backendUrl}/api/customforms`, query)
  }

  function create(customForm) {
    return sandbox.http.post('https://qifpkkyx9a.execute-api.us-west-2.amazonaws.com/dev/forms/templates', customForm)
    // return sandbox.http.post(`${app.backendUrl}/api/customforms`, customForm)
  }

  function read(_customForm) {
    if (_customForm) {
      return sandbox.http.get(`${app.backendUrl}/api/customforms/${_customForm}`)
    } else {
      return customFormDAO.list()
    }
  }

  function update(customForm) {
    return sandbox.http.put(`${app.backendUrl}/api/customforms/${customForm._id}`, customForm)
    // return sandbox.http.post(app.backendUrl + '/api/customforms', customForm)
  }

  function deleteForm(_customForm) { // delete mey be a reserved word
    return sandbox.http.delete(`${app.backendUrl}/api/customforms/${_customForm}`)
  }
  
  // function addGroupInvitation(_customForm, _group) {
  //   return sandbox.http.post(`${app.backendUrl}/api/customforms/${_customForm}/groupinvitation`,{_group})
  // }

  // function removeGroupInvitation(_customForm, _group) {
  //   return sandbox.http.delete(`${app.backendUrl}/api/customforms/${_customForm}/groupinvitation/${_group}`)
  // }
  
  // function addGroup(_customForm, _group) {
  //   return sandbox.http.post(`${app.backendUrl}/api/customforms/${_customForm}/organizationgroup`,{_group})
  // }

  // function removeGroup(_customForm, _group) {
  //   return sandbox.http.delete(`${app.backendUrl}/api/customforms/${_customForm}/organizationgroup/${_group}`)
  // }


  function load() {
    return new Promise((resolve, reject) => {
      customFormDAO.list()
        .then(response => {
          let customForms = response.data
          customForms.forEach(form => {
            // if(!customFormsStorage[form._id]) customFormsStorage[form._id] = {}
            // customFormsStorage[form._id] = form
            customFormsStorage.set(form._id, form)
          })
          resolve()
        })
        .catch(reject)
    })
  }
})(app)