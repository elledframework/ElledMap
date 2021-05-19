

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var sketch=false;

closer.onclick = function() {
    container.style.display = 'none';
    closer.blur();
    return false;
};
var overlayPopup = new ol.Overlay({
    element: container
});

var expandedAttribution = new ol.control.Attribution({
    collapsible: false
});

var map = new ol.Map({
    controls: ol.control.defaults({attribution:false}).extend([
        expandedAttribution
    ]),
    target: document.getElementById('map'),
    renderer: 'canvas',
    overlays: [overlayPopup],
    layers: layersList,
    view: new ol.View({
         maxZoom: 28, minZoom: 1
    })
});


    var searchLayer = new SearchLayer({
      layer: lyr_LocalContentCountries_1,
      colName: 'COUNTRY',
      zoom: 10,
      collapsed: true,
      map: map
    });

    map.addControl(searchLayer);
    document.getElementsByClassName('search-layer')[0]
    .getElementsByTagName('button')[0].className +=
    ' fa fa-binoculars';
    
map.getView().fit([-12243676.037446, -7605246.901531, 8795707.722482, 11994244.232723], map.getSize());

var NO_POPUP = 0
var ALL_FIELDS = 1

/**
 * Returns either NO_POPUP, ALL_FIELDS or the name of a single field to use for
 * a given layer
 * @param layerList {Array} List of ol.Layer instances
 * @param layer {ol.Layer} Layer to find field info about
 */
function getPopupFields(layerList, layer) {
    // Determine the index that the layer will have in the popupLayers Array,
    // if the layersList contains more items than popupLayers then we need to
    // adjust the index to take into account the base maps group
    var idx = layersList.indexOf(layer) - (layersList.length - popupLayers.length);
    return popupLayers[idx];
}


var collection = new ol.Collection();
var featureOverlay = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: collection,
        useSpatialIndex: false // optional, might improve performance
    }),
    style: [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#f00',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.1)'
        }),
    })],
    updateWhileAnimating: true, // optional, for instant visual feedback
    updateWhileInteracting: true // optional, for instant visual feedback
});

var doHighlight = true;
var doHover = false;

