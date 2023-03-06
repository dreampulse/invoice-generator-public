/* eslint-disable unicorn/prevent-abbreviations */
import "dayjs/locale/de";

import { Document, Page, Text, View } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import dayjs from "dayjs";

import { billIssuer, footer } from "./constants";

dayjs.locale("de");

const formatEur = (price: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
    price
  );

const InfoRow = ({
  left,
  right,
  style,
}: {
  left: string;
  right: string;
  style?: Style;
}) => (
  <View
    style={{
      flexDirection: "row",
      padding: "3 6",
      ...style,
    }}
  >
    <Text style={{ width: "50%" }}>{left}</Text>
    <Text style={{ width: "50%", textAlign: "right" }}>{right}</Text>
  </View>
);

const PriceRow = ({
  amount,
  children,
  description,
  price,
  style,
  total,
}: {
  amount: string;
  children?: string;
  price: string;
  total: string;
  description: string;
  style?: Style;
}) => (
  <View style={{ flexDirection: "row" }}>
    <View
      style={{
        width: "10.5cm",
        padding: "4 6",
        ...style,
      }}
    >
      <Text>{description}</Text>
      {children && (
        <Text
          style={{
            color: "gray",
            fontSize: 10,
            marginTop: 2,
          }}
        >
          {children}
        </Text>
      )}
    </View>
    <Text
      style={{
        textAlign: "right",
        width: "2cm",
        padding: "4 6",
        ...style,
      }}
    >
      {amount}
    </Text>
    <Text
      style={{
        textAlign: "right",
        width: "2.5cm",
        padding: "4 6",
        ...style,
      }}
    >
      {price}
    </Text>
    <Text
      style={{
        textAlign: "right",
        width: "3cm",
        padding: "4 6",
        ...style,
      }}
    >
      {total}
    </Text>
  </View>
);

const FooterTuple = ({ left, right }: { left: string; right: string }) => (
  <View style={{ flexDirection: "row", margin: "2 4" }}>
    <Text style={{ fontWeight: "bold" }}>{left} </Text>
    <Text style={{ color: "grey" }}>{right}</Text>
  </View>
);

const AddressView = View;

export type ProjectRow = {
  amount: number;
  amountUnit: string;
  text: string;
  description: string;
  price: number;
};

type InvoiceProps = {
  children?: React.ReactNode;
  number: number;
  date: string;
  customer: string[];
  additionalInfo?: [string, string][];
  projects: ProjectRow[];
};

export const InvoiceDocument = ({
  additionalInfo,
  children,
  customer,
  date,
  number,
  projects,
}: InvoiceProps) => {
  const day = dayjs(date);
  const invoiceDate = day.endOf("month").format("DD.MM.YY");
  const invoiceDuration = `${day.format("DD.MM.YY")} bis ${day
    .endOf("month")
    .format("DD.MM.YY")}`;
  const invoicePayDay = day.endOf("month").add(1, "month").format("DD.MM.YY");

  const subTotal = projects.reduce(
    (acc, { amount, price }) => acc + price * amount,
    0
  );
  const vat = subTotal * 0.19;
  const total = subTotal + vat;

  return (
    <Document
      author={billIssuer.length > 0 ? billIssuer[0] : "Max Mustermann"}
      title={`Rechnung #${number}`}
    >
      <Page
        size="A4"
        style={{
          fontFamily: "Open Sans",
          flexDirection: "column",
          fontSize: 12,
          padding: "2cm",
          flexGrow: 0,
        }}
      >
        <Text
          fixed
          style={{
            position: "absolute",
            top: "2cm",
            right: "2cm",
            fontSize: 18,
          }}
        >
          Rechnung #{number}
        </Text>
        <View
          style={{
            flexGrow: 0,
            marginTop: "3cm",
            marginBottom: "2cm",
            height: "5.5cm",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexGrow: 1,
              width: "100%",
            }}
          >
            <AddressView
              style={{
                flexGrow: 1,
                flexShrink: 0,
                paddingLeft: "0.5cm",
                // border: "1px solid red",
              }}
            >
              <Text
                key="jonathan"
                style={{
                  fontSize: 8,
                  color: "grey",
                  marginBottom: "0.2cm",
                }}
              >
                {billIssuer.join(" - ")}
              </Text>
              {customer.map((line, index) => (
                <Text
                  key={index}
                  style={
                    index === 0
                      ? {
                          fontWeight: "bold",
                        }
                      : {}
                  }
                >
                  {line}
                </Text>
              ))}
            </AddressView>
            <View
              style={{
                flexShrink: 0,
                fontSize: 10,
                alignSelf: "flex-end",
                width: "9cm",
                // border: "1px solid red",
                paddingLeft: "0.5cm",
              }}
            >
              <InfoRow left="Rechnungsnummer" right={String(number)} />
              <InfoRow left="Rechnungsdatum" right={invoiceDate} />
              <InfoRow left="Fälligkeit" right={invoicePayDay} />
              <InfoRow left="Leistungszeitraum" right={invoiceDuration} />

              {additionalInfo?.map(([left, right]) => (
                <InfoRow key={left} left={left} right={right} />
              ))}
            </View>
          </View>
        </View>
        <View style={{ flexGrow: 0 }}>
          {/* <Text style={{ fontSize: 18, marginBottom: 12 }}>Rechnung</Text> */}

          <PriceRow
            amount="Menge"
            description="Beschreibung"
            price="Preis"
            style={{ backgroundColor: "lightgrey" }}
            total="Betrag"
          />

          {projects.map((row, index) => (
            <PriceRow
              amount={`${row.amount} ${row.amountUnit}`}
              description={row.description}
              key={index}
              price={formatEur(row.price)}
              style={{ borderBottom: "1px solid lightgrey" }}
              total={formatEur(row.amount * row.price)}
            >
              {row.text}
            </PriceRow>
          ))}
        </View>

        <View
          style={{
            flexShrink: 0,
            fontSize: 10,
            alignSelf: "flex-end",
            width: "9cm",
            // border: "1px solid red",
            marginTop: "1cm",
            paddingLeft: "0.5cm",
          }}
        >
          <InfoRow
            left="Zwischensumme"
            right={formatEur(subTotal)}
            style={{
              padding: "4 6",
            }}
          />
          <InfoRow
            left="USt. 19%"
            right={formatEur(vat)}
            style={{
              padding: "4 6",
            }}
          />
          <InfoRow
            left="Gesamt"
            right={formatEur(total)}
            style={{
              backgroundColor: "lightgrey",
              fontWeight: "bold",
              padding: "4 6",
            }}
          />
        </View>

        <View style={{ marginTop: "1cm", fontSize: 10 }}>{children}</View>

        <View
          fixed
          style={{
            position: "absolute",
            bottom: "1.5cm",
            left: "2cm",
            // border: "1px solid red",
            right: "2cm",
            flexWrap: "wrap",
            flexDirection: "row",
            fontSize: 8,
            justifyContent: "center",
          }}
        >
          {footer.map(({ left, right }, index) => (
            <FooterTuple key={index} left={left} right={right} />
          ))}
        </View>
      </Page>
    </Document>
  );
};
