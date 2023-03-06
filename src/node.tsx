/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable unicorn/prefer-module */
import ReactPDF from "@react-pdf/renderer";
import type { ReactNode } from "react";

import { invoiceNumberOffset } from "./constants";
import { invoices } from "./invoice";
import type { ProjectRow } from "./pdf";
import { InvoiceDocument } from "./pdf";

ReactPDF.Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: "bold",
    },
  ],
});

export type Invoice = {
  customer: string[];
  date: string;
  projects: ProjectRow[];
  reference?: string;
  text?: ReactNode;
};

const index = invoices.length - 1;
const invoice = invoices[index];

const invoiceNumber = invoiceNumberOffset + index;
const pdfDocument = (
  <InvoiceDocument
    additionalInfo={
      invoice.reference ? [["Referenznummer", invoice.reference]] : undefined
    }
    customer={invoice.customer}
    date={invoice.date}
    number={invoiceNumber}
    projects={invoice.projects}
  >
    {invoice.text}
  </InvoiceDocument>
);

const fileName = `Rechnung ${invoiceNumber} ${invoice.date}.pdf`;
console.log(`Generating ${fileName}`);

ReactPDF.render(pdfDocument, `${__dirname}/../invoices/${fileName}`);
