<template>
  <div />
</template>

<script>
import L from 'leaflet';
import propsBinder from '../utils/propsBinder.js';
import findRealParent from '../utils/findRealParent.js';
import { optionsMerger } from '../utils/optionsUtils.js';
import TileLayer from '../mixins/TileLayer.js';
import Options from '../mixins/Options.js';
import { getWebTileOptions } from '../utils/webTileUtil.js';

export default {
  name: 'LWebTileLayer',
  mixins: [TileLayer, Options],
  props: {
    type: {
      type: String,
      default: 'google.vec.map'
    },
    tileLayerClass: {
      type: Function,
      default: L.tileLayer
    }
  },
  computed: {
    mergedOptions () {
      return optionsMerger({
        ...this.tileLayerOptions,
        subdomains: this.layerOptions.subdomains,
        tms: this.layerOptions.tms ? this.layerOptions.tms : false
      }, this);
    }
  },
  mounted () {
    this.layerOptions = getWebTileOptions(this.type, this.option);
    this.mapObject = this.tileLayerClass(this.layerOptions.url, this.mergedOptions);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  }
};
</script>
