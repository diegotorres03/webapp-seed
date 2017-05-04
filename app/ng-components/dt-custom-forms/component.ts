(function (app, angular) {
  'use strict'

  const CustomForms = app.require('CustomForms')
  const customFormsDAO = CustomForms.DAO
  const sandbox = app.require('sandbox')


  angular
    .module('dtCustomForms')

    .component('dtCustomFormsList', {
      bindings: {},
      controller: Controller,
      templateUrl: `app/components/dt-custom-forms/custom-form-list.html`
    })


    .component('dtCustomForm', {
      bindings: {
        form: '<'
      },
      controller: Controller,
      templateUrl: `app/components/dt-custom-forms/custom-form.html`
    })

    .component('dtCustomFormNew', {
      bindings: {},
      controller: Controller,
      templateUrl: `app/components/dt-custom-forms/custom-form-new.html`
    })

  function Controller() {
    const self = this
    self.newForm = {}
    self.storage = CustomForms.storage
    self.customForms = []
    self.htmlTypes = [
      'text',
      'email',
      'password',
      'number', // min, max, step
      'range', // min, max, step
      'tel',
      'date',
      'textarea',
      'select',
      'radio', // value, checked
      'checkbox' // value, checked
    ]

    self.isNew = false

    self.$onInit = () => {
      self.clearForm()
      customFormsDAO.load()
        .then(() => {
          self.customForms = []
          self.storage.forEach(form => {
            self.customForms.push(form)
          })
        })
    }

    self.save = () => {
      // 
      customFormsDAO.create(self.newForm)
        .then(response => {
          let form = response.data
          self.customForms.push(form)
          self.storage.set(form._id, form)
          self.clearForm()
          self.isNew = false
        })
        .catch(console.error)
    }

    self.clearForm = () => {
      self.newForm = {
        name: '',
        _organizations: [],
        fields: [],
        resourceUrl: '',
        formUrl: ''
      }
    }

    self.cancel = () => {
      self.isNew = false
      self.clearForm()
    }

    self.addField = () => {
      self.newForm.fields.push({
        isEncrypted: false,
        htmlType: 'text',
        name: '',
        placeholder: ''
      })
    }

    self.removeField = field => {
      let fieldIndex = -1
      self.newForm.fields.forEach((fieldItem, index) => {
        if (fieldItem.name === field.name) {
          fieldIndex = index
        }
      })
      if (fieldIndex !== -1)
        self.newForm.fields.splice(fieldIndex, 1)
    }

    self.removeOption = (options, optionToRemove) => {
      let optionsIndex = -1
      options.forEach((option, index) => {
        if ((option.value === optionToRemove.value)
          && (option.name === optionToRemove.name)) {
          optionsIndex = index
        }
      })
      if (optionsIndex !== -1)
        options.splice(optionsIndex, 1)
    }

    self.addOrganization = _organization => {
      self.newForm._organizations.push(_organization)
    }

    self.removeOrganization = _organization => {
      let orgIndex = -1
      self.newForm._organizations.forEach((org, index) => {
        if (org._id === _organization._id) {
          orgIndex = index
        }
      })
      if (orgIndex !== -1)
        self.newForm._organizations.splice(orgIndex, 1)
    }

  }


})(app, angular)