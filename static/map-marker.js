$(function() {
  var map = L.map('map')
    .setView([37.8170, -122.3642], 15);
  L.tileLayer('//{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; OpenStreetMap contributors; Tiles &copy; Stamen Design'
  }).addTo(map);
  map.attributionControl.setPrefix('');

  var lastpicked = [];

  map.on('click', function (e) {
    var location = e.latlng;
    var offset = 0.0004;
    var west = (e.latlng.lng - offset).toFixed(6);
    var south = (e.latlng.lat - offset).toFixed(6);
    var east = (e.latlng.lng + offset).toFixed(6);
    var north = (e.latlng.lat + offset).toFixed(6);
    for (var a = 0; a < lastpicked.length; a++) {
      map.removeLayer(lastpicked[a]);
    }
    lastpicked = [];
    $.get('/data?bbox=' + [west, south, east, north].join(','), function (data) {
      var x = $(data);
      x.find('way').each(function(w, way) {
        way = $(way);
        var waypts = [];
        if (way.find('tag[k="highway"]').length) {
          var nodes = way.find('nd');
          nodes.each(function(n, node) {
            node = $(node);
            var ref = node.attr('ref');
            var original = x.find('node[id="' + ref + '"]');
            waypts.push(L.latLng(original.attr('lat') * 1, original.attr('lon') * 1));
          });
          lastpicked.push(L.polyline(waypts, { weight: 3 }).addTo(map));
        }
      });
    });
  });

  var button = $('<button>').text('Near Me').css({
    position: 'fixed',
    left: '10px',
    top: '10px'
  }).click(function(e) {
    
  });
});
