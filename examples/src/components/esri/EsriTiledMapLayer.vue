<template>
  <div>
    <div style="height: 20%; overflow: auto;">
      <h3>Esri Tiled Map Layer</h3>
      <p>Marker is placed at {{ marker.lat }}, {{ marker.lng }}</p>
      <p> Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }} </p>
      <button @click="showLongText">Toggle Long popup</button>
    </div>
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 80%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-esri-tiled-map-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker :lat-lng="marker">
        <l-popup>
          <div @click="popupClick">
            I am a tooltip
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi. Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LEsriTiledMapLayer, LMarker, LPopup } from 'vue2-leaflet';

export default {
  name: 'Example',
  components: {
    LMap,
    LEsriTiledMapLayer,
    LMarker,
    LPopup
  },
  data () {
    return {
      zoom: 7,
      center: L.latLng(30, 120),
      url: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
      attribution: '&copy; <a href="http://cache1.arcgisonline.cn/arcgis/rest/services">ChinaOnlineStreetPurplishBlue</a> contributors',
      marker: L.latLng(47.413220, -1.219482),
      currentZoom: 13,
      currentCenter: L.latLng(47.413220, -1.219482),
      showParagraph: false
    };
  },
  methods: {
    zoomUpdate (zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate (center) {
      this.currentCenter = center;
    },
    showLongText () {
      this.showParagraph = !this.showParagraph;
    },
    popupClick () {
      alert('Popup Click!');
    }
  }
};
</script>
