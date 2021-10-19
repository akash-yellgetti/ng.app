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
                    { "data": "nameOfCompany", "title": "Company Name" },
                    { "data": "dateOfListing" , "title": "Date Of Listing", "type":  "date", 
                    //     "render": function (data, type, row) {
                    //     data = moment(data).format('DD MMM YYYY');
                    //     return data;
                    // }

                    },
                    { "data": "sc_id", "title": "ID" },
                    { "data": "sc_sector", "title": "sc_sector" },
                    { "data": "pricepercentchange", "title": "CHG.P", "type": "num"},
                    { "data": "priceprevclose", "title": "PREV.P", "type": "num"},
                    { "data": "pricecurrent", "title": "CUR.P", "type": "num"},
                    { "data": "AVGP", "title": "AVG.P", "type": "num"},

                    { "data": "OPN", "title": "OPN", "type": "num"},
                    { "data": "HP", "title": "HP", "type": "num"},
                    { "data": "LP", "title": "LP", "type": "num"},
                    { "data": "52H", "title": "52H", "type": "num"},
                    { "data": "52L", "title": "52L", "type": "num"}

                ],
                "initComplete": function (settings: any, json: any) {
                    var table = this;
                    var tableApi = this.api();
                    var elem = $(this);
                    
                    const data = tableApi.rows().data().toArray();
                    // console.log(data);
                    const promises = [];
                    const chunks = _.chunk(data, 100);
                    _.each(chunks, (chunk, i: any) => { 
                        _.delay(() => {
                            _.each(chunk, (res: any) => {
                                promises.push(ajax(res.sc_id));
                            });
                        }, 2500 * (i + 1), i);
                    });
                    
                    _.delay(() => {
                        Promise.all(promises).then((result) => {
                            const newData = _.chain(result).mapValues('data').values().value();
                            const mergedData = _.orderBy(_.values(_.merge(_.keyBy(data, 'sc_id'), _.keyBy(newData, 'symbol'))), ['pricecurrent'], ['asc'])
                            // console.log(mergedData);
                            tableApi.clear();

                            tableApi.rows.add(mergedData);
                            // tableApi.sort([3, 'desc']);
                            // console.log();
                            
                            tableApi.order( [[ 3, 'desc' ], [ 8, 'asc' ]] ).draw();
                        })

                    }, 3000 * (_.size(chunks) + 1), _.size(chunks));
                    // alert( 'DataTables has finished its initialisation.' );
                }
            },
        }
    }

}