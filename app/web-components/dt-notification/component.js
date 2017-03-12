(function () {

  'use strict'

  let idNum = 0
  let componentName = 'dt-notification'
  let self

  let canNotify = false

  /**
   * HTML element to handle connections to opentok video plataform
   * the element requires the data attributes data-channel-in and data-channel-name
   */
  class Notifier extends HTMLElement {

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

      if (window.Notification) {
        if (Notification.permission === 'granted') {
          new Notification('you have permission to notify')
          canNotify = true
        } else if(Notification.permission === 'default') {
          Notification.requestPermission().then(console.log)
        } else if(Notification.permission === 'denied') {
          // alert('you don\'t have permission to notify')
          Notification.requestPermission().then(console.log)
        }
      } else {
        canNotify = false
      }

    }

    /**
     * Called when the element is inserted into a document, including into a shadow tree
     */
    connectedCallback() {
      self.addComponentContent()
    }

    /** For custom elements V0 compatibility */
    attachedCallback() {
      self.connectedCallback()
    }

    /**
     * when the element is added to the DOM this method adds the internat html of the 
     * component's template and add it inside the component tag is is.
     * If the content is already inside it won't be added again.
     */
    addComponentContent() {
      // self.querySelector(``)
      // TODO: check if is already added and prevent duplication
      // const htmlImport = document.querySelector(`#${componentName}-import`).import
      // const htmlImport = document.currentScript.ownerDocument; // importee
      // let tmpl = htmlImport.querySelector(`#${componentName}-template`)
      // let element = document.importNode(tmpl.content, true)
      // self.appendChild(element)
      // console.log(`${componentName} added to the DOM`)
    }
    /**
     * any method
     */
    notify(message) {
      console.log(message)
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
      self.disconnectedCallback()
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
    window.customElements.define(componentName, Notifier)
  } else {
    console.log(`using registerElement`)
    document.registerElement(componentName, Notifier)
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