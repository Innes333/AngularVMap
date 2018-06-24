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
                fig_8: {
                    name: 'CABLE',
                    className: 'fig_8',
                    pane: 'tilePane',
                    type: 'line',
                    url: 'http://137.74.82.193:3000/fig_8',
                    color: '#FFD600',
                    fillColor: '#FFD600',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 1.0,
                    popupColumns: [
                        'id', 
                        'osp_cable_name', 
                        'osp_cable_installation_date', 
                        'osp_cable_template',
                        'comment',
                        'marker_start',
                        'marker_stop', 
                        'cable_lenght', 
                        'id_prov', 
                        'planed_installation_week'
	                ],
                    category: 'ofc'
                },    
                ofc_12: {
                    name: 'OFC-12',
                    className: 'ofc_12',
                    pane: 'tilePane',
                    type: 'line',
                    url: 'http://137.74.82.193:3000/ofc_12',
                    color: '#00B0FF',
                    fillColor: '#00B0FF',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 2.0,
                    popupColumns: [
                        'id', 
                        'osp_cable_name', 
                        'osp_cable_installation_date', 
                        'osp_cable_template',
                        'comment',
                        'marker_start',
                        'marker_stop', 
                        'cable_lenght', 
                        'id_prov', 
                        'planed_installation_week'
	                ],
                    category: 'ofc'
                },     
                ofc_48: {
                    name: 'OFC-48',
                    className: 'ofc_48',
                    pane: 'tilePane',
                    type: 'line',
                    url: 'http://137.74.82.193:3000/ofc_48',
                    color: '#BF360C ',
                    fillColor: '#BF360C ',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 2.5,
                    popupColumns: [
                        'id', 
                        'osp_cable_name', 
                        'osp_cable_installation_date', 
                        'osp_cable_template',
                        'comment',
                        'marker_start',
                        'marker_stop', 
                        'cable_lenght', 
                        'id_prov', 
                        'planed_installation_week'
	                ],
                    category: 'ofc'
                },     
                ofc_144: {
                    name: 'OFC-144',
                    className: 'ofc_144',
                    pane: 'tilePane',
                    type: 'line',
                    url: 'http://137.74.82.193:3000/ofc_144',
                    color: '#1A237E',
                    fillColor: '#1A237E',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 3.0,
                    popupColumns: [
                        'id', 
                        'osp_cable_name', 
                        'osp_cable_installation_date', 
                        'osp_cable_template',
                        'marker_start',
                        'marker_stop', 
                        'cable_lenght', 
                        'id_prov', 
                        'Planned_Installation_Week'
	                ],
	                category: 'ofc'
                },
                otb: {
                    name: 'OTB',
                    className: 'otb',
                    pane: 'tilePane',
                    type: 'point',
                    url: 'http://137.74.82.193:3000/otb',
                    color: '#ccc',
                    fillColor: '#00E5FF',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 1.0,
                    radius: 4,
                    popupColumns: [
                        'id', 
                        'city_region', 
                        'location_type',
                        'location_id',
                        'otb_name', 
                        'otb_serial_number', 
                        'otb_installation_date',
                        'otb_template', 
                        'splitter_1_serial_number', 
                        'splitter_2_serial_number', 
                        'latitude', 
                        'longitude', 
                        'trunk_attachement', 
                        'comment',
                        'id_prov'
	                ],
	                category: 'otb_lines'
                },
                otbb: {
                    name: 'OTBB',
                    className: 'otbb',
                    pane: 'tilePane',
                    type: 'point',
                    url: 'http://137.74.82.193:3000/otbb',
                    color: '#666',
                    fillColor: '#D500F9',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 1.0,
                    radius: 4,
                    popupColumns: [
                        'id', 
                        'city_region', 
                        'location_type',
                        'location_id',
                        'otb_name', 
                        'otb_serial_number', 
                        'otb_installation_date',
                        'otb_template', 
                        'splitter_1_serial_number', 
                        'splitter_2_serial_number', 
                        'latitude', 
                        'longitude', 
                        'trunk_attachement', 
                        'comment',
                        'id_prov'
	                ],
	                category: 'otb_lines'
                },               
                sc: {
                    name: 'SC',
                    className: 'sc',
                    pane: 'tilePane',
                    type: 'point',
                    url: 'http://137.74.82.193:3000/sc',
                    color: '#333333',
                    fillColor: '#067c4e',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 1.0,
                    radius: 3,
                    popupColumns: [
                        'id', 
                        'name'
	                ],
	                category: 'sc_points'
                },
                sc48: {
                    name: 'SC-48',
                    className: 'sc48',
                    pane: 'tilePane',
                    type: 'point',
                    url: 'http://137.74.82.193:3000/sc_48',
                    color: '#333333',
                    fillColor: '#C0392B',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 1.0,
                    radius: 3,
                    popupColumns: [
                        'id', 
                        'city_region', 
                        'location_type', 
                        'location_id', 
                        'splice_closure_name', 
                        'splice_closure_serial_number', 
                        'splice_closure_installation_dat', 
                        'splice_closure_template', 
                        'comment', 
                        'latitude', 
                        'longitude', 
                        'id_prov'
	                ],
	                category: 'sc_points'
                },
                sc144: {
                    name: 'SC-144',
                    className: 'sc144',
                    pane: 'tilePane',
                    type: 'point',
                    url: 'http://137.74.82.193:3000/sc_144',
                    color: '#333333',
                    fillColor: '#19459d',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 1.0,
                    radius: 3,
                    popupColumns: [
                        'id', 
                        'city_region', 
                        'location_type', 
                        'location_id', 
                        'splice_closure_name', 
                        'splice_closure_serial_number', 
                        'splice_closure_installation_dat', 
                        'splice_closure_template', 
                        'comment', 
                        'latitude', 
                        'longitude', 
                        'id_prov'
	                ],
	                category: 'sc_points'
                },
                poles: {
                    name: 'Poles',
                    className: 'poles',
                    pane: 'overlayPane',
                    type: 'point',
                    url: 'http://137.74.82.193:3000/poles',
                    color: '#666',
                    fillColor: '#757575',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 1.0,
                    radius: 3,
                    popupColumns: [
                        'id',
                        'city_region', 
                        'location_type', 
                        'location_id', 
                        'district', 
                        'neighbourhood', 
                        'longitude', 
                        'latitude', 
                        'comment', 
                        'nature_du_support', 
                        'anarchie_accroche_cable', 
                        'transfo', 
                        'geometrie_du_poteau', 
                        'transition_aero_souterraine', 
                        'commentaires_etats_du_poteaux', 
                        'poteau_inaccessible', 
                        'prise_de_terre', 
                        'id_poste', 
                        'etat_du_poteau', 
                        'type', 
                        'osp_isp', 
                        'commentaires', 
                        'hauteur_de_lelement_le_plus_ba', 
                        'hauteur_poteau_hors_sol', 
                        'type_reseau_electrique', 
                        'surved', 
                        'realise_par'
	                ],
	                category: 'other'
                },      
                demand: {
                    name: 'Demand',
                    className: 'demand',
                    pane: 'tilePane',
                    type: 'poly',
                    url: 'http://137.74.82.193:3000/demand',
                    color: '#757575',
                    fillColor: '#757575',
                    opacity: 1,
                    fillOpacity: 0.3,
                    weight: 1.0,
                    popupColumns: [
                        'id',
                        'otb_city_region',
                        'otb_name',
                        'internal_floors',
                        'comment',
                        'connected'
	                ],
	                category: 'other'
                },       
                area: {
                    name: 'Area',
                    className: 'ar',
                    pane: 'tilePane',
                    type: 'poly',
                    url: 'http://137.74.82.193:3000/area_otb',
                    color: '#33691E',
                    fillColor: '#33691E',
                    opacity: 1,
                    fillOpacity: 0.3,
                    weight: 1.0,
                    popupColumns: [
                        'id, otb_name',
                        'id_provisoire',
                        'campo2',
                        'status',
                        'comments',
                        'mq'
	                ],
	                category: 'otb_lines'
                },     
                cross: {
                    name: 'Cross',
                    className: 'cross',
                    pane: 'tilePane',
                    type: 'point',
                    url: 'http://137.74.82.193:3000/cross',
                    color: '#666',
                    fillColor: '#D50000',
                    opacity: 1,
                    fillOpacity: 1,
                    weight: 1.0,
                    radius: 3,
                    popupColumns: [
                        'id',
                        'Storage_loop_metres'
	                ],
	                category: 'other'
                },                          
            },            
            demoLayers: {
                area: 'area',
                cross: 'cross',
                fig_8: 'fig_8',
                demand: 'demand',
				ofc_12: 'ofc_12',
				ofc_48: 'ofc_48',
				ofc_144: 'ofc_144',
				otb: 'otb',
                otbb: 'otbb',
                sc: 'sc',
                sc144: 'sc144',
                sc48: 'sc48',
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