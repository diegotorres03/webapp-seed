(function () {

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
      let content
      const importDoc = document.currentScript.ownerDocument; // importee
      console.log(importDoc)
      this.template = importDoc.querySelector('template')
      console.log(this.template)
      try {
        // content = JSON.parse(this.textContent)
        content = this.textContent
        this.formTemplate = JSON.parse(content)
        console.log(this.formTemplate)
        // this.fomtTemplate = JSON.parse(this.formTemplate)
        // console.log(JSON.parse(content))
      } catch (err) {
        console.warn(err.message)
        content = {}
        this.formTemplate = {}
      }
      this.textContent = ''
      this.createForm()
      this.appendChild(this.template.content)

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


    createForm() {
      const formTitle = document.createElement('h4')
      formTitle.textContent = this.formTemplate.name
      this.appendChild(formTitle)
      const fields = document.createElement('ol')
      console.log(fields)
      this.formTemplate.fields.forEach(field => {
        const label = document.createElement('label')
        const li = document.createElement('li')
        label.textContent = field.label
        li.appendChild(label)
        fields.appendChild(li)
        // let input
        const input = this.createInput(field)
        console.log(input)
        li.appendChild(input)

        // input = document.createElement('')
      })
      console.log(this.children)
      this.appendChild(fields)
      // section.appendChild(fields)
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
          break
      }
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

  } // EoC

  if (window.customElements) {
    console.log(`using customElements`)
    window.customElements.define(componentName, DtForm)
  } else {
    console.log(`using registerElement`)
    document.registerElement(componentName, DtForm)
  }



})()


// var importDoc = document.currentScript.ownerDocument; // importee

//     // Define and register <shadow-element>
//     // that uses Shadow DOM and a template.
//     var proto2 = Object.create(HTMLElement.prototype);

//     proto2.createdCallback = function() {
//       // get template in import
//       var template = importDoc.querySelector('#t');

//       // import template into
//       var clone = document.importNode(template.content, true);

//       var root = this.createShadowRoot();
//       root.appendChild(clone);
//     };

//     document.registerElement('shadow-element', {prototype: proto2});