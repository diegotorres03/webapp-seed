(function(app){
  'use strict'
  window.addEventListener('WebComponentsReady', function (event) {
    // imports are loaded and elements have been registered
    console.log('Components are ready');
    console.log(app.init())
  })

  window.addEventListener('load', event => {
    // let iFrame = document.createElement('iframe')
    // iFrame.src = 'manifest.html'
    // iFrame.style.display = 'none'
    // document.querySelector('body').appendChild(iFrame)
  })

})(app)