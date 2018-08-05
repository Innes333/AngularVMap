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
                    url: 'http://137.74.82.193:3000/gva/gsm/gsm_sites_ghana',
                    fillColor: '#333',
                    color: {
                        done: '#1B5E20',
                        undone: '#D50000',
                        bad: '#FFFF00'
                    },
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 6,
                    radius: 8,
                    popupColumns: [
                        'id', 'name',
                        'longitude', 'latitude', 
                        'altitude_m', 'comments', 'support_height_m',
                        'site_name', 'bsc', 'type', 'city', 'lte', 'g3',
                        'trmflag', 'class'
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
                Akatsi: {
                    lng: 0.7934081,
					lat: 6.1288312
                },
                Abor: {
                    lng: 0.8569122,
					lat: 6.0604373
                },
                Kara: {
                    lng: 1.194402,
					lat: 9.552551 
                }
            }		
        }   

	})
}());