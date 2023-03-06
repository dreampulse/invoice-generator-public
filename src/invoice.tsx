/* eslint-disable react/jsx-key */

import { Text } from "@react-pdf/renderer";

import {
  // customerAlm,
  customerTwo,
  projectDumpsterFire,
  projectTwo,
} from "./constants";
import type { Invoice } from "./node";

export const invoices: Invoice[] = [
  {
    customer: customerTwo,
    date: "2022-06",
    projects: [projectTwo(3), projectDumpsterFire(12.5)],
    text: <Text>This is an additional optional text on the invoice.</Text>,
  },
  // {
  //   customer: customerAlm,
  //   date: "2022-07",
  //   projects: [projectTwo(3), projectDumpsterFire(12.5)],
  // },

  // Add here each invoice after another
];
