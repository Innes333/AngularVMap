(function(){
	angular
		.module('vMapsApp')
		.service('rolesConfig', function(){
            return {               
            baseUrl:  'http://176.37.101.48:3000/',
            loginUrl: 'login.json',
            itemsUrl:	'testJson.json',
            demoJSON: {
                topLayers: ['ghana_gsm_sites'],
                loadFirst: [
					'ghana_gsm_sites'                   
                ],       
				ghana_gsm_sites: {
                    name: 'GSM sites',
                    className: 'ghana_gsm_sites',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'http://176.37.101.48:3000/gva/gsm/ghana_gsm_sites',
                    fillColor: '#333',
                    color: {
                        done: '#1B5E20',
                        undone: '#D50000',
                        bad: '#C62828',
                        planned: '#FDD835'
                    },
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 6,
                    radius: 8,
                    popupColumns: [
                        'id', 'site_name', 'site_reference', 'city', 'access_contact',
                        'longitude', 'latitude', 'tower_height', 'tower_type', 
                        'site_type', 'site_cluster', 'powering', 'status', 'class', 'comments'
	                ],
                    category: null,
                    schema: 'gsm',
                    zone: null
                },
            },            
            demoLayers: {                
				ghana_gsm_sites: 'ghana_gsm_sites'
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