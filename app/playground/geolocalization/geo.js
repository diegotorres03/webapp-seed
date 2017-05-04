(function () {
  

if ("geolocation" in navigator) {
  /* geolocation is available */
  navigator.geolocation.getCurrentPosition(pos => {
    console.log(pos)
    const posDiv = document.getElementById('pos')
    posDiv.innerText = `lat: ${pos.coords.latitude}, long: ${pos.coords.longitude}`

  })
} else {
  alert('sorry, geo is not available')
}


})()