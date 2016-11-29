(function () {

  'use strict'

  let idNum = 0
  let componentName = 'dt-router'

  /**
   * HTML element to handle connections to opentok video plataform
   * the element requires the data attributes data-channel-in and data-channel-name
   */
  class DtRouter extends HTMLElement {

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
      this._id = idNum
      idNum += 1
    }

    /**
     * Called when the element is inserted into a document, including into a shadow tree
     * the normal hash route will be
     * #/section/param1/param2/.../paramN
     */
    connectedCallback() {
      this.addComponentContent()
      let sections = this.children
      handleHashChange(sections)
      window.addEventListener('hashchange', () => handleHashChange(sections))

    }

    /** For custom elements V0 compatibility */
    attachedCallback() { this.connectedCallback() }

    /**
     * when the element is added to the DOM this method adds the internat html of the 
     * component's template and add it inside the component tag is is.
     * If the content is already inside it won't be added again.
     */
    addComponentContent() {
    }


    /**
     * Called when the element is removed from a document
     */
    disconnectedCallback() {
    }

    /** For custom elements V0 compatibility */
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
    // console.log(`using customElements`)
    window.customElements.define(componentName, DtRouter)
  }
  else {
    // console.log(`using registerElement`)
    document.registerElement(componentName, DtRouter)
  }


  /**
   * handle all the process of read the curren hash, display the correct section,
   * hide the other sections and pass the params to the selected section
   */
  function handleHashChange(sections) {
    let params = window.location.hash.split('/')
    let hashPath = params[1] // the value of params[0] is '#' so we don't need it
    for (let i = 0; i < sections.length; i++) {
      let section = sections[i]
      let sectionPath = section.dataset.path
      if (sectionPath) {
        if (hashPath === sectionPath) {
          section.classList.remove('hide')
          section.dataset.params = params.splice(2)
        } else {
          section.classList.add('hide')
        }
      }
    }
    if (!hashPath) sections[0].classList.remove('hide')
  }



})()
