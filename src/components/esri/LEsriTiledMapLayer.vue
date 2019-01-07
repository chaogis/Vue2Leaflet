<template>
  <div />
</template>

<script>
import L from 'leaflet';
import { tiledMapLayer as EsriTiledMapLayer } from 'esri-leaflet';
import propsBinder from '../../utils/propsBinder.js';
import findRealParent from '../../utils/findRealParent.js';
import { optionsMerger } from '../../utils/optionsUtils.js';
import TileLayer from '../../mixins/TileLayer.js';
import Options from '../../mixins/Options.js';

export default {
  name: 'LEsriTiledMapLayer',
  mixins: [TileLayer, Options],
  props: {
    url: {
      type: String,
      default: null
    },
    zoomOffsetAllowance: {
      type: Number,
      default: 0.1
    }
  },
  computed: {
    mergedOptions () {
      return optionsMerger({
        ...this.tileLayerOptions,
        url: this.url,
        zoomOffsetAllowance: this.zoomOffsetAllowance
      }, this);
    }
  },
  mounted () {
    this.mapObject = EsriTiledMapLayer(this.mergedOptions);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  }
};
</script>