var highlight;
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});
var onPointerMove = function(evt) {
    if (!doHover && !doHighlight) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var popupField;
    var currentFeature;
    var currentLayer;
    var currentFeatureKeys;
    var clusteredFeatures;
    var popupText = '<ul>';
	var paysage;//added
	var paysagelink//added
	var popupfile='';//added
	var base;
	var shouldhighlight=false;
	var highlightlayer;
	
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        // We only care about features from layers in the layersList, ignore
        // any other layers which the map might contain such as the vector
        // layer used by the measure tool
        if (layersList.indexOf(layer) === -1) {
            return;
        }
        
		highlightlayer=layersList.indexOf(layer);//If this is 1 it is the interactive layer we want to highlight - ML
		
        var doPopup = false;
		
		
        for (k in layer.get('fieldImages')) {
            if (layer.get('fieldImages')[k] != "Hidden") {
                doPopup = true;
				
            }
        }
        
		
		
		
        currentFeature = feature;
        currentLayer = layer;
        clusteredFeatures = feature.get("features"); // retrieves features at given pixel
        var clusterFeature;
        if (typeof clusteredFeatures !== "undefined") {
			
           
		   
		    if (doPopup) {
				
				var countrydata=feature.get("features"); // features at given pixel
				var countrydatatypes = countrydata[0]; // retrieves either type or properties
				var proporties=countrydatatypes.getKeys(); // establishes country info keys: COUNTRY, POP etc.. (not geometry)*/
				paysage = countrydatatypes.get(proporties[0]);
				
                for(var n=0; n<clusteredFeatures.length; n++) {
                    clusterFeature = clusteredFeatures[n]; // returns keys: properties, geometry
                    currentFeatureKeys = clusterFeature.getKeys(); // returns keys: country, population, country, min rents, geometry
                    popupText += '<li><table>'
                    for (var i=0; i<currentFeatureKeys.length; i++) {
                        if (currentFeatureKeys[i] != 'geometry') { // loops through country, population, min rents, geometry
                            popupField = '';
                            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label") {
                            popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</th><td>';
                            } else {
                                popupField += '<td colspan="2">';
                            }
                            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label") {
                                popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</strong><br />';
                            }
                            if (layer.get('fieldImages')[currentFeatureKeys[i]] != "ExternalResource") {
                                popupField += (clusterFeature.get(currentFeatureKeys[i]) != null ? autolinker.link(clusterFeature.get(currentFeatureKeys[i]).toLocaleString()) + '</td>' : '');

							} else {
                                popupField += (clusterFeature.get(currentFeatureKeys[i]) != null ? '<img src="images/' + clusterFeature.get(currentFeatureKeys[i]).replace(/[\\\/:]/g, '_').trim()  + '" /></td>' : '');
                            }
                            popupText += '<tr>' + popupField + '</tr>';
                        }
                    } 
                    popupText += '</table></li>';    
		
                }
            }
        } else {
            currentFeatureKeys = currentFeature.getKeys();
            if (doPopup) {
                popupText += '<li><table>';
                for (var i=0; i<currentFeatureKeys.length; i++) {
                    if (currentFeatureKeys[i] != 'geometry') {
                        popupField = '';
                        if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label") {
                            popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</th><td>';
                        } else {
                            popupField += '<td colspan="2">';
                        }
                        if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label") {
                            popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</strong><br />';
                        }
                        if (layer.get('fieldImages')[currentFeatureKeys[i]] != "ExternalResource") {
                            popupField += (currentFeature.get(currentFeatureKeys[i]) != null ? autolinker.link(currentFeature.get(currentFeatureKeys[i]).toLocaleString()) + '</td>' : '');
							paysage = JSON.stringify(currentFeature.get(currentFeatureKeys[1]));// Grabs country name
							paysage=JSON.parse(paysage);
							popupfile= 'CountryData/'+paysage+'/'+paysage+'_Popup.htm';
							pagefile = 'CountryData/'+paysage+'/'+paysage+'_Page.html';
							
							/*document.open(popupfile);
							base = document.createElement('base');
							base.setAttribute("target","_parent");
							document.head.appendChild(base);
							document.close(popupfile);*/
							
							
							paysage = paysage
							//paysagelink = paysage.link(pagefile);
							
                        } else {
                            popupField += (currentFeature.get(currentFeatureKeys[i]) != null ? '<img src="images/' + currentFeature.get(currentFeatureKeys[i]).replace(/[\\\/:]/g, '_').trim()  + '" /></td>' : '');
                        }
                        popupText += '<tr>' + popupField + '</tr>';
					
                    }
                }
                popupText += '</table></li>';
				
				
            }
		
		
			
			
        }
      
		
    });
	
  
	
	
    if (popupText == '<ul>') {
        popupText = '';
    } else {
        popupText += '</ul>';
    }

	
    
//The highlight feature has been modified from the default QGIS2WEB structure to only highlight when the added "highlightlayer" variable is indexed to the layers for which popup windows with additional info is available
	if (doHighlight) {
		
        if (currentFeature !== highlight) {
			
            if (highlightlayer==0 || !currentFeature) {
                featureOverlay.getSource().removeFeature(highlight);
            }
			
	            if (currentFeature) {
					
	                var styleDefinition = currentLayer.getStyle().toString();

	                if (currentFeature.getGeometry().getType() == 'Point') {
						
		                    var radius = styleDefinition.split('radius')[1].split(' ')[1];

		                    highlightStyle = new ol.style.Style({
		                        image: new ol.style.Circle({
		                            fill: new ol.style.Fill({
		                                color: "#ffff00"
		                            }),
		                            radius: radius
		                        })
		                    })
						
	                } else if (currentFeature.getGeometry().getType() == 'LineString') {
						
		                    var featureWidth = styleDefinition.split('width')[1].split(' ')[1].replace('})','');

		                    highlightStyle = new ol.style.Style({
		                        stroke: new ol.style.Stroke({
		                            color: '#ffff00',
		                            lineDash: null,
		                            width: featureWidth
		                        })
							
	                    });
					

	                } else {
						
		                    highlightStyle = new ol.style.Style({
		                        fill: new ol.style.Fill({
		                            color: '#ffff00'
		                        })
		                    })
						
	                }
					
		            
					if (highlightlayer==1){
					 	featureOverlay.getSource().addFeature(currentFeature);
			            featureOverlay.setStyle(highlightStyle);
						
					}
					
	            }
				
	         highlight = currentFeature;  	
	    }
	}
    
	
	
	

