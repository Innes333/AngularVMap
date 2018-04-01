(function(){
	angular
		.module('vMapsApp')
		.service('rolesConfig', function(){
            return {               
            baseUrl:  'http://localhost:3000/',
            loginUrl: 'login.json',
            itemsUrl:	'testJson.json',
            demoJSON: {
                topLayers: ['otb', 'sc144', 'otbb'],
                ofc_12: {
                    name: 'OFC-12',
                    className: 'ofc_12',
                    pane: 'overlayPane',
                    type: 'line',
                    url: 'demoJSON/OFC12_LOM_AR3',
                    color: '#00E5FF',
                    fillColor: '#00E5FF',
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
                ofc_144: {
                    name: 'OFC-144',
                    className: 'ofc_144',
                    pane: 'overlayPane',
                    type: 'line',
                    url: 'demoJSON/OFC144_LOM_AR3',
                    color: '#1A237E',
                    fillColor: '#1A237E',
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
                    url: 'demoJSON/OTB_LOM_AR3',
                    color: '#ccc',
                    fillColor: '#00E5FF',
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
                otbb: {
                    name: 'OTBB',
                    className: 'otbb',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'demoJSON/OTBB_LOM_AR3',
                    color: '#666',
                    fillColor: '#D500F9',
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
                sc144: {
                    name: 'SC-144',
                    className: 'sc144',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'demoJSON/SC_144_LOM_AR3',
                    color: '#666',
                    fillColor: '#1A237E',
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
                poles: {
                    name: 'Poles',
                    className: 'poles',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'demoJSON/Poles_LOM_AR3',
                    color: '#666',
                    fillColor: '#757575',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 1.0,
                    radius: 2,
                    popupColumns: [
                        'City_Region',
                        'Location_Type',
                        'Location_ID',
                        'District',
                        'Neighbourhood',
                        'Nature_du_support',
                        'Anarchie_accroche_cable',
                        'Longitude',
                        'Latitude'
	                ],
	                category: 'other'
                },      
                demand: {
                    name: 'Demand',
                    className: 'demand',
                    pane: 'overlayPane',
                    type: 'poly',
                    url: 'demoJSON/Demand_LOM_AR3',
                    color: '#757575',
                    fillColor: '#757575',
                    opacity: 1,
                    fillOpacity: 0.3,
                    weight: 1.0,
                    popupColumns: [
                        'OTB_City_Region',
                        'OTB_Name',
                        'BuildingID',
                        'Internal_Floors'
	                ],
	                category: 'other'
                },       
                ar: {
                    name: 'AR',
                    className: 'ar',
                    pane: 'overlayPane',
                    type: 'poly',
                    url: 'demoJSON/AR3_AREA_OTB',
                    color: '#33691E',
                    fillColor: '#33691E',
                    opacity: 1,
                    fillOpacity: 0.3,
                    weight: 1.0,
                    popupColumns: [
                        'OTB_Name',
                        'ID',
                        'ID_provisoire',
                        'Status'
	                ],
	                category: 'other'
                },     
                cross: {
                    name: 'Cross',
                    className: 'cross',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'demoJSON/CROSS_LOM_AR3',
                    color: '#666',
                    fillColor: '#D50000',
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
	                category: 'other'
                },                          
            },            
            demoLayers: {
                ar: 'ar',
                cross: 'cross',
                demand: 'demand',
				ofc_12: 'ofc_12',
				ofc_144: 'ofc_144',
				otb: 'otb',
				otbb: 'otbb',
				sc144: 'sc144',
				poles: 'poles'
            },	
            cityLocation: {
                Lome: {
                    lng: 1.240906,
					lat: 6.130398
                },
                Tabligbo: {
                    lng: 1.502488,
					lat: 6.595080, 
                },
                Kara: {
                    lng: 1.194402,
					lat: 9.552551 
                }
            }		
        }   

	})
}());