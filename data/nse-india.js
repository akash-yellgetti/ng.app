const axios = require('axios');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const filepath = path.join('stocks.json');

var config = {
  method: 'get',
  url: 'https://archives.nseindia.com/content/equities/EQUITY_L.csv',
  responseType: 'arraybuffer',
  headers: { }
};

axios(config)
.then(function (response) {
    const workbook = XLSX.read(response.data, { cellDates: true });
    const sheetNameList = workbook.SheetNames;
    // console.log(she);
    const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]], { defval: null ,raw: false, dateNF:'yyyy-mm-dd'});
    const stocks = _.reduce(json, (a, v, k) => {
        const o = _.reduce(v, (o, vl, ky)=> {
          o[_.camelCase(_.trim(ky))] = vl;
          return o;
        }, {})
        a.push(o);
        return a;
    }, []);
    
    fs.writeFileSync(filepath, JSON.stringify(stocks, null, 2), 'utf8');
})
.catch(function (error) {
  console.log(error);
});
