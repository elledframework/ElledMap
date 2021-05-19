var wms_layers = [];

var format_OtherCountries_0 = new ol.format.GeoJSON();
var features_OtherCountries_0 = format_OtherCountries_0.readFeatures(json_OtherCountries_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_OtherCountries_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_OtherCountries_0.addFeatures(features_OtherCountries_0);
var lyr_OtherCountries_0 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_OtherCountries_0, 
                style: style_OtherCountries_0,
                interactive: false,
                title: '<img src="styles/legend/OtherCountries_0.png" /> OtherCountries'
            });
var format_LocalContentCountries_1 = new ol.format.GeoJSON();
var features_LocalContentCountries_1 = format_LocalContentCountries_1.readFeatures(json_LocalContentCountries_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_LocalContentCountries_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_LocalContentCountries_1.addFeatures(features_LocalContentCountries_1);
var lyr_LocalContentCountries_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_LocalContentCountries_1, 
                style: style_LocalContentCountries_1,
                interactive: true,
                title: '<img src="styles/legend/LocalContentCountries_1.png" /> LocalContentCountries'
            });
var format_ne_10m_lakes_2 = new ol.format.GeoJSON();
var features_ne_10m_lakes_2 = format_ne_10m_lakes_2.readFeatures(json_ne_10m_lakes_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ne_10m_lakes_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ne_10m_lakes_2.addFeatures(features_ne_10m_lakes_2);
var lyr_ne_10m_lakes_2 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_ne_10m_lakes_2, 
                style: style_ne_10m_lakes_2,
                interactive: false,
                title: '<img src="styles/legend/ne_10m_lakes_2.png" /> ne_10m_lakes'
            });

lyr_OtherCountries_0.setVisible(true);lyr_LocalContentCountries_1.setVisible(true);lyr_ne_10m_lakes_2.setVisible(true);
var layersList = [lyr_OtherCountries_0,lyr_LocalContentCountries_1,lyr_ne_10m_lakes_2];
lyr_OtherCountries_0.set('fieldAliases', {'COUNTRY': 'COUNTRY', });
lyr_LocalContentCountries_1.set('fieldAliases', {'COUNTRY': 'Country', 'POP':'Population','MinRent':'Mineral Rents (% of GDP)', 'Legislation':'Legislation', 'Leg1':'','Leg2':'','Adtl':'Additional Resources','Adtl1':'' });
lyr_ne_10m_lakes_2.set('fieldAliases', {});

lyr_LocalContentCountries_1.set('fieldImages', {'COUNTRY': 'TextEdit', 'POPULATION': 'Population', 'MinRent':'TextEdit','Legislation':'TextEdit', 'Leg1':'TextEdit','Leg2':'TextEdit','Adtl':'TextEdit','Adtl1':'TextEdit' });
lyr_ne_10m_lakes_2.set('fieldImages', {});
lyr_OtherCountries_0.set('fieldLabels', {'COUNTRY': 'no label' });
lyr_LocalContentCountries_1.set('fieldLabels', {'COUNTRY': 'inline label', 'POP': 'inline label', 'MinRent':'inline label', 'Legislation':'inline label', 'Leg1':'headline','Leg2':'headline','Adtl':'inline label','Adtl1':'' });
lyr_ne_10m_lakes_2.set('fieldLabels', {});
lyr_ne_10m_lakes_2.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});