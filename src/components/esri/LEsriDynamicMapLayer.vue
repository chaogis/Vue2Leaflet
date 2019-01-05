<template>
  <div />
</template>

<script>
import L from 'leaflet';
import { dynamicMapLayer as EsriDynamicMapLayer } from 'esri-leaflet';
import propsBinder from '../../utils/propsBinder.js';
import findRealParent from '../../utils/findRealParent.js';
import { optionsMerger } from '../../utils/optionsUtils.js';
import ImageOverlay from '../../mixins/ImageOverlay.js';

export default {
  name: 'LEsriDynamicMapLayer',
  mixins: [ImageOverlay],
  props: {
    url: {
      type: String,
      default: null
    },
    layers: {
      type: Array,
      custom: true,
      default: null
    },
    layerDefs: {
      type: Object,
      custom: true,
      default: () => ({})
    },
    options: {
      type: Object,
      custom: true,
      default: () => ({})
    }
  },
  computed: {
    mergedOptions () {
      return optionsMerger({
        ...this.imageOverlayOptions,
        url: this.url,
        layers: this.layers,
        layerDefs: this.layerDefs
      }, this);
    }
  },
  mounted () {
    this.mapObject = EsriDynamicMapLayer(this.mergedOptions);
    L.DomEvent.on(this.mapObject, this.$listeners);
    propsBinder(this, this.mapObject, this.$options.props);
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  },
  methods: {
    getLayers () {
      return this.mapObject.getLayers();
    },
    setLayers (newVal) {
      this.mapObject.setLayers(newVal);
    },
    getLayerDefs () {
      return this.mapObject.getLayerDefs();
    },
    setLayerDefs (newVal) {
      this.mapObject.setLayerDefs(newVal);
    },
    identify () {
      return this.mapObject.identify();
    },
    find () {
      return this.mapObject.find();
    },
    query () {
      return this.mapObject.query();
    }
  }
};
</script>
