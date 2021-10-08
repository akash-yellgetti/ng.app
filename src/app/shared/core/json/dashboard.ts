import * as _ from 'lodash';
const to = Math.round((new Date().getTime()) / 1000);
const from = Math.round((new Date(new Date().setHours(0, 0, 0, 0)).getTime()) / 1000);
const optionCondiiton = [

    {
      name: "Call Writing",
      price: "negative",
      types: ["CE"],
      changeinOpenInterest: "positive",
    },
    {
      name: "Put Writing",
      price: "negative",
      types: ["PE"],
      changeinOpenInterest: "positive",
    },
    {
      name: "Call Unwinding",
      price: "positive",
      types: ["CE"],
      changeinOpenInterest: "negative",
    },
    {
      name: "Put Unwinding",
      price: "positive",
      types: ["PE"],
      changeinOpenInterest: "negative",
    },
    {
      name: "Long Build Up",
      price: "positive",
      types: ["PE", "CE"],
      changeinOpenInterest: "positive",
    },
    {
      name: "Short Build Up",
      price: "negative",
      types: ["PE", "CE"],
      changeinOpenInterest: "positive",
    },
    {
      name: "Long Unwinding",
      price: "negative",
      types: ["PE", "CE"],
      changeinOpenInterest: "negative",
    },
    {
      name: "Short Covering",
      price: "positive",
      types: ["PE", "CE"],
      changeinOpenInterest: "negative",
    },
  ]
  
const getPositionName = (option: any, type: any) => {
    const o = _.get(option, type);
    const price = Math.sign(o.change) === -1 ? 'negative' : 'positive';
    const changeinOpenInterest = Math.sign(o.changeinOpenInterest) === -1 ? 'negative' : 'positive';
    const conditions = _.filter(optionCondiiton, (res) => {
      return _.indexOf(res.types, type) > -1;
    })
  
    return _.find(conditions, { price, changeinOpenInterest });
  }
  
  
  function timeConverter(UNIX_timestamp: any) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
    return {
      date,
      month,
      year,
      hour,
      min,
      sec,
      time,
      self: a,
    };
  }

const optionSettings = {
    id: "",
    table: {},
    options: {
        responsive: true,
        ajax: {
            url: "https://appfeeds.moneycontrol.com/jsonapi/fno/overview&format=json&inst_type=options&option_type=CE&id=NIFTY&ExpiryDate=2021-09-23",
            method: "GET",
            cache: true,
            timeout: 0,
            headers: {},
            dataSrc: function (json: any) {
                const data = _.get(json, 'fno_list.item');
                return data;
            }
        },
        pageLength: 10,
        processing: true,
        columns: [
            // { "data": "fno_exp", "title": "fno_exp" },
            { "data": "strikeprice", "title": "strikeprice" },
            { "data": "lastvalue", "title": "lastvalue" },
            { "data": "percentchange", "title": "percentchange" },
            { "data": "direction", "title": "direction" },
            { "data": "oi_change", "title": "oi_change" },
            { "data": "oi_percchg", "title": "oi_percchg" },
            // { "data": "last_traded_date", "title": "last_traded_date" },
            { "data": "volume", "title": "volume" }
        ]
    }
}

export const IndexDashboard = {
    intradayDatatable: {
        id: "intradayDatatable",
        table: {},
        options: {
            responsive: true,
            ajax: {
                url: "https://priceapi.moneycontrol.com/techCharts/techChartController/history?symbol=9&resolution=15&from=" + from + "&to=" + to,
                method: "GET",
                cache: false,
                timeout: 0,
                headers: {},
                dataSrc: function (json: any) {
                    const data = [];
                    const { c, h, l, o, s, t, v } = json;
                    for (const i in c) {
                        if (c[i]) {
                            const timestamp = timeConverter(t[i]);
                            const d = {
                                open: o[i],
                                high: h[i],
                                low: l[i],
                                close: c[i],
                                volume: v[i],
                                time: timestamp.time,
                                datetime: timestamp.self.getTime(),
                                dateTime: timestamp.hour + "" + timestamp.min
                            }
                            // console.log(timestamp.time, t[i]);

                            data.push(d);
                        }
                    }

                    // const data = _.get(json, 'fno_list.item', []);
                    return data;
                }
            },
            searching: false,
            lengthChange: false,
            pageLength: 10,
            processing: true,
            columns: [
                { "data": "datetime", "title": "datetime" },
                { "data": "time", "name": "time", "title": "time" },
                { "data": "open", "title": "open" },
                { "data": "high", "title": "high" },
                { "data": "low", "title": "low" },
                { "data": "close", "title": "close" },
                { "data": "volume", "title": "volume" }
            ]
        }
    },
    itmCallDatatable: {
        ...optionSettings,
        id: "itmCallDatatable"
    },
    itmPutDatatable: {
        ...optionSettings,
        id: "itmPutDatatable"
    },
    otmCallDatatable: {
        ...optionSettings,
        id: "otmCallDatatable"
    },
    otmPutDatatable: {
        ...optionSettings,
        id: "otmPutDatatable"
    }
}
