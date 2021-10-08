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


const getPositionName = (option, type) => {
  const o = _.get(option, type);
  const price = Math.sign(o.change) === -1 ? 'negative' : 'positive';
  const changeinOpenInterest = Math.sign(o.changeinOpenInterest) === -1 ? 'negative' : 'positive';
  const conditions = _.filter(optionCondiiton, (res) => {
    return _.indexOf(res.types, type) > -1;
  })

  return _.find(conditions, { price, changeinOpenInterest });
}


function timeConverter(UNIX_timestamp) {
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

export const dashboard = {
  intradayDatatableSetting: {
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
        dataSrc: function (json) {
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
              console.log(timestamp.time, t[i]);

              data.push(d);
            }
          }

          // const data = _.get(json, 'fno_list.item', []);
          return data;
        }
      },
      pageLength: 10,
      processing: true,
      columns: [
        { "data": "datetime", "title": "datetime" },
        { "data": "time", "name": "time","title": "time" },
        { "data": "open", "title": "open" },
        { "data": "high", "title": "high" },
        { "data": "low", "title": "low" },
        { "data": "close", "title": "close" },
        { "data": "volume", "title": "volume" }
      ]
    }

  },
  callDatatableSetting: {
    id: "callDatatable",
    table: {},
    options: {
      responsive: true,
      ajax: {
        url: "https://appfeeds.moneycontrol.com/jsonapi/fno/overview&format=json&inst_type=options&option_type=CE&id=NIFTY&ExpiryDate=2021-09-23",
        method: "GET",
        cache: false,
        timeout: 0,
        headers: {},
        dataSrc: function (json) {
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

  },
  putDatatableSetting: {
    id: "putDatatable",
    table: {},
    options: {
      responsive: true,
      ajax: {
        url: "https://appfeeds.moneycontrol.com/jsonapi/fno/overview&format=json&inst_type=options&option_type=PE&id=NIFTY&ExpiryDate=2021-09-23",
        method: "GET",
        cache: false,
        timeout: 0,
        headers: {},
        dataSrc: function (json) {
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

  },
  nseOptionChainDatatable: {
    id: "nseOptionChainDatatable",
    table: {},
    options: {
      responsive: true,
      order: [[8, "asc"]],
      ajax: {
        url: "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY",
        method: "GET",
        cache: true,
        timeout: 0,
        headers: {
        },
        dataSrc: function (json) {
          console.log(json);

          const data = _.get(json, 'filtered.data');
          const price = _.get(json, 'records.underlyingValue');
          const selectedStrikeprice = Math.round(Math.round(price) / 100) * 100;
          console.log(selectedStrikeprice);

          for (const i in data) {
            const option = data[i];
            const optionPrice = price > option.strikePrice ? parseFloat((price - option.strikePrice).toFixed(2)) : parseFloat((option.strikePrice - price).toFixed(2));
            // console.log(optionPrice);
            const ceOptionLastPrice = _.get(option, 'CE.lastPrice');
            const ceOptionPremium = option.strikePrice >= price ? 0 : parseFloat((ceOptionLastPrice - optionPrice).toFixed(2));
            // const ceOptionPremium = 0;
            const peOptionLastPrice = _.get(option, 'PE.lastPrice');
            const peOptionPremium = option.strikePrice <= price ? 0 : parseFloat((peOptionLastPrice - optionPrice).toFixed(2));
            // const peOptionPremium = 0;
            // console.log(ceOptionPremium);
            // const ceOptionPremium = optionPrice-_.get(option,'CE.lastPrice');
            _.set(data[i], 'CE.change', _.get(option, 'CE.change').toFixed(2));
            _.set(data[i], 'PE.change', _.get(option, 'PE.change').toFixed(2));
            _.set(data[i], 'optionPrice', optionPrice);
            _.set(data[i], 'price', price);
            _.set(data[i], 'selectedStrikeprice', selectedStrikeprice);
            _.set(data[i], 'ceOptionAction', getPositionName(option, 'CE'));
            _.set(data[i], 'ceLastPrice', ceOptionLastPrice);
            _.set(data[i], 'ceOptionPremium', ceOptionPremium);
            _.set(data[i], 'peLastPrice', peOptionLastPrice);
            _.set(data[i], 'peOptionPremium', peOptionPremium);
            _.set(data[i], 'peOptionAction', getPositionName(option, 'PE'));
            // console.log(_.pick(data[i], ['strikePrice', 'optionPrice', 'ceOptionLastPrice']));
          }

          const filterData = _.chain(data).orderBy(['strikePrice'], ['asc']).drop(52).take(31).value();

          // for ( var i=0, ien=json.data.length ; i<ien ; i++ ) {
          //   json.data[i][0] = '<a href="/message/'+json.data[i][0]+'>View message</a>';
          // }
          return filterData;
        }
      },
      pageLength: 50,
      processing: true,
      "columns": [
        // {
        //   "data": "expiryDate",
        //   "title": "expiryDate"
        // },
        {
          "data": "price",
          "title": "price",
          "width": "5%"
        },
        {
          "data": "optionPrice",
          "title": "optionPrice"
        },
        {
          "data": "ceOptionAction.name",
          "title": "ceOptionAction"
        },
        {
          "data": "CE.changeinOpenInterest",
          "title": "C-OI",
          "width": "5%"
        },
        {
          "data": "CE.openInterest",
          "title": "OI",
          "width": "5%"
        },
        {
          "data": "CE.change",
          "title": "C-price",
          "width": "5%"
        },
        {
          "data": "ceLastPrice",
          "title": "ceLastPrice",
          "width": "5%"
        },
        {
          "data": "ceOptionPremium",
          "title": "ceOptionPremium"
        },
        {
          "data": "strikePrice",
          "title": "strikePrice",
          "width": "5%"
        },
        {
          "data": "peLastPrice",
          "title": "peLastPrice",
          "width": "5%"
        },
        {
          "data": "peOptionPremium",
          "title": "peOptionPremium"
        },
        {
          "data": "peOptionAction.name",
          "title": "peOptionAction",

        },
        {
          "data": "PE.change",
          "title": "C-price",
          "width": "5%"
        },
        {
          "data": "PE.changeinOpenInterest",
          "title": "C-OI",
          "width": "5%"
        },
        {
          "data": "PE.openInterest",
          "title": "OI",
          "width": "5%"
        }

      ],
      "rowCallback": function (row, data, index) {
        // console.log(data);

        if (data['peOptionPremium'] !== 0 && data['peOptionPremium'] > -10 && data['peOptionPremium'] < 10 && data['peOptionLastPrice'] < 300) {
          $('td', row).css('background-color', 'yellow');
        }

        if (data['ceOptionPremium'] !== 0 && data['ceOptionPremium'] > -10 && data['ceOptionPremium'] < 10 && data['ceOptionLastPrice'] < 300) {
          $('td', row).css('background-color', 'green');
        }

        if (data['strikePrice'] === data['selectedStrikeprice']) {
          $('td', row).css('background-color', 'Orange');
        }

      }
    }
  }

}