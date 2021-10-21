const path = require('path');
const fs = require('fs');
const moment = require('moment')
const _ = require('lodash');
const XLSX = require('xlsx');
const filepath = path.join('stocks.json');
const stocks = fs.existsSync(filepath) ? JSON.parse(fs.readFileSync(filepath, 'utf8')) : {};
const analysisFilepath = path.join('analysis.json');

const fields = [
    'isinNumber', 
    'symbol', 
    'nameOfCompany', 
    'dateOfListing',
    'faceValue',
    'basePrice',
    'pricebandupper',
    'pricebandlower',
    'priceBand',
    'lastPrice',
    'averagePrice',
    'open',
    'dayHigh',
    'dayLow',
    'low52', 
    'high52'
];

const min = 0;
const max = 20;


const newStocks = _.chain(stocks).map(r => {
    const d =_.pick(r, fields);
    _.set(d, 'faceValue', parseFloat(_.replace(_.get(r, 'faceValue'), /,/g, '')));
    _.set(d, 'basePrice', parseFloat(_.replace(_.get(r, 'basePrice'), /,/g, '')));
    _.set(d, 'pricebandlower', parseFloat(_.replace(_.get(r, 'pricebandlower'), /,/g, '')));
    _.set(d, 'pricebandupper', parseFloat(_.replace(_.get(r, 'pricebandupper'), /,/g, '')));
    _.set(d, 'priceBand', parseFloat(_.replace(_.get(r, 'priceBand'), /,/g, '')));
    _.set(d, 'open', parseFloat(_.replace(_.get(r, 'open'), /,/g, '')));
    _.set(d, 'dayHigh', parseFloat(_.replace(_.get(r, 'dayHigh'), /,/g, '')));
    _.set(d, 'dayLow', parseFloat(_.replace(_.get(r, 'dayLow'), /,/g, '')));
    _.set(d, 'low52', parseFloat(_.replace(_.get(r, 'low52'), /,/g, '')));
    _.set(d, 'high52', parseFloat(_.replace(_.get(r, 'high52'), /,/g, '')));
    _.set(d, 'lastPrice', parseFloat(_.replace(_.get(r, 'lastPrice'), /,/g, '')));
    _.set(d, 'averagePrice', parseFloat(_.replace(_.get(r, 'averagePrice'), /,/g, '')));
    _.set(d, 'dateOfListingTimeSecond', moment(_.get(r, 'dateOfListing'), "MMDDYYYY").valueOf());
    _.set(d, 'dateOfListing', moment(_.get(r, 'dateOfListing')).format("DD-MMM-YYYY"));
    _.set(d, 'coveredPotenial',  parseFloat(((_.get(d, 'lastPrice')/_.get(d, 'high52'))*100).toFixed(2)));
    _.set(d, 'remainingPotenial',  parseFloat((100-_.get(d, 'coveredPotenial'))).toFixed(2) );

    return d;
})
// .filter((r) => {
//     return min < parseFloat(_.replace(_.get(r, 'averagePrice'), /,/g, '')) &&  parseFloat(_.replace(_.get(r, 'averagePrice'), /,/g, '')) <= max;
// })
// .sortBy((d) => {
//     return new Date(d.dateOfListing);
// })
.orderBy(['remainingPotenial', 'dateOfListingTimeSecond' ], ['desc', 'desc'])
.value();


fs.writeFileSync(analysisFilepath, JSON.stringify(newStocks, null, 2), 'utf8');

// console.log(newStocks);

const fileName = path.join('analysis.xlsx');;
const ws = XLSX.utils.json_to_sheet(newStocks);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'output');
XLSX.writeFile(wb, fileName);