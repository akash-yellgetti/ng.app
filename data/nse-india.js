const axios = require('axios');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const filepath = path.join('stocks.json');



const api = (symbol) => {
  // const setting = {
  //   method: 'get',
  //   url: 'https://www.nseindia.com/api/quote-equity?symbol='+symbol,
  //   // url: 'https://priceapi.moneycontrol.com/techCharts/symbols?symbol='+symbol,
  //   headers: { }
  // };
  return axios.get('https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/ajaxGetQuoteJSON.jsp?series=EQ&symbol=' + encodeURIComponent(symbol), {
    headers: {
      Referer: 'https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/GetQuote.jsp?symbol=' + encodeURIComponent(symbol),
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
}

var config = {
  method: 'get',
  url: 'https://archives.nseindia.com/content/equities/EQUITY_L.csv',
  responseType: 'arraybuffer',
  headers: { }
};

const promsies = {};

axios(config)
.then((response) => {
    const workbook = XLSX.read(response.data, { cellDates: true });
    const sheetNameList = workbook.SheetNames;
    // console.log(she);
    const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]], { defval: null ,raw: false});
    const stocks = _.reduce(json, (a, v, k) => {
        const o = _.reduce(v, (o, vl, ky)=> {
          o[_.camelCase(_.trim(ky))] = vl;
          return o;
        }, {});
        
        a.push(o);
        return a;
    }, []);
    const q = _.chunk(stocks, 10);
    _.each(q, (chunk, k) => {
      _.delay(()=>{
        _.each(chunk, (o) => {
          promsies[_.get(o, 'symbol')] = api(_.get(o, 'symbol'));
        });
      }, 2500*k, k)
    })

    
    _.delay(()=>{
      Promise.all(_.values(promsies)).then((result) => {
        const data = _.chain(result).mapValues('data.data').values().flatten().value();
        // console.log(data);
        const mergedData = _.values(_.merge(_.keyBy(stocks, 'symbol'), _.keyBy(data, 'symbol')))
        fs.writeFileSync(path.join('newstocks.json'), JSON.stringify(mergedData, null, 2), 'utf8');
      });
    }, 10000*(_.size(_.chunk(stocks, 150))+1), _.size(_.chunk(stocks, 150)))

    // fs.writeFileSync(filepath, JSON.stringify(stocks, null, 2), 'utf8');

    
})
.catch(function (error) {
  console.log(error);
});