//'<iframe style="width:100%;height:110px;border:0px;"src="' + popupfile+'"></iframe>';
    if (doHover) {
        if (popupText) {
            overlayPopup.setPosition(coord);
			map.getView().setCenter(pixel);
            content.innerHTML = '<b>'+paysage+'</b>' + '<iframe style="width:100%;height:200px;border:0px;"src="' + popupfile+'"></iframe>';
            container.style.display = 'block';        
        } else {
            container.style.display = 'none';
            closer.blur();
        }
    }
};

var onSingleClick = function(evt) {
    if (doHover) {
        return;
    }
    if (sketch) {
        return;
    }
	var temp;
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var popupField;
    var currentFeature;
    var currentLayer;
    var currentFeatureKeys;
    var clusteredFeatures;
    var popupText = '<ul>';
	var paysage;//added
	var paysagelink//added
	var popupfile;//added
	var base;
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        // We only care about features from layers in the layersList, ignore
        // any other layers which the map might contain such as the vector
        // layer used by the measure tool
        if (layersList.indexOf(layer) === -1) {
            return;
        }
        var doPopup = false;
        for (k in layer.get('fieldImages')) {
            if (layer.get('fieldImages')[k] != "Hidden") {
                doPopup = true;
            }
        }
		//paysage = layer.get('fieldImages')[0]
		
		
		
        currentFeature = feature;
        currentLayer = layer;
		
		
		
        clusteredFeatures = feature.get("features"); // retrieves features at given pixel
        var clusterFeature;
        if (typeof clusteredFeatures !== "undefined") {
			
           
		   
		    if (doPopup) {
				
				/*var countrydata=feature.get("features"); // features at given pixel
				var countrydatatypes = countrydata[0]; // retrieves either type or properties
				var proporties=countrydatatypes.getKeys(); // establishes country info keys: COUNTRY, POP etc.. (not geometry)*/
				paysage = countrydatatypes.get(proporties[0]);
				
                for(var n=0; n<clusteredFeatures.length; n++) {
                    clusterFeature = clusteredFeatures[n]; // returns keys: properties, geometry
                    currentFeatureKeys = clusterFeature.getKeys(); // returns keys: country, population, country, min rents, geometry
                    popupText += '<li><table>'
                    for (var i=0; i<currentFeatureKeys.length; i++) {
                        if (currentFeatureKeys[i] != 'geometry') { // loops through country, population, min rents, geometry
                            popupField = '';
                            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label") {
                            popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</th><td>';
                            } else {
                                popupField += '<td colspan="2">';
                            }
                            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label") {
                                popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</strong><br />';
                            }
                            if (layer.get('fieldImages')[currentFeatureKeys[i]] != "ExternalResource") {
                                popupField += (clusterFeature.get(currentFeatureKeys[i]) != null ? autolinker.link(clusterFeature.get(currentFeatureKeys[i]).toLocaleString()) + '</td>' : '');

							} else {
                                popupField += (clusterFeature.get(currentFeatureKeys[i]) != null ? '<img src="images/' + clusterFeature.get(currentFeatureKeys[i]).replace(/[\\\/:]/g, '_').trim()  + '" /></td>' : '');
                            }
                            popupText += '<tr>' + popupField + '</tr>';
                        }
                    } 
                    popupText += '</table></li>';    
		
                }
            }
        } else {
            currentFeatureKeys = currentFeature.getKeys();
            if (doPopup) {
                popupText += '<li><table>';
                for (var i=0; i<currentFeatureKeys.length; i++) {
                    if (currentFeatureKeys[i] != 'geometry') {
                        popupField = '';
                        if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label") {
                            popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</th><td>';
                        } else {
                            popupField += '<td colspan="2">';
                        }
                        if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label") {
                            popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + ':</strong><br />';
                        }
                        if (layer.get('fieldImages')[currentFeatureKeys[i]] != "ExternalResource") {
                            popupField += (currentFeature.get(currentFeatureKeys[i]) != null ? autolinker.link(currentFeature.get(currentFeatureKeys[i]).toLocaleString()) + '</td>' : '');
							paysage = JSON.stringify(currentFeature.get(currentFeatureKeys[1]));// Grabs country name
							paysage=JSON.parse(paysage);
							popupfile= 'CountryData/'+paysage+'/'+paysage+'_Popup.htm';
							pagefile = 'CountryData/'+paysage+'/'+paysage+'Page.html';
							
							/*document.open(popupfile);
							base = document.createElement('base');
							base.setAttribute("target","_parent");
							document.head.appendChild(base);
							document.close(popupfile);*/
							
							var temp="View Full Page";
							
							
							paysagelink = temp.link(pagefile);
							
						
							
                        } else {
                            popupField += (currentFeature.get(currentFeatureKeys[i]) != null ? '<img src="images/' + currentFeature.get(currentFeatureKeys[i]).replace(/[\\\/:]/g, '_').trim()  + '" /></td>' : '');
                        }
                        popupText += '<tr>' + popupField + '</tr>';
					
                    }
                }
                popupText += '</table></li>';
				
				
            }
		
		
			
			
        }
		
    });
   
    if (popupText == '<ul>') {
        popupText = '';
    } else {
        popupText += '</ul>';
    }
	
	
    if (popupText) {
        overlayPopup.setPosition(coord);
		map.getView().setCenter(coord);
		map.getView().setZoom(5);
        content.innerHTML = '<p align="left">'+paysagelink+ '</p><b>'+paysage+'</b> <iframe style="width:100%;min-height:280px;max-height:400px;border:0px;"src="' + popupfile+'"></iframe>';
        container.style.display = 'block';        
    } else {
        container.style.display = 'none';
        closer.blur();
    }
};



map.on('pointermove', function(evt) {
    onPointerMove(evt);
});
map.on('singleclick', function(evt) {
    onSingleClick(evt);
});




var attributionComplete = false;
map.on("rendercomplete", function(evt) {
    if (!attributionComplete) {
        var attribution = document.getElementsByClassName('ol-attribution')[0];
        var attributionList = attribution.getElementsByTagName('ul')[0];
        var firstLayerAttribution = attributionList.getElementsByTagName('li')[0];
        var qgis2webAttribution = document.createElement('li');
        qgis2webAttribution.innerHTML = '<a href="https://github.com/tomchadwin/qgis2web">qgis2web</a> &middot; ';
        var olAttribution = document.createElement('li');
        olAttribution.innerHTML = '<a href="https://openlayers.org/">OpenLayers</a> &middot; ';
        var qgisAttribution = document.createElement('li');
        qgisAttribution.innerHTML = '<a href="https://qgis.org/">QGIS</a>';
        attributionList.insertBefore(qgis2webAttribution, firstLayerAttribution);
        attributionList.insertBefore(olAttribution, firstLayerAttribution);
        attributionList.insertBefore(qgisAttribution, firstLayerAttribution);
        attributionComplete = true;
    }
})
