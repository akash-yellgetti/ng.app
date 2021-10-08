export const optionCondiitons = [
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
];