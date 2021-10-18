import * as _ from 'lodash';
import { result } from 'lodash';
declare const $: any;


  

  function ajax(sc_id) {
	return new Promise(function(resolve, reject) {
		const ajaxSetting = {
            "url": "https://priceapi.moneycontrol.com/pricefeed/nse/equitycash/"+sc_id,
            "method": "GET",
            "headers": {},
        };

        $.ajax(ajaxSetting).done(function (response) {
            return resolve(response)
        });
	});
}
  

const optionDatatableSettings = {
    table: {},
    options: {
        responsive: true,
        data: [],
        columns: [
            // { "data": "fno_exp", "title": "fno_exp" },
            { "data": "strikeprice", "title": "strikeprice", width: "10%" },
            { "data": "name", "title": "name" },
            { "data": "lastvalue", "title": "lastvalue", width: "10%"  },
            { "data": "percentchange", "title": "percentchange", width: "10%" },
            { "data": "oi_percchg", "title": "oi_percchg", width: "10%"  },
            // { "data": "direction", "title": "direction" },
            // { "data": "oi_change", "title": "oi_change" },
            // { "data": "last_traded_date", "title": "last_traded_date" },
            // { "data": "volume", "title": "volume" }
            
        ]
    }
}


export const Market = {
    index: {
        otmCallDatatable: {
            ...optionDatatableSettings,
            id: "otmCallDatatable",
        },
        itmCallDatatable: {
            ...optionDatatableSettings,
            id: "itmCallDatatable",
        },
        otmPutDatatable: {
            ...optionDatatableSettings,
            id: "otmPutDatatable",
        },
        itmPutDatatable: {
            ...optionDatatableSettings,
            id: "itmPutDatatable",
        },
        listDatatable: {
            id: "listDatatable",
            table: {},
            options: {
                responsive: true,
                ajax: {
                    url: "/assets/json/indices.json",
                    method: "GET",
                    cache: true,
                    timeout: 0,
                    headers: {},
                    dataSrc: function (json: any) {
                        console.log(json);

                        const data = _.get(json, 'data');
                        return data;
                    }
                },
                pageLength: 10,
                processing: true,
                columns: [
                    { "data": "id", "title": "ID" },
                    { "data": "name", "title": "Name" },
                    { "data": "url", "title": "Url" },
                ]
            },
        }
    },
    stock: {
        info: {},
        listDatatable: {
            id: "listDatatable",
            table: {},
            options: {
                responsive: true,
                ajax: {
                    url: "/assets/json/nifty-500-stocks.json",
                    method: "GET",
                    cache: true,
                    timeout: 0,
                    headers: {},
                    dataSrc:  (json: any) => {
                        // console.log(json);
                        // const promises = [];
                        let data = _.map(_.get(json, 'data'), (res) => {
                            _.set(res, 'sc_sector', _.get(res, 'sc_sector', null));
                            _.set(res, 'priceprevclose', _.get(res, 'priceprevclose', null));
                            _.set(res, 'pricecurrent', _.get(res, 'pricecurrent', null));
                            _.set(res, 'pricepercentchange', _.get(res, 'pricepercentchange', null));
                            _.set(res, 'AVGP', _.get(res, 'AVGP', null));
                            _.set(res, 'OPN', _.get(res, 'OPN', null));
                            _.set(res, 'HP', _.get(res, 'HP', null));
                            _.set(res, 'LP', _.get(res, 'LP', null));
                            _.set(res, '52H', _.get(res, '52H', null));
                            _.set(res, '52L', _.get(res, '52L', null));
                            
                            return res;
                        });
                        
                       
                        
                        
                        
                        return data;
                        
                    }
                },
                pageLength: 10,
                processing: true,
                columns: [
                    { "data": "isinid", "title": "ISIN Code" },
                    { "data": "symbol", "title": "Symbol" },
                    { "data": "companyName", "title": "Company Name" },
                    { "data": "sc_id", "title": "ID" },
                    { "data": "sc_sector", "title": "sc_sector" },
                    { "data": "pricepercentchange", "title": "pricepercentchange" },
                    { "data": "priceprevclose", "title": "priceprevclose" },
                    { "data": "pricecurrent", "title": "pricecurrent" },
                    { "data": "AVGP", "title": "AVGP" },
                    { "data": "OPN", "title": "OPN" },
                    { "data": "HP", "title": "HP" },
                    { "data": "LP", "title": "LP" },
                    { "data": "52H", "title": "52H" },
                    { "data": "52L", "title": "52L" }

                ],
                "initComplete": function (settings: any, json: any) {
                    var table = this;
                    var tableApi = this.api();
                    var elem = $(this);
                    
                    // const data = elem.rows().data().toArray();
                    // console.log(data);
                    const promises = [];
                    const data = tableApi.table().rows().data();
                    _.each(data, (res) => { 
                        promises.push(ajax(res.sc_id));
                    });
                    

                    Promise.all(promises).then((result) => {
                        const newData = _.chain(result).mapValues('data').values().value();
                        const mergedData = _.values(_.merge(_.keyBy(data, 'isinid'), _.keyBy(newData, 'isinid')));
                        console.log(mergedData);
                        

                        tableApi.clear();
                        tableApi.rows.add(data);
                        tableApi.draw();

                    })

                    
                    // alert( 'DataTables has finished its initialisation.' );
                }
            },
        }
    }

}