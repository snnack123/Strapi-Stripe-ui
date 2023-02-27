const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
  }

const formatDate = (endDate) => {
    const date = new Date(endDate * 1000);

    const day = date.getDate();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const year = date.getFullYear();

    //DD-MM-YYYY
    return day + '.' + month + '.' + year;
}

module.exports = {
    classNames,
    formatDate
}