class CurrencyFormatter {
    static formatCurrency(amount, locale = 'de-DE', currency = 'EUR') {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
      }).format(amount);
    }

    static formatDate(date, locale = 'de-DE') {
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date);
    }
    static formatDateTime(date, locale = 'de-DE') {
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(date);
    }
  }
  
  export default CurrencyFormatter;
  