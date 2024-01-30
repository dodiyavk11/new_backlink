function formatCurrency(amount, locale = 'de-DE', currency = 'EUR') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  }

  function formatDateCustom(date, locale = 'de-DE') {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  }
  
  function formatDateTimeCustom(date, locale = 'de-DE') {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  }
  
  module.exports = { formatCurrency, formatDateCustom, formatDateTimeCustom };