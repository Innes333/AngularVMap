(function(){
	angular
		.module('vMapsApp')
		.service('rolesConfig', function(){
            return {               
            baseUrl:  'http://176.37.101.48:3000/',
            loginUrl: 'login.json',
            itemsUrl:	'testJson.json',
            streetJSON: {
                topLayers: ['street_view'],
                loadFirst: [
					'street_view'                   
                ],       
				street_view: {
                    name: 'Street view',
                    className: 'street_view',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'http://176.37.101.48:3000/gva/street/street_view',
                    fillColor: '#B71C1C',
                    color: '#B71C1C',
                    title: 'test',
                    alt: 'blah',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 4,
                    radius: 4,
                    popupColumns: [
                        'id', 'longitude', 'latitude', 'comments'
	                ],
                    category: null,
                    schema: 'gsm',
                    zone: null
                },
            },            
            streetLayers: {                
				street_view: 'street_view'
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