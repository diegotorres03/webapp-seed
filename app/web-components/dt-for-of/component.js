(function () {

  'use strict'

  let idNum = 0
  let componentName = 'dt-for-of'

  /**
   * HTML element 
   */
  class DtForOf extends HTMLElement {

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
      idNum++
    }

    /**
     * Called when the element is inserted into a document, including into a shadow tree
     */
    connectedCallback() {
      this.addComponentContent()
    }

    /** For custom elements V0 compatibility */
    attachedCallback() { this.connectedCallback() }

    /**
     * when the element is added to the DOM this method adds the internat html of the 
     * component's template and add it inside the component tag is is.
     * If the content is already inside it won't be added again.
     */
    addComponentContent() { }

    /**
     * any method
     */
    setData(data, autoRefresh = true) {
      this.list = data
      if (autoRefresh) this.refresh()
    }
    /**
     * any method
     */
    refresh() {
      if (!this.forTemplate) {
        this.forTemplate = this.cloneNode(true)
      }

      if (Array.isArray(this.list)) {
        while (this.firstChild) this.removeChild(this.firstChild)
        for (let item of this.list) {
          let newElement = this.forTemplate.cloneNode(true)
          let returnedElement = insertData(newElement.children, item, this.dataset.name)
          while (returnedElement.length > 0)
            this.appendChild(returnedElement[0])
        }
      }
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
    window.customElements.define(componentName, DtForOf)
  }
  else {
    document.registerElement(componentName, DtForOf)
  }


  function insertData(elementCollection, data, dataName) {
    let elementsLength = elementCollection.length
    for (let i = 0; i < elementsLength; i++) {
      let element = elementCollection[i]
      let elementLength = element.children.length
      if (elementLength == 0) {
        if (element.dataset.content) {
          let contentPath = element.dataset.content.split('.')
          let value = data
          contentPath = contentPath.splice(1)
          while (contentPath.length > 0) {
            value = value[contentPath[0]]
            contentPath = contentPath.splice(1)
          }
          elementCollection[i].textContent = value
          elementCollection[i].dataset.value = value
        }
      } else {
        elementCollection[i] = insertData(element.children, data, dataName)
      }
    }
    return elementCollection
  }


})()
