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
