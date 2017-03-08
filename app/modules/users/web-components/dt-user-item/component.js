(function (app) {

  'use strict'

  let idNum = 0
  let componentName = 'dt-user-item'
  let sandbox

  /**
   * //
   */
  class DtUserItem extends HTMLElement {

    /**
     * Called when the element is created or upgraded
     */
    constructor() {
      super()
      idNum++
      this.isPopulated = false
    }

    /* this is constructor */
    createdCallback() {
      idNum++
      this.isPopulated = false
    }

    static init(sandboxRef) {
      sandbox = sandboxRef
    }

    static stop(){}

    addContent() {
      if (!this.isPopulated) {
        let thisDocument
        if (!document.currentScript) thisDocument = document._currentScript.ownerDocument
        else thisDocument = document.currentScript.ownerDocument

        let tmpl = thisDocument.querySelector('template')
        let element = document.importNode(tmpl.content, true)
        element.querySelector('.dt-user-name').textContent = this.dataset.name
        element.querySelector('.dt-user-email').textContent = this.dataset.email
        element.querySelector('.dt-user-email-link').href = `mailto:${this.dataset.email}`
        this.appendChild(element)
        this.isPopulated = true
      }
    }


    /**
     * Called when the element is inserted into a document, including into a shadow tree
     */
    connectedCallback() {
      this.addContent()
    }

    /**
     * older version
     */
    attachedCallback() { this.connectedCallback() }

    publish() {
      console.log(`publishing`)
      // console.log(this)
      // console.log(token)
      // console.log(this.dataset.channelName)
    }

    stopPublishing() {
      console.log(`stop publishing`)
    }

    connect() {
      console.log(`connecting`)
    }

    disconnect() {
      console.log(`stoping connection`)
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
    detachedCallback() { this.disconnectedCallback() }

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
    window.customElements.define(componentName, DtUserItem)
  }
  else {
    console.log(`using registerElement`)
    document.registerElement(componentName, DtUserItem)
  }

  app.register('DtUserItem', DtUserItem)


})(app)
