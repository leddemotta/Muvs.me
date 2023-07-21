import {
  format,
  parse
} from "date-fns";

import ptBR from 'date-fns/locale/pt-BR';
import vehicleTypes from "@/json/vehicleTypes.json";
import vehicleBrands from "@/json/vehicleBrands.json";
import recommendations from "@/json/recommendations.json";
import colors from "@/json/colors.json";

export default {
  data() {
    return {
      vehicleTypes,
      vehicleBrands,
      recommendations,
      colors
    };
  },
  methods: {
    formatVehicleTypeName(type) {
      let theType = "";

      if (type == "bicycle") {
        theType = "Bicicleta"
      }

      if (type == "scooter") {
        theType = "Patinete"
      }

      if (type == "rollerblades") {
        theType = "Patins"
      }

      return theType;
    },
    formatDateTimeZeros(i) {
      if (i < 10) {
        return "0" + i;
      } else {
        return i;
      }
    },
    formatDateTimeObj(date) {
      return format(date, "dd/MM/yyyy HH:mm");
    },
    formatDateTime(date) {
      let theDate = parse(date, "yyyy-MM-dd HH:mm:ss", new Date());
      return format(theDate, "dd/MM/yyyy HH:mm");
    },
    formatDate(date) {
      let theDate = parse(date, "yyyy-MM-dd", new Date());
      return format(theDate, "dd/MM/yyyy");
    },
    formatDateModel(date, model, separator) {

      if (date != undefined) {

        if (typeof date == 'object') {
          return format(date._d, model, {
            locale: ptBR
          })
        }

        if (date.length == 8) {
          let theDate = parse(date, "yyyyMMdd", new Date());
          return format(theDate, model, {
            locale: ptBR
          });
        }

        if (date.length == 14) {
          let theDate = parse(date, "yyyyMMdd HH:mm", new Date());
          return format(theDate, model, {
            locale: ptBR
          });
        }

        if (date.length == 10) {
          return date;
        }

        separator

        // if (date.length == 10 && separator) {
        //   let theDate = parse(date, `dd${separator}MM${separator}yyyy`, new Date());
        //   return format(new Date(theDate), model, {
        //     locale: ptBR
        //   })
        // }

        if (date.includes('Horário') || date.includes('Hora padrão') || date.includes('GMT-0300')) {
          console.log('Horário', date, new Date(date).getMonth());
          return format(new Date(date), model, {
            locale: ptBR
          });
        }

        if (date.length == 24) {

          let theDate = parse(
            date.split("T")[0],
            "yyyy-MM-dd",
            new Date()
          );
          return format(theDate, model, {
            locale: ptBR
          });
        }

      }
    },
    formatPriceBR(price) {
      return `${Number(parseFloat(price).toFixed(2)).toLocaleString("pt-BR", {
           
            })}`;
    },
    formatPricePrBr(price) {
      return `${Number(parseFloat(price).toFixed(2)).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            })}`;
    },

    formatPercentage(percentage) {
      let thePercentage = 0;
      if (percentage) {
        thePercentage = percentage
      }
      return `${Number(parseFloat(thePercentage).toFixed(2)).toLocaleString("pt-BR")}`
    },
    formatPricePtBr(price) {

      let thePrice = 0;
      if (price) {
        thePrice = price
      }
      return `${Number(parseFloat(thePrice).toFixed(2)).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            })}`;
    },
    formatPriceCurrency(price, currency) {

      if (!price) {
        price = 0;
      }

      return `${Number(parseFloat(price).toFixed(2)).toLocaleString("pt-BR", {
                style: "currency",
                currency: currency,
            })}`;
    },
    formatPrice(price) {
      return `${Number(parseFloat(price).toFixed(2)).toLocaleString()}`;
    },
    formatContractStatus(status) {
      if (status === "new") {
        status = "Novo";
      }

      if (status === "concluded") {
        status = "Concluído";
      }

      if (status === "canceled") {
        status = "Cancelado";
      }

      if (status === "edit") {
        status = "Edição";
      }

      return status;
    },

    formatMultiDates(date) {

      if (date != undefined) {

        console.log('formatMultiDates', typeof date, date);

        if (typeof date == 'object') {
          return format(date._d, 'dd/MM/yyyy')
        }

        if (date.length == 8) {
          let theDate = parse(date, "yyyyMMdd", new Date());
          return format(theDate, "dd/MM/yyyy");
        }

        if (date.length == 14) {
          let theDate = parse(date, "yyyyMMdd HH:mm", new Date());
          return format(theDate, "yyyy/MM/dd HH:mm");
        }

        if (date.length == 10) {
          //return date;

          let theDate = date;

          if (date.includes('-')) {
            theDate = parse(date, "yyyy-MM-dd", new Date());
            theDate = format(theDate, "dd/MM/yyyy");
          }

          return theDate;
        }

        if (date.includes('Horário') || date.includes('Hora padrão') || date.includes('GMT-0300')) {
          console.log('Horário', date, new Date(date).getMonth());
          return format(new Date(date), "dd/MM/yyyy");
        }

        if (date.length == 24) {
          //console.log('Horário 2 >>>', date);
          let theDate = parse(
            date.split("T")[0],
            "yyyy-MM-dd",
            new Date()
          );
          return format(theDate, "dd/MM/yyyy");
        }

      }
    },
    formatMultiDatesEng(date) {

      if (date != undefined) {

        console.log(typeof date, date);

        if (typeof date == 'object') {
          return format(date._d, 'yyyy-MM-dd')
        }

        if (date.length == 8) {
          let theDate = parse(date, "yyyyMMdd", new Date());
          return format(theDate, "yyyy-MM-dd");
        }

        if (date.length == 14) {
          let theDate = parse(date, "yyyyMMdd HH:mm", new Date());
          return format(theDate, "yyyy-MM-dd HH:mm");
        }

        if (date.length == 10) {
          return date;
        }

        if (date.includes('Horário') || date.includes('Hora padrão') || date.includes('GMT-0300')) {
          console.log('Horário', date, new Date(date).getMonth());
          return format(new Date(date), "yyyy-MM-dd");
        }

        if (date.length == 24) {
          //console.log('Horário 2 >>>', date);
          let theDate = parse(
            date.split("T")[0],
            "yyyy-MM-dd",
            new Date()
          );
          return format(theDate, "yyyy-MM-dd");
        }

      }
    },
    formatInt(number) {
      return `${Number(parseFloat(number).toFixed(2)).toLocaleString()}`;
    },
    convertToInt(stringNumber) {
      if (stringNumber) {
        return parseInt(stringNumber.replace(/\./g, "").replace(" ", ""));
      }
    },
    convertMoneyToNumber(stringMoney) {
      let str = `${stringMoney}`
      return Number(
        str.replace(/\./g, "")
        .substr(3)
        .replace(",", ".")
      );
    },
    convertNumberToDatabase(stringMoney) {
      return stringMoney.replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(",", ".");
    },
    formatCurrency(currency) {
      let str = ``

      if (currency != undefined) {
        if (currency == 'EUR') {
          str = "€"
        }

        if (currency == 'USD') {
          str = "$"
        }

        if (currency == 'BRL') {
          str = "R$"
        }
      }

      return str;
    },
    unformatPrice(price) {
      return parseFloat(price.replace('R$ ', '').replace('.', '').replace(',', '.'))
    },
    formatOperation(transaction) {
      let operation = "";
      let vcm = "";

      if (transaction.operation == "new") {
        if (transaction.is_vcm == "1") {
          vcm = `<font class="corange" style="font-size: 24px; font-size: 16px;"> <a-tooltip> <template slot="title"> Milhas do VCM </template> • </a-tooltip> </font>`;
        }

        operation = `<font class="tag new">NOVO ${vcm}</font>`;
      }

      if (transaction.operation == "add") {
        operation = `<font class="tag add">ADIÇÃO</font>`;
      }

      if (transaction.operation == "subtract") {
        operation = `<font class="tag return">EMISSÃO</font>`;
      }

      if (transaction.operation == "canceled") {
        operation = `<font class="tag subtract">CANCELADO</font>`;
      }

      if (transaction.operation == "refund") {
        operation = `<font class="tag return">REEMBOLSO</font>`;
      }

      if (transaction.operation == "adjust") {
        operation = `<font class="tag adjust">AJUSTE</font>`;
      }

      if (transaction.operation == "purchase-canceled") {
        operation = `<font class="tag cancel-purchase">CANCELAMENTO DE COMPRA</font>`;
      }

      return operation;
    },
    dayWithZero(day) {
      return ('0' + day).slice(-2)
    },
    monthWithZero(month) {
      return ('0' + (month)).slice(-2)
    },
    removeStrSpecialChars(string) {
      return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    },
    formatMilesOperation(transaction) {
      let miles = "";
      if (transaction.operation == "new") {
        miles = `+${transaction.total_miles}`;
      }

      if (transaction.operation == "add") {
        miles = `+${transaction.total_miles}`;
      }

      if (transaction.operation == "return-miles") {
        miles = `+${transaction.total_miles}`;
      }

      if (transaction.operation == "canceled") {
        miles = `+${transaction.total_miles}`;
      }

      if (transaction.operation == "subtract") {
        miles = `-${transaction.total_miles}`;
      }
      return miles;
    },
    strToJson(arr) {
      return arr ? JSON.parse(arr) : [];
    }
  }
};