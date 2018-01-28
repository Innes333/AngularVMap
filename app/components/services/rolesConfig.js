(function(){
	angular
		.module('vMapsApp')
		.service('rolesConfig', function(){
            return {               
            baseUrl:  'http://localhost:3000/',
            loginUrl: 'login.json',
            itemsUrl:	'testJson.json',
            demoJSON: {
                topLayers: ['otb', 'sc144', 'sc48'],
                ofc_12: {
                    name: 'OFC-12',
                    className: 'ofc_12',
                    pane: 'overlayPane',
                    type: 'line',
                    url: 'demoJSON/OFC_12',
                    color: '#64FFDA',
                    fillColor: '#64FFDA',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 2.0,
                    popupColumns: [
                        'OSP_Cable_name',
                        'OSP_Cable_installation_date',
                        'OSP_Cable_Template',
                        'Comment',
                        'Marker_Start',
                        'Marker_Stop',
                        'Cable_Lenght',
                        'ID_Prov'
	                ],
                    category: 'ofc'
                },
                ofc_48: {
                    name: 'OFC-48',
                    className: 'ofc_48',
                    pane: 'overlayPane',
                    type: 'line',
                    img: 'ofc-48.png',
                    url: 'demoJSON/OFC_48',
                    color: '#795548',
                    fillColor: '#795548',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 2.5,
                    popupColumns: [
                        'OSP_Cable_name',
                        'OSP_Cable_installation_date',
                        'OSP_Cable_Template',
                        'Comment',
                        'Marker_Start',
                        'Marker_Stop',
                        'Cable_Lenght',
                        'ID_Prov'
	                ],
	                category: 'ofc'
                },
                ofc_144: {
                    name: 'OFC-144',
                    className: 'ofc_144',
                    pane: 'overlayPane',
                    type: 'line',
                    url: 'demoJSON/OFC_144',
                    color: '#304FFE',
                    fillColor: '#304FFE',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 3.5,
                    popupColumns: [
                        'OSP_Cable_name',
                        'OSP_Cable_installation_date',
                        'OSP_Cable_Template',
                        'сomment',
                        'Marker_Start',
                        'Marker_Stop',
                        'Cable_Lenght',
                        'ID_Prov'
	                ],
	                category: 'ofc'
                },
                otb: {
                    name: 'OTB',
                    className: 'otb',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'demoJSON/OTB',
                    color: '#000',
                    fillColor: '#975959',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 1.0,
                    radius: 4,
                    popupColumns: [
                        'City_Region',
                        'Location_Type',
                        'Location_ID',
                        'OTB_name',
                        'OTB_serial_number',
                        'OTB_installation_date',
                        'OTB_Template',
                        'Longitude',
                        'Latitude'
	                ],
	                category: 'otb'
                },
                sc48: {
                    name: 'SC-48',
                    className: 'sc48',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'demoJSON/SC_48',
                    color: '#000',
                    fillColor: '#33a02c',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 1.0,
                    radius: 3,
                    popupColumns: [
                        'City_Region',
                        'Location_Type',
                        'Location_ID',
                        'Splice_Closure_name',
                        'Splice_Closure_serial_number',
                        'Splice_Closure_Template',
                        'Longitude',
                        'Latitude'
	                ],
	                category: 'sc'
                },
                sc144: {
                    name: 'SC-144',
                    className: 'sc144',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'demoJSON/SC_144',
                    color: '#000',
                    fillColor: '#1e2cec',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 1.0,
                    radius: 4,
                    popupColumns: [
                        'City_Region',
                        'Location_Type',
                        'Location_ID',
                        'Splice_Closure_name',
                        'Splice_Closure_serial_number',
                        'Splice_Closure_Template',
                        'Longitude',
                        'Latitude'
	                ],
	                category: 'sc'
                },
                railways: {
                    name: 'Railways',
                    className: 'drop',
                    pane: 'overlayPane',
                    type: 'line',
                    url: 'demoJSON/Railways',
                    color: '#000000',
                    fillColor: '#000000',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 1.3,
                    popupColumns: [
                        'id',
                        'name',
                        'class'
	                ],
	                category: 'other'
                },
                roads: {
                    name: 'Roads',
                    pane: 'overlayPane',
                    type: 'line',
                    className: 'roads',
                    url: 'demoJSON/Roads',
                    fillColor: '#333333',
                    color: {
                        residential: '#e4893e',
                        pedestrian: '#b6a79e',
                        primary: '#fffb89',
                        path: '#333333',
                        secondary: '#e8e586',
                        tertiary: '#bfbcbc'
                    },
                    opacity: 1,
                    fillOpacity: 1,
                    weight: {
                        residential: 2,
                        pedestrian: 2,
                        primary: 5,
                        path: 1.5,
                        secondary: 2,
                        tertiary: 2
                    },		
                    popupColumns: [
                        'id',
                        'name',
                        'class'
	                ],
	                category: 'other'
                },
                hydro: {
                    name: 'Hydro',
                    className: 'hydro',
                    pane: 'overlayPane',
                    type: 'poly',
                    url: 'demoJSON/Hydro(region)',
                    color: 'blue',
                    fillColor: '#6aacf6',
                    opacity: 0.6,
                    fillOpacity: 0.8,
                    weight: 1.0,
                    popupColumns: [
                        'id',
                        'name',
                        'class'
	                ],
	                category: 'other'
                },
                buildings: {
                    name: 'Buildings',
                    className: 'buildings',
                    pane: 'overlayPane',
                    type: 'poly',
                    img: 'cross.png',
                    url: 'demoJSON/Buildings',
                    color: '#333333',
                    fillColor: {
                        residential: '#ccc',
                        church: '#9daab6',
                        school: '#7F8C8D',
                        mall: '#c4dbee'
                    },
                    opacity: 0.8,
                    fillOpacity: 1,
                    weight: 1.0,
                    popupColumns: [
                        'id',
                        'name',
                        'class'
	                ],
	                category: 'other'
                },
                nbn_metro_exist: {
                    name: 'NBN Metro exist',
                    className: 'nbn_metro_exist',
                    pane: 'overlayPane',
                    type: 'line',
                    url: 'demoJSON/NBN_Metro_exist',
                    color: '#4A148C',
                    fillColor: '#4A148C',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 2.5,
                    popupColumns: [
                        'name'
	                ],
	                category: 'other'
                },
                nbn_metro_moov: {
                    name: 'NBN Metro MOOV',
                    className: 'nbn-metro-moov',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'demoJSON/NBN_Metro_MOOV',
                    color: '#4A148C',
                    fillColor: '#4A148C',
                    opacity: 0.6,
                    fillOpacity: 0.8,
                    weight: 2.0,
                    popupColumns: [
		                'name'
	                ],
	                category: 'other'
                }
            },
            testGeoJSON: {
                sc48: {
                    name: 'SC-48',
                    className: 'sc48',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'GeoJSON/Z_1_SC_48',
                    color: '#000',
                    fillColor: '#33a02c',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 1.0,
                    radius: 3,
	                popupColumns: [
		                'name'
                    ]
                },
                sc144: {
                    name: 'SC-144',
                    className: 'sc144',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'GeoJSON/Z_1_SC_144',
                    color: '#000',
                    fillColor: '#1e2cec',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 1.0,
                    'radius': 4,
	                popupColumns: [
		                'name',
	                ]
                },
                newPole: {
                    name: 'New Pole',
                    className: 'newPole',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'GeoJSON/Z_1_NEW_POLE',
                    color: '#000',
                    zIndex: 510,
                    fillColor: '#f2eb15',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 1.0,
                    'radius': 3,
	                popupColumns: [
		                'name',
	                ]
                },
                poteaux: {
                    name: 'Poteaux',
                    className: 'poteaux',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'GeoJSON/Z_1_Poteaux',
                    color: '#000',
                    zIndex: 510,
                    fillColor: '#000',
                    opacity: 0.6,
                    fillOpacity: 1,
                    weight: 1.0,
                    'radius': 3,
	                popupColumns: [
		                'name',
	                ]
                },
                cross: {
                    name: 'Cross',
                    className: 'cross',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'GeoJSON/Z_1_CROSS',
                    color: '#000',
                    fillColor: 'red',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 1.0,
                    radius: 3,
	                popupColumns: [
		                'name',
	                ]
                },
                otb: {
                    name: 'OTB',
                    className: 'otb',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'GeoJSON/Z_1_OTB',
                    color: '#000',
                    fillColor: '#975959',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 1.0,
                    radius: 4,
	                popupColumns: [
		                'name',
	                ]
                },
                drop: {
                    name: 'Drop',
                    className: 'drop',
                    pane: 'overlayPane',
                    type: 'line',
                    url: 'GeoJSON/Z_1_DROP',
                    color: '#8b2b22',
                    fillColor: '#8b2b22',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 1.3,
	                popupColumns: [
		                'name',
	                ]
                },
                ofc_12: {
                    name: 'OFC-12',
                    className: 'ofc_12',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'GeoJSON/Z_1_OFC_12',
                    color: '#24dff0',
                    fillColor: '#23dff0',
                    opacity: 1,
                    fillOpacity: 0.2,
                    weight: 3,
	                popupColumns: [
		                'name',
	                ]
                },
                ofc_48: {
                    name: 'OFC-48',
                    className: 'ofc_48',
                    pane: 'overlayPane',
                    type: 'point',
                    img: 'ofc-48.png',
                    url: 'GeoJSON/Z_1_OFC_48',
                    color: '#88000f',
                    fillColor: '#88000f',
                    opacity: 0.6,
                    fillOpacity: 1,
                    weight: 1.5,
	                popupColumns: [
		                'name',
	                ]
                },
                ofc_144: {
                    name: 'OFC-144',
                    className: 'ofc_144',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'GeoJSON/Z_1_OFC_144',
                    color: '#002af6',
                    fillColor: '#002af6',
                    opacity: 0.6,
                    fillOpacity: 0.2,
                    weight: 1.0,
	                popupColumns: [
		                'name'
	                ]
                },
                ofc_fig_8: {
                    name: 'OFC-FIG-8',
                    className: 'ofc_fig_48',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'GeoJSON/Z_1_OFC_FIG_8',
                    color: '#ff001e',
                    fillColor: '#ff001e',
                    opacity: 0.6,
                    fillOpacity: 0.2,
                    weight: 2,
	                popupColumns: [
		                'name'
	                ]
                },
                buildings: {
                    name: 'Buildings',
                    className: 'buildings',
                    pane: 'overlayPane',
                    type: 'poly',
                    img: 'cross.png',
                    url: 'GeoJSON/Z_1_Buildings',
                    color: '#333333',
                    fillColor: '#8f8f8f',
                    opacity: 0.6,
                    fillOpacity: 0.8,
                    weight: 1.0,
                    zIndex: 300,
	                popupColumns: [
		                'name',
	                ]
                },
                mdu: {
                    name: 'MDU',
                    className: 'mdu',
                    pane: 'overlayPane',
                    type: 'poly',
                    img: 'mdu.png',
                    url: 'GeoJSON/Z_1_MDU',
                    color: '#ff0ff7',
                    fillColor: '#ff0ff7',
                    opacity: 0.8,
                    fillOpacity: 1,
                    weight: 1.0,
	                popupColumns: [
		                'name'
	                ]
                },
            },
            populationJSON: {
                topLayers: ['gsm'],
                departments: {                    
                    name: 'Departments',
                    className: 'departments',
                    pane: 'overlayPane',
                    type: 'poly',
                    url: 'populationJSON/Departments',
                    color: '#BF360C',
                    fillColor: '#BF360C',
                    opacity: 1,
                    fillOpacity: 0.1,
                    weight: 1,
                    show: true,
                    popupColumns: [
                        'country',
                        'province',
                        'departments',
                        'population',
                        'area_sq_km',
                    ]
                },              
                province: {
                    name: 'Province',                    
                    className: 'province',
                    pane: 'shadowPane',
                    type: 'poly',
                    url: 'populationJSON/Province',
                    color: '#3E2723',
                    fillColor: '#3E2723',
                    opacity: 1,
                    fillOpacity: 0.1,
                    weight: 2.5,
                    dashArray: '5,5',
                    show: true,
	                popupColumns: [
		                'country',
		                'province',
		                'population',
		                'area_sq_km',
	                ]
                },
                population: {
                    name: 'Population',
                    className: 'population',
                    pane: 'overlayPane',
                    type: 'poly',
                    url: 'populationJSON/Population',
                    color: '#333333',
                    fillColor: {
                        '0-150': '#1a9641', 
                        '150-500': '#77c35c', 
                        '500-1000': '#9cbf5a',
                        '1000-2500': '#e2e250',
                        '2500-4000': '#fec981', 
                        '4000-6500': '#f17c4a',
                        '6500-13000': '#b73d2b',
                        '13000-80000': '#830c0e'
                    },
                    opacity: 0.8,
                    fillOpacity: 1,
                    weight: 1.0,
                    show: true,
	                popupColumns: [
	                    'name',
		                'population',
		                'area_sq_m',
		                'class'
	                ]
                },
                gsm: {
                    name: 'GSM sites',  
                    className: 'gsm',  
                    pane: 'overlayPane',             
                    type: 'point',
                    url: 'populationJSON/GSMsites',
                    fillColor: {
                        True: '#E91E63',
                        False: '#2196F3'
                    },
                    color: {
                        True: '#E91E63',
                        False: '#2196F3'
                    },
                    opacity: 1,
                    fillOpacity: 1,
                    weight:  {
                        True: 3,
                        False: 2
                    },      
                    radius: {
                        True: 3,
                        False: 2
                    },      
                    show: true,
	                popupColumns: [
		                'name',
		                'longitude',
		                'latitude',
		                'altitude_m',
                        'comments',
                        'support_height_m',
                        'support_type',
                        'site_name',
                        'bsc',
                        'type',
                        'city',
                        'lte',
                        'g3',
                        'trmflag'
	                ]
                }
            },
            demoLayers: {
				ofc_12: 'ofc_12',
				ofc_48: 'ofc_48',
				ofc_144: 'ofc_144',
				otb: 'otb',
				sc48: 'sc48',
				sc144: 'sc144',
				roads: 'roads',
				railways: 'railways',
				// buildings: 'buildings',
				hydro: 'hydro',
				nbn_metro_exist: 'nbn_metro_exist',
			},
			presidenceLayers: {
				sc48: 'sc48',
				sc144: 'sc144',
				newPole: 'newPole',
				poteaux: 'poteaux',
				cross: 'cross',
				otb: 'otb',
				drop: 'drop',
				ofc_12: 'ofc_12',
				ofc_48: 'ofc_48',
				ofc_144: 'ofc_144',
				ofc_fig_8: 'ofc_fig_8',
				buildings: 'buildings',
				mdu: 'mdu'
			},
			btiLayers: {
				sc48: 'sc48',
				sc144: 'sc144',
				cross: 'cross',
				ofc_144: 'ofc_144',
				ofc_48: 'ofc_48',
				ofc_fig_8: 'ofc_fig_8',
				buildings: 'buildings'
			},
			btsLayers: {
				poteaux: 'poteaux',
				newPole: 'newPole',
				otb: 'otb',
				ofc_12: 'ofc_12',
				ofc_48: 'ofc_48',
				ofc_144: 'ofc_144',
				drop: 'drop',
				buildings: 'buildings',
				mdu: 'mdu'
            },
            populationLayers: {
                departments: 'departments',
                population: 'population',
                province: 'province',
	            gsm: 'gsm'
            }   
        }   

	})
}());