(function ( ) {

  'use strict'

  let idNum = 0
  let componentName = 'dt-form'

  /**
   * HTML element to handle connections to opentok video plataform
   * the element requires the data attributes data-channel-in and data-channel-name
   */
  class DtForm extends HTMLElement {

    /**
     * Called when the element is created or upgraded
     */
    constructor() {
      super()
      this.init()
    }

    /** For custom elements V0 compatibility */
    createdCallback() {
      this.init()
    }

    init() {
      console.log(`${componentName} #${idNum} created`)
      idNum++
      this.formTemplate = {}
    }

    /**
     * Called when the element is inserted into a document, including into a shadow tree
     */
    connectedCallback() {
      this.addComponentContent()
    }

    /** For custom elements V0 compatibility */
    attachedCallback() {
      this.connectedCallback()
    }

    /**
     * when the element is added to the DOM this method adds the internat html of the 
     * component's template and add it inside the component tag is is.
     * If the content is already inside it won't be added again.
     */
    addComponentContent() {
      // this without polyfill
      // const importDoc = document.currentScript.ownerDocument; // importee

      console.log(this.getAttribute('src'))
      const importDoc = document._currentScript.ownerDocument; // importee
      this.template = importDoc.querySelector('template').cloneNode(true)
      console.log(this.template)
      this.getTemplate()

    }


    /**
     * Called when the element is removed from a document
     */
    disconnectedCallback() {
      console.log('disconnectedCallback called')
    }
    /**
     * older version
     */
    detachedCallback() {
      this.disconnectedCallback()
    }

    /**
     * Called when an attribute is changed, appended, removed, or replaced on the element.
     * Only called for observed attributes.
     */
    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      console.log(`attributeChangedCallback ${attributeName} ${oldValue} ${newValue} ${namespace}`)
    }

    /**
     * Called when the element is adopted into a new document
     */
    adoptedCallback(oldDocument, newDocument) {
      console.log(`adoptedCallback ${oldDocument} ${newDocument}`)
    }

    getTemplate() {
      const src = this.getAttribute('src')
      return new Promise((resolve, reject) => {

        console.log(src)
        if (!src) {
          try {
            console.log(this.textContent)
            this.formTemplate = JSON.parse(this.textContent)
            console.log(this.formTemplate)
            this.textContent = ''
            resolve()
          } catch (err) {
            this.formTemplate = {}
            reject(err)
          }
        } else {
          // this.formTemplate
          fetch(src)
            .then(response => response.json())
            .then(data => this.createForm(data))
            .catch(reject)
        }
      })
    }

    createForm(data) {
      this.formTemplate = data
      const formTitle = document.createElement('h4')
      formTitle.textContent = this.formTemplate.name
      this.appendChild(formTitle)
      const fields = document.createElement('ol')
      // console.log(fields)
      this.inputs = []
      this.formTemplate.fields.forEach(field => {
        const label = document.createElement('label')
        const li = document.createElement('li')
        label.textContent = field.label
        li.appendChild(label)
        fields.appendChild(li)
        // let input
        const input = this.createInput(field)
        this.inputs.push(input)
        // console.log(input)
        li.appendChild(input)
      })
      this.appendChild(fields)
      this.appendForm()
    }

    createInput(field) {
      let input
      switch (field.htmlType) {
        case 'select':
          input = document.createElement('select')
          this.addOptions(input, field)
          break
        case 'textarea':
          input = document.createElement('textarea')
          break
        case 'text':
        case 'number':
        case 'range':
        case 'email':
        case 'password':
        case 'date':
        case 'tel':
        case 'radio':
        case 'checkbox':
          input = document.createElement('input')
          input.type = field.htmlType
          input.placeholder = field.placeholder
          break
      }
      input.name = field.name
      return input
    }

    addOptions(select, field) {
      field.options.forEach(opt => {
        const option = document.createElement('option')
        option.textContent = opt.name
        option.value = opt.value
        select.appendChild(option)
      })
    }

    appendForm() {
      this.appendChild(this.template.content)
      this.saveBtn = this.querySelector('#save-form')
      // console.log(this)
      console.log(this.saveBtn)
      this.saveBtn.addEventListener('click', event => {
        event.preventDefault()
        console.log(this.getAttribute('action'))
        const fields = {}
        this.inputs.forEach(input => {
          fields[input.name] = input.value
          // console.log(input.name)
          // console.log(input.value)
        })
        const data = {
          fields,
          name: this.formTemplate.name,
          _template: this.formTemplate._id,
          _user: 'guest'
        }
        this.send(data)
      })
    }

    send(data) {
      console.log(data)
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      // const request = new Request(this.getAttribute('action'), {
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   method: 'POST',
      //   body: data,
      //   mode: 'cors'
      // })
      // fetch(request, {
      fetch(this.getAttribute('action'), {
          headers,
          method: 'POST',
          body: JSON.stringify(data),
          mode: 'cors'
        })
        .then(console.log)
        .catch(console.error)

    }

  } // EoC

  if (window.customElements) {
    console.log(`using customElements`)
    window.customElements.define(componentName, DtForm)
  } else {
    console.log(`using registerElement`)
    document.registerElement(componentName, DtForm)
  }



})()