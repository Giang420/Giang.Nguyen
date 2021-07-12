

requirejs(['../src/WorldWind',
        './LayerManager'],
    function (ww, LayerManager) {
      "use strict";

      // Create the World Window.
      var wwind = new WorldWind.WorldWindow("canvasOne");


      var layers = [
        {layer: new WorldWind.BMNGLayer(), enabled: true},
        {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
        {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
        {layer: new WorldWind.CoordinatesDisplayLayer(wwind), enabled: true},
        {layer: new WorldWind.ViewControlsLayer(wwind), enabled: true}
      ];

      for (var l = 0; l < layers.length; l++) {
        layers[l].layer.enabled = layers[l].enabled;
        wwind.addLayer(layers[l].layer);
      }

      // Define the images we'll use for the placemarks.
      var img = [
       "trap.jpeg",
        "tired.png"
      ];

      var imgLib = WorldWind.configuration.baseUrl + "images/pushpins/",
        placemark,
        placemarkAttributes = new WorldWind.PlacemarkAttributes(null),
        highlightAttributes,
        plcmarkLayer = new WorldWind.RenderableLayer(":)"),
        latitude = 21.02,
        longitude = 105.85;

      placemarkAttributes.imageScale = 1;
      placemarkAttributes.imageOffset = new WorldWind.Offset(
        WorldWind.OFFSET_FRACTION, 0.8,
        WorldWind.OFFSET_FRACTION, 0.0);
      placemarkAttributes.imageColor = WorldWind.Color.WHITE;
      placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
        WorldWind.OFFSET_FRACTION, 0.5,
        WorldWind.OFFSET_FRACTION, 0.3);
      placemarkAttributes.labelAttributes.color = WorldWind.Color.WHITE;
      placemarkAttributes.drawLeaderLine = true;
      placemarkAttributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;


      for (var i = 0, len = img.length; i < 1; i++) {
        // Create the placemark and its label.
        placemark = new WorldWind.Placemark(new WorldWind.Position(latitude , longitude, 1e1 ), true, null);
        placemark.label = ":D";

        placemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
        placemarkAttributes.imageSource = imgLib + img[i];
        placemark.attributes = placemarkAttributes;
        plcmarkLayer.addRenderable(placemark);


      }
      wwind.addLayer(plcmarkLayer);

      var layerManger = new LayerManager(wwind);

      var modal = document.getElementById("modal");

          var lol_idk = [];

        var modalbox = function( a ) {
          console.log("clicked")
          var x = a.clientX,
            y = a.clientY;

          var Redrawcuzidk = lol_idk.length > 0;

          for (var u = 0; u < lol_idk.length; u++) {
            lol_idk[u].highlighted = false;
            modal.style.display = "none";
          }

          lol_idk = [];

          var idk = wwind.pick(wwind.canvasCoordinates(x, y));
          if (idk.objects.length > 0) {
            Redrawcuzidk = true;
          }

          if (idk.objects.length > 0) {
            for (var t = 0; t < idk.objects.length; t++) {
              idk.objects[t].userObject.highlighted = true;

              lol_idk.push(idk.objects[t].userObject);

              if (idk.objects[t].labelPicked) {
                console.log("Label picked");
              }

              if (idk.objects[t].position.latitude === 21.02) {
                modal.style.display = "block";
              }
            }

          }
          var button = document.getElementsByClassName("close")[0];
          button.onclick = function() {
            modal.style.display = "none";
          }
          window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
          }

        }

        wwind.addEventListener("click", modalbox);

    });

