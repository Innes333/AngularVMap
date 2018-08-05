(function(){
	angular
		.module('vMapsApp')
		.service('rolesConfig', function(){
            return {               
            baseUrl:  'http://localhost:3000/layers/',
            loginUrl: 'login.json',
            itemsUrl:	'testJson.json',
            demoJSON: {
                topLayers: ['gsm_sites_ghana'],
                loadFirst: [
					'gsm_sites_ghana'                   
                ],       
				gsm_sites_ghana: {
                    name: 'GSM sites',
                    className: 'gsm_sites_ghana',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'http://137.74.82.193:3000/ghana_gsm/gsm/gsm_sites_ghana',
                    color: '#ccc',
                    fillColor: '#00E5FF',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 1.0,
                    radius: 4,
                    popupColumns: [
                        'id', 'name',
                        'longitude', 'latitude', 
                        'altitude_m', 'comments', 'support_height_m',
                        'site_name', 'bsc', 'type', 'city', 'lte', 'g3',
                        'trmflag', 'search_id', 'class'
	                ],
                    category: null,
                    schema: 'gsm',
                    zone: null
                },
            },            
            demoLayers: {                
				gsm_sites_ghana: 'gsm_sites_ghana'
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