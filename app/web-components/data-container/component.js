(function () {

  'use strict'

  let idNum = 0
  let componentName = 'template-component'
  let self

  /**
   * HTML element to handle connections to opentok video plataform
   * the element requires the data attributes data-channel-in and data-channel-name
   */
  class Channel extends HTMLElement {

    /**
     * Called when the element is created or upgraded
     */
    constructor() {
      super()
      self = this
      self.init()
    }

    /** For custom elements V0 compatibility */
    createdCallback() {
      self = this
      self.init()
    }

    init() {
      console.log(`${componentName} #${idNum} created`)
      idNum++
    }

    /**
     * Called when the element is inserted into a document, including into a shadow tree
     */
    connectedCallback() {
      self.addComponentContent()
    }

    /** For custom elements V0 compatibility */
    attachedCallback() { self.connectedCallback() }

    /**
     * when the element is added to the DOM this method adds the internat html of the 
     * component's template and add it inside the component tag is is.
     * If the content is already inside it won't be added again.
     */
    addComponentContent() {
      // self.querySelector(``)
      // TODO: check if is already added and prevent duplication
      const htmlImport = document.querySelector(`#${componentName}-import`).import
      let tmpl = htmlImport.querySelector(`#${componentName}-template`)
      let element = document.importNode(tmpl.content, true)
      self.appendChild(element)
      console.log(`${componentName} added to the DOM`)
    }
    /**
     * any method
     */
    anyMethod() {
      console.log(`anuMethod`)
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
    detachedCallback() { self.disconnectedCallback() }

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

  } // EoC

  if (window.customElements) {
    console.log(`using customElements`)
    window.customElements.define(componentName, Channel)
  }
  else {
    console.log(`using registerElement`)
    document.registerElement(componentName, Channel)
  }



})()
