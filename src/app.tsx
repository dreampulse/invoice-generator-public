import { PDFViewer } from "@react-pdf/renderer";
import React from "react";

import { InvoiceExample } from "./pdf";

export function App() {
  return (
    <main>
      <PDFViewer>
        <InvoiceExample />
      </PDFViewer>
    </main>
  );
}
