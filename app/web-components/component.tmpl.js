(function (channelFact) {

  'use strict'

  let idNum = 0
  let componentName = 'dt-channel'
  let channelService
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
      console.log(idNum)
      idNum++
    }

    /* self is constructor */
    createdCallback() {
      self = this
      console.log(idNum)
      idNum++
    }

    addContent() {
      const htmlImport = document.querySelector(`#${componentName}-import`).import
      let tmpl = htmlImport.querySelector(`#${componentName}-template`)
      let element = document.importNode(tmpl.content, true)
      console.log(`dt-channel constructor[${idNum}]`)
      console.warn('dt-channel created')
      self.appendChild(element)
    }


    /**
     * Called when the element is inserted into a document, including into a shadow tree
     */
    connectedCallback() {
      if(!self.innerHTML) {
        self.addContent()
      }

      // may be has to be inside the if??
      self.querySelector('.channel-name').textContent = self.dataset.channelName
      self.querySelector('.publish').addEventListener('click', self.publish)
      self.querySelector('.stop-publishing').addEventListener('click', self.stopPublishing)
      self.querySelector('.connect').addEventListener('click', self.connect)
      self.querySelector('.disconnect').addEventListener('click', self.disconnect)

      channelService = channelFact(self.dataset.channelId)
    }

    /**
     * older version
     */
    attachedCallback() { self.connectedCallback() }

    publish() {
      let token = self.dataset.token
      console.log(`publishing`)
      // console.log(self)
      // console.log(token)
      // console.log(self.dataset.channelName)
      channelService.publish(token)
    }

    stopPublishing() {
      console.log(`stop publishing`)
      channelService.stopPublishing()
    }

    connect() {
      let token = self.dataset.token
      console.log(`connecting`)
      console.log(token)      
      channelService.subscribe(token)
    }

    disconnect() {
      console.log(`stoping connection`)
      channelService.disconnect()
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



})(channelFact)
