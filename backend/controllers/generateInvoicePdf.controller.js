const Models = require("../models");
const moment = require("moment");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const PDFDocument = require("pdfkit");
const fs = require("fs");
require("dotenv").config();
const { formatCurrency, formatDateCustom, formatDateTimeCustom } = require("../utils/otherUtility.js");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image("./assets/logo.png", 50, 45, { width: 50 })
    .fillColor("#354252")
    .fontSize(20)
    .text(process.env.SITE_TITLE, 110, 57)
    .fontSize(10)
    .text(process.env.SITE_TITLE, 200, 50, { align: "right" })
    .text(process.env.ADDRESS_1, 200, 65, { align: "right" })
    .text(process.env.ADDRESS_2, 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);
  doc.fillColor("#444444").fontSize(20).text("Customer", 297, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;
  const parsedTimestamp = moment(invoice.created_at);
  const formattedTimestamp = parsedTimestamp.format("DD.MM.YYYY HH:mm:ss");
  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formattedTimestamp, 150, customerInformationTop + 15)
    .text("Transaction Id:", 50, customerInformationTop + 35)
    .text(invoice.transaction_id, 120, customerInformationTop + 35)
    // .text("Balance Due:", 50, customerInformationTop + 30)
    // .text(
    //   // formatCurrency(invoice.subtotal - invoice.paid),
    //   formatCurrency(invoice.paid),
    //   150,
    //   customerInformationTop + 30
    // )

    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      invoice.shipping.city +
        ", " +
        invoice.shipping.postal_code +
        ", " +
        invoice.shipping.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 290;

  doc.font("Helvetica-Bold");
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  if (invoice.order_id) {
    generateTableRow(
      doc,
      invoiceTableTop,
      "FairLink",
      "Transaction",
      "Status",
      "Unit price",
      "",
      "Total"
    );
    for (i = 0; i < invoice.items.length; i++) {
      const item = invoice.items[i];
      const position = invoiceTableTop + (i + 1) * 30;
      generateTableRow(
        doc,
        position,
        item.domain.domain_name,
        "From wallet",
        invoice.status,
        formatCurrency(item.price),
        "",
        formatCurrency(item.total_price),
        invoice.order_id
      );

      generateHr(doc, position + 20);
    }
  } else {
    generateTableRow(
      doc,
      invoiceTableTop,
      "Type",
      "Transaction",
      "Status",
      "",
      "Amount"
    );
    for (i = 0; i < invoice.items.length; i++) {
      const item = invoice.items[i];
      const position = invoiceTableTop + (i + 1) * 30;
      generateTableRow(
        doc,
        position,
        item.transaction_type,
        item.transaction_id,
        item.status,
        "",
        formatCurrency(item.amount)
      );

      generateHr(doc, position + 20);
    }
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  const subtotal = parseFloat(invoice.subtotal) || 0;
  const discount = parseFloat(invoice.discount) || 0;
  const cSubtotal = subtotal + discount;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "",
    "Subtotal",
    formatCurrency(cSubtotal)
  );

  const paidToDatePosition = subtotalPosition + 30;
  // generateTableRow(
  //   doc,
  //   paidToDatePosition,
  //   "",
  //   "",
  //   "",
  //   "Discount",
  //   formatCurrency(parseFloat(invoice.discount) || 0)
  // );

  // const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "",
    "Total",
    formatCurrency(invoice.subtotal - invoice.paid)
  );
  doc.font("Helvetica");
  generateHr(doc, 480);
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      `Thank you for being part of our ${process.env.SITE_TITLE} family.`,
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal,
  total=null,
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
    if(total){
      doc.text(total,0,y, { align: "right"});
    }
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

// function formatCurrency(cents) {
//   // return "$" + (cents / 100).toFixed(2);
//   return "€" + parseFloat(cents).toFixed(2);
// }

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

exports.invoidePdfGenerate = async (req, res) => {
  try {
    const user_id = req.userId;
    const { id, order_id } = req.body;
    let pdfData;
    const getUser = await Models.Users.findOne({ where: { id: user_id } });
    const transactionData = await Models.Transactions.findAll({
      where: { id },
    });
    if (order_id) {
      let wheres = { id: order_id };
      const baseQuery = {
        include: [
          {
            model: Models.publisherDomain,
            as: "domain",
            attributes: { exclude: ["updated_at", "created_at", "id"] },
          },
        ],
        where: wheres,
      };
      pdfData = await Models.newOrder.findAll(baseQuery);
    } else {
      pdfData = transactionData;
    }
    if (transactionData) {
      const invoice = {
        shipping: {
          name: `${getUser.firstName} ${getUser.lastName}`,
          address: getUser.address,
          city: getUser.city,
          state: getUser.city,
          country: getUser.country,
          postal_code: getUser.postal_code,
        },
        items: pdfData,
        subtotal: transactionData[0].dataValues.amount,
        paid: 0,
        discount: 0,
        order_id: order_id,
        invoice_nr: `#${order_id ? order_id : id}`,
        created_at: transactionData[0].dataValues.created_at,
        transaction_id: transactionData[0].dataValues.transaction_id,
        status:transactionData[0].dataValues.status,
      };

      createInvoice(invoice, "./assets/invoices/invoice.pdf");
      return res.status(200).send({
        status: true,
        message: "Pdf generated success",
        filepath: "assets/invoices/invoice.pdf",
      });
    }
    return res.status(404).send({ status: false, message: "Order not found." });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Invoice can not generate, an error occurend",
      error: err.message,
    });
  }
};
