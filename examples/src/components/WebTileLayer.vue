<template>
  <div>
    <div style="height: 20%; overflow: auto;">
      <h3>Simple map</h3>
      <p>Marker is placed at {{ marker.lat }}, {{ marker.lng }}</p>
      <p> Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }} </p>
      <button @click="showLongText">Toggle Long popup</button>
    </div>
    <l-map
      :zoom="zoom"
      :center="center"
      :baidu-crs="baiduCrs"
      style="height: 80%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-control-layers />
      <l-web-tile-layer
        v-for="layer in layers"
        :key="layer.name"
        :type="layer.id"
        :visible="layer.visible"
        :name="layer.name"
        layer-type="base"
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
import { LMap, LWebTileLayer, LMarker, LPopup, LControlLayers } from 'vue2-leaflet';

export default {
  name: 'Example',
  components: {
    LMap,
    LWebTileLayer,
    LMarker,
    LPopup,
    LControlLayers
  },
  data () {
    return {
      zoom: 13,
      center: L.latLng(30, 120),
      baiduCrs: false,
      // type: 'google.vec.map',
      // attribution: '&copy; <a href="http://osm.org/copyright">Google Map</a> contributors',
      marker: L.latLng(30, 120),
      currentZoom: 13,
      currentCenter: L.latLng(30, 120),
      showParagraph: false,
      layers: [
        {
          id: 'baidu.custom.map',
          name: '百度地图',
          visible: true,
          type: 'tilelayer'
        },
        {
          id: 'amap.vec.map',
          name: '高德街道图',
          visible: false,
          type: 'tilelayer'
        },
        {
          id: 'tianditu.vec.map',
          name: '天地图街道图',
          visible: false,
          type: 'tilelayer'
        },
        {
          id: 'geoq.normal.purplishblue',
          name: '智图深蓝图',
          visible: false,
          type: 'tilelayer'
        }
      ]
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
