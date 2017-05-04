(function (Chart) {

  'use strict'

  let idNum = 0
  let componentName = 'dt-chart'

  // document._currentScript = document.currentScript || document._currentScript

  /**
   * HTML element to handle connections to opentok video plataform
   * the element requires the data attributes data-channel-in and data-channel-name
   */
  class DtChart extends HTMLElement {

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
      console.log('adding component')
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

      const jsonData = this.textContent
      console.log(jsonData)
      this.textContent = ''
      try {
        let data = JSON.parse(jsonData)
        const fieldSet = {}
        const keySet = new Set()
        data.items.forEach(item => {
          const keys = Object.keys(item.fields)
          keys.forEach(key => {
            if (!fieldSet[key]) fieldSet[key] = []
            fieldSet[key].push(item.fields[key])
            keySet.add(key)
          })
        })
        console.log(fieldSet)
        console.log(keySet)
        // console.log(JSON.stringify(data, undefined, 2))
        this.rawData = data
        this.datasetNames = keySet
        this.fieldSet = fieldSet
      } catch (err) {
        console.warn(err)
      }
      // import html from template
      let importDoc
      if (document.currentScript) {
        console.log(document.currentScript)
        importDoc = document.currentScript.ownerDocument; // importee
        console.log('currentScript')
      } else if (document._currentScript) {
        importDoc = document._currentScript.ownerDocument; // importee
        console.log('_currentScript')
      } else {
        importDoc = document.querySelector('#dt-chart-import').import
      }
      console.log(importDoc)
      this.template = importDoc.querySelector('template').cloneNode(true)
      console.log(this.template)
      this.appendChild(this.template.content)
      console.log(this.children)

      // add event listener to chart type
      const select = this.children[0]
      select.addEventListener('change', event => {
        this.type = event.target.value
        if ('destroy' in this.chart) this.chart.destroy()
        this.render()
      })

      const fieldX = this.children[1]
      this.datasetNames.forEach(datasetName => {
        const option = document.createElement('option')
        option.value = datasetName
        option.text = datasetName
        fieldX.appendChild(option)
      })

      fieldX.addEventListener('change', event => {
        const key = event.target.value
        const data = this.rawData.items.map(item => Number(item.fields[key]))
        this.data = {
          datasets: [{
            data,
            label: key
          }]
        }
        this.render()
      })

      // const fieldY = this.children[2]
      // this.datasetNames.forEach(datasetName => {
      //   const option = document.createElement('option')
      //   option.value = datasetName
      //   option.text = datasetName
      //   fieldY.appendChild(option)
      // })

      // fieldY.addEventListener('change', event => {
      //   // const key = event.target.value
      //   // const data = this.rawData.items.map(item => Number(item.fields[key]))
      //   // this.data = { datasets: [{ data, label: key }] }
      //   // this.render()
      // })

      // const fieldZ = this.children[3]
      // this.datasetNames.forEach(datasetName => {
      //   const option = document.createElement('option')
      //   option.value = datasetName
      //   option.text = datasetName
      //   fieldZ.appendChild(option)
      // })

      // fieldZ.addEventListener('change', event => {
      //   // const key = event.target.value
      //   // const data = this.rawData.items.map(item => Number(item.fields[key]))
      //   // this.data = { datasets: [{ data, label: key }] }
      //   // this.render()
      // })


      // instanciate the first chart
      this.type = 'line'
      this.render()

    }

    render() {
      // set up chart
      const chart = this.children[4]
      const options = {
        type: this.type,
        data: {
          labels: ['uno', 'dos', 'tres', 'cuatro'],
          datasets: this.data ? this.data.datasets : []
        },
        options: {
          responsive: false
        }
      }
      console.log(options)
      if (!this.chartStore) this.chartStore = {}
      this.chartStore[this.type] = new Chart(chart, options)
      this.chart = this.chartStore[this.type]
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
    console.log(`using customElements`, componentName)
    window.customElements.define(componentName, DtChart)
  } else {
    console.log(`using registerElement`, componentName)
    document.registerElement(componentName, DtChart)
  }



})(Chart)