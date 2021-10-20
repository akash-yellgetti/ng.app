import * as _ from 'lodash';
import * as moment from 'moment';
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
        dom: 'Qlfrtip',
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
                dom: 'Qlfrtip',
                responsive: true,
                ajax: {
                    url: "/assets/json/stocks.json",
                    method: "GET",
                    cache: true,
                    timeout: 0,
                    headers: {},
                    dataSrc:  (json: any) => {
                        // console.log(json);
                        // const promises = [];
                        let data = _.map(json, (res) => {
                            // _.set(res, 'sc_sector', _.get(res, 'sc_sector', null));
                            // _.set(res, 'priceprevclose', _.get(res, 'priceprevclose', null));
                            _.set(res, 'lastPrice', _.get(res, 'lastPrice', ''));
                            _.set(res, 'basePrice', _.get(res, 'basePrice', ''));
                            _.set(res, 'open', _.get(res, 'open', ''));
                            _.set(res, 'dayHigh', _.get(res, 'dayHigh', ''));
                            _.set(res, 'dayLow', _.get(res, 'dayLow', ''));
                            _.set(res, 'high52', _.get(res, 'high52', ''));
                            _.set(res, 'low52', _.get(res, 'low52', ''));
                            
                            return res;
                        });
                        
                       
                        
                        
                        
                        return data;
                        
                    }
                },
                order: [[ 12, "desc" ], [ 3, "desc" ]],
                pageLength: 10,
                processing: true,
                columns: [
                    { "data": "isinNumber", "title": "ISIN Code" },
                    { "data": "symbol", "title": "Symbol" },
                    { "data": "nameOfCompany", "title": "Company Name" },
                    { "data": "dateOfListingTimeSecond" , "title": "Date Of Listing T"},
                    { "data": "dateOfListing" , "title": "Date Of Listing", "type":  "date", 
                        "render": function (data, type, row) {
                            data = moment(data).format('DD-MMM-YYYY');
                            return data;
                        }

                    },
                    // { "data": "sc_id", "title": "ID" },
                    // { "data": "sc_sector", "title": "sc_sector" },
                    // { "data": "pricepercentchange", "title": "CHG.P", "type": "num"},
                    // { "data": "priceprevclose", "title": "PREV.P", "type": "num"},
                    {   "data": "lastPrice", "title": "CUR.P", "type": "num",
                        // "render": function (data, type, row) {
                        //     return parseFloat(data.replace(/,/g, ''));
                        // }
                    },
                    { "data": "basePrice", "title": "AVG.P", "type": "num",
                        // "render": function (data, type, row) {
                        //     return parseFloat(data.replace(/,/g, ''));
                        // }
                    },
                    { "data": "open", "title": "OPN", "type": "num",
                        // "render": function (data, type, row) {
                        //     return parseFloat(data.replace(/,/g, ''));
                        // }
                    },
                    { "data": "dayHigh", "title": "HP", "type": "num",
                        // "render": function (data, type, row) {
                        //     return parseFloat(data.replace(/,/g, ''));
                        // }
                    },
                    { "data": "dayLow", "title": "LP", "type": "num",
                        // "render": function (data, type, row) {
                        //     return parseFloat(data.replace(/,/g, ''));
                        // }
                    },
                    { "data": "high52", "title": "52H", "type": "num",
                        // "render": function (data, type, row) {
                        //     return parseFloat(data.replace(/,/g, ''));
                        // }
                    },
                    { "data": "low52", "title": "52L", "type": "num",
                    // "render": function (data, type, row) {
                        //     return parseFloat(data.replace(/,/g, ''));
                        // }
                    },
                    { "data": "remainingPotenial", "title": "remainingPotenial", "type": "num" }

                ],
                "initComplete": function (settings: any, json: any) {
                    var table = this;
                    var tableApi = this.api();
                    var elem = $(this);
                    
                    // const data = tableApi.rows().data().toArray();
                    // // console.log(data);
                    // const promises = [];
                    // const chunks = _.chunk(data, 100);
                    // _.each(chunks, (chunk, i: any) => { 
                    //     _.delay(() => {
                    //         _.each(chunk, (res: any) => {
                    //             promises.push(ajax(res.sc_id));
                    //         });
                    //     }, 2500 * (i + 1), i);
                    // });
                    
                    // _.delay(() => {
                    //     Promise.all(promises).then((result) => {
                    //         const newData = _.chain(result).mapValues('data').values().value();
                    //         const mergedData = _.orderBy(_.values(_.merge(_.keyBy(data, 'sc_id'), _.keyBy(newData, 'symbol'))), ['pricecurrent'], ['asc'])
                    //         // console.log(mergedData);
                    //         tableApi.clear();

                    //         tableApi.rows.add(mergedData);
                    //         // tableApi.sort([3, 'desc']);
                    //         // console.log();
                            
                    //         tableApi.order( [[ 3, 'desc' ], [ 8, 'asc' ]] ).draw();
                    //     })

                    // }, 3000 * (_.size(chunks) + 1), _.size(chunks));
                    // alert( 'DataTables has finished its initialisation.' );
                }
            },
        }
    }

}