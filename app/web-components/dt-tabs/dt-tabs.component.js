(function () {

  'use strict'

  let idNum = 0
  let componentName = 'dt-tabs'

  /**
   * HTML element to handle connections to opentok video plataform
   * the element requires the data attributes data-channel-in and data-channel-name
   */
  class DtTabs extends HTMLElement {

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


      // const importDoc = document._currentScript.ownerDocument; // importee

      // import html from template
      let importDoc
      if (document.currentScript) {
        importDoc = document.currentScript.ownerDocument; // importee
      } else if(document._currentScript) {
        importDoc = document._currentScript.ownerDocument; // importee
      } else {
        importDoc = document.querySelector('#dt-tabs-import').import
      }
      this.template = importDoc.querySelector('template').cloneNode(true)

      Array.from(this.children).forEach((section, index) => {
        const check = document.createElement('input')
        check.type = 'radio'
        check.name = 'dt-forms-' + idNum
        check.classList.add('dt-tab-control')
        check.id = section.id
        section.id = section.id + idNum
        section.classList.add('dt-tab-section')
        if (index === 0) check.setAttribute('checked', true)
        this.appendChild(check)
        this.appendChild(section)
      })

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


  } // EoC

  if (window.customElements) {
    console.log(`using customElements`)
    window.customElements.define(componentName, DtTabs)
  } else {
    console.log(`using registerElement`)
    document.registerElement(componentName, DtTabs)
  }



})()