import * as _ from 'lodash';


const optionDatatableSettings = {
    table: {},
    options: {
        responsive: true,
        data: [],
        columns: [
            // { "data": "fno_exp", "title": "fno_exp" },
            { "data": "strikeprice", "title": "strikeprice" },
            { "data": "name", "title": "name" },
            { "data": "lastvalue", "title": "lastvalue" },
            { "data": "percentchange", "title": "percentchange" },
            { "data": "oi_percchg", "title": "oi_percchg" },
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
                    dataSrc: function (json: any) {
                        console.log(json);

                        const data = _.map(_.get(json, 'data'), (res) => {
                            _.set(res, 'sc_sector', _.get(res, 'sc_sector', null));
                            return res;
                        });
                        return data;
                    }
                },
                pageLength: 10,
                processing: true,
                columns: [
                    { "data": "ISINCode", "title": "ISIN Code" },
                    { "data": "symbol", "title": "Symbol" },
                    { "data": "companyName", "title": "Company Name" },
                    { "data": "sc_id", "title": "ID" },
                    { "data": "sc_sector", "title": "sc_sector" }

                ],
                "initComplete": function (settings: any, json: any) {
                    // alert( 'DataTables has finished its initialisation.' );
                }
            },
        }
    }

}