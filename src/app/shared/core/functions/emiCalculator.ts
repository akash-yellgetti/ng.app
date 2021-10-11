//a- loanAmount,m-numberOfMonths,r=rateOfInterest,mir-monthlyInterestRatio,h-high,l-low,t-total,i-interest,bb-beginbalance,

const months = ["January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const emiCalculator = (a, m, r, prepay = 0, emiIncrement = 0, dt = new Date()) => {
    let mir, h, l, sp, emi, t, bb, initial = 0, begin = 0, end = 0, i = 1, res = [];
    a = (+a); m = (+m); r = (+r);
    mir = r / 100 / 12;
    h = Math.pow(1 + mir, m);
    l = h - 1;
    sp = h / l;
    emi = a * mir * sp;
    t = m * emi;
    bb = (+a);
    prepayAmount = emi.toFixed(2) * prepay;
    if (m > 0) {
        for (i; i <= m; i++) {

            date = new Date(dt.setMonth(dt.getMonth() + 1));

            initial = bb * (r / 100 / 12);
            begin = emi.toFixed(2) - initial.toFixed(2);
            prePayment = i === 1 || date.getMonth() === 3 ? prepayAmount : 0;
            emi = date.getMonth() === 3 ? (emi + (emi * (emiIncrement / 100))) : emi;
            end = bb - prePayment - begin.toFixed(2);
            // dt.setMonth( dt.getMonth() + 2 );
            res.push({
                "Date": months[date.getMonth()] + "-" + date.getFullYear(),
                "MonthNo": i,
                "BeginBalance": bb.toFixed(2),
                "EMI": emi.toFixed(2),
                "Principal": begin.toFixed(2),
                "Interest": initial.toFixed(2),
                "prePayment": prePayment.toFixed(2),
                "EndBalance": end.toFixed(2)
            })
            bb = bb - prePayment - begin.toFixed(2);
            if (end < 0 || i === m)
                return res;
        }
    } else {
        return {
            "MonthNo": 0,
            "BeginBalance": 0,
            "EMI": 0,
            "Principal": 0,
            "Interest": 0,
            "EndBalance": 0
        }
    }
}

