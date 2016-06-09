import {BaseTileLayer} from 'react-leaflet';
import { PropTypes } from 'react';
import { tileLayer } from 'leaflet';
import { featureLayer } from 'esri-leaflet'
var esri = require('esri-leaflet')

export default class ESRIFeatureLayer extends BaseTileLayer {
  componentWillMount() {
    super.componentWillMount();
    const { url,layerStyle,zoom } = this.props;

    //make sure style json is set to null
    //styles defined by leaflet path
    //http://leafletjs.com/reference.html#path-options
    var jsonSyle ={}
    if(layerStyle){
      jsonSyle= JSON.parse(layerStyle);
    }

    //add layer to map with style
    this.leafletElement = esri.featureLayer({url:url,
    style: function(){
        return jsonSyle
      }
    })
  }
}