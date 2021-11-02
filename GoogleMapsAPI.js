



var map, latLong, redot, googlewin;
var i = 0;
var radaranim;

var timestamps = ['900913-m50m', '900913-m45m', '900913-m40m', '900913-m35m', '900913-m30m', '900913-m25m', '900913-m20m', '900913-m15m', '900913-m10m', '900913-m05m', '900913'];

function initMap() {
    // Center for map
    latLong = {lat: 42.0308, lng: -93.6319};
    // Create map
    map = new google.maps.Map($('#map')[0], {
      zoom: 7,
      center: latLong
    });
    
    // Create marker at center map location
    redot = new google.maps.Marker({
      position: latLong,
      map: map
    }); 
}




  radaranim = setInterval(startAnimation, 500);




// Animate the Weather Radar
function startAnimation(){
    tileNEX = new google.maps.ImageMapType({
      getTileUrl: function(tile, zoom) {
          return "https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-" + timestamps[i] + "/" + zoom + "/" + tile.x + "/" + tile.y +".png"; 
      },
      tileSize: new google.maps.Size(256, 256),
      opacity:0.60,
      name : 'NEXRAD',
      isPng: true
    });
    map.overlayMapTypes.setAt("0", tileNEX);
    i++;
    if (i > 10 ){
      i = 0;
    }
}

