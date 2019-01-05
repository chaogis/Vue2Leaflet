<template>
  <div>
    <div style="height: 20%; overflow: auto;">
      <h3>Esri Dynamic Map Layer</h3>
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
      <l-esri-dynamic-map-layer
        ref="dynamicMapLayer"
        :url="url"
        :layers="layers"
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
import { LMap, LEsriDynamicMapLayer, LMarker, LPopup } from 'vue2-leaflet';

export default {
  name: 'Example',
  components: {
    LMap,
    LEsriDynamicMapLayer,
    LMarker,
    LPopup
  },
  data () {
    return {
      zoom: 7,
      center: L.latLng(30, 120),
      url: 'http://120.27.217.2:6080/arcgis/rest/services/basemap/light/MapServer',
      layers: [0, 1],
      attribution: '&copy; <a href="http://cache1.arcgisonline.cn/arcgis/rest/services">ChinaOnlineStreetPurplishBlue</a> contributors',
      marker: L.latLng(30, 120),
      currentZoom: 13,
      currentCenter: L.latLng(30, 120),
      showParagraph: false
    };
  },
  mounted () {
    // 获取地图对象
    this.$nextTick(() => {
      this.dynamicMapLayer = this.$refs.dynamicMapLayer.mapObject; // work as expected
    });
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
      // alert('Popup Click!');
      this.dynamicMapLayer.query()
        .layer(0)
        .where("Name like '河南%'")
        .run(function (error, featureCollection, response) {
          console.log(featureCollection);
        });
    }
  }
};
</script>
