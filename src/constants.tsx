export const invoiceNumberOffset = 1;

export const customerAlm = [
  "Alm Engineering GmbH",
  "Am Westpark 7",
  "81373 München",
];
export const customerTwo = ["Foo Company", "Bar Plazza 2", "89073 Ulm"];

const text = "Software Engineering and Consulting";

export const projectDumpsterFire = (amount: number) => ({
  amount,
  description: "Distinguish dumpster fire",
  price: 8 * 100,
  amountUnit: "PT",
  text,
});

export const projectTwo = (amount: number) => ({
  amount,
  description: "I don't know what to do",
  price: 1200,
  amountUnit: "PT",
  text,
});

export const footer = [
  { left: "E-Mail:", right: "hello@gmail.com" },
  { left: "Telefon:", right: "+49 123 456789" },
  { left: "Steuernummer:", right: "1234/34344" },
  { left: "USt.-IdNr.:", right: "DE4534534" },
  { left: "Geschäftsführer:", right: "Jo Jo Jo Man" },
  { left: "Bank:", right: "Deutsche Schwindler Bank" },
  { left: "Kontoinhaber:", right: "Jo Jo Jo Man" },
  { left: "BIC:", right: "BYLADEM1111" },
  { left: "IBAN:", right: "DE2343243242342342343" },
];

export const billIssuer = ["Max Mustermann", "Superplazza 32", "89073 Ulm"];
