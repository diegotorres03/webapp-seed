(function () {
  'use strict'
  console.log('dt-app-menu')

  class DtAppMenu extends HTMLElement {


    constructor() {
      super()
      console.info('creating dt-app-menu')
    }
    createdCallback() {
      console.info('creating dt-app-menu')
    }

    connectedCallback() {
      console.log('attached to the dom')
      const mainDoc = document._currentScript.ownerDocument
      console.log(mainDoc)
    }
    attachedCallback() {
      this.connectedCallback()
    }


  }


  const componentName = 'dt-app-menu'

  if (window.customElements) window.customElements.define(componentName, DtAppMenu)
  else document.registerElement(componentName, DtAppMenu)


})()