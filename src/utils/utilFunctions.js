const { default: jwtDecode } = require("jwt-decode");

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
  }

const formatDate = (endDate) => {
    const date = new Date(endDate * 1000);

    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const year = date.getFullYear();

    //DD-MM-YYYY
    return day + '.' + month + '.' + year;
}

const isTokenCloseToExpire = (token) => { 
    if(token) {
        const decoded = jwtDecode(token);
        const closeToExpire = (decoded.exp - Date.now() / 1000) < 600;
    
        return closeToExpire;
    } else {
        return true;
    }
}

const sortSubscriptions = (subscriptions) => {
    const sortedSubscriptions = subscriptions.sort((a, b) => {
        return a.amount - b.amount;
    });

    return sortedSubscriptions;
}

module.exports = {
    classNames,
    formatDate,
    isTokenCloseToExpire,
    sortSubscriptions,
}