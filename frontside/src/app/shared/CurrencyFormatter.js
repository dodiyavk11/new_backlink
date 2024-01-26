class CurrencyFormatter {
    static formatCurrency(amount, locale = 'de-DE', currency = 'EUR') {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
      }).format(amount);
    }
  }
  
  export default CurrencyFormatter;
  