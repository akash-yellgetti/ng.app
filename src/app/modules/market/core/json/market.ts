import * as _ from 'lodash';

export const Market = {
    index: {
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
                    { "data": "url", "title": "Url" },
                    { "data": "name", "title": "Name" }
                ]
            },
        }
    },
    stock: {
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
                    
                ]
            },
        }
    }

}