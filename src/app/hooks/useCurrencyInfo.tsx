"use client"
import axios from "axios";
import React, { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';
import { format, set } from "date-fns";
import { ptBR } from 'date-fns/locale'

interface IProps {
  children: ReactNode;
}

interface CurrencyInfoContextData {
  date: string;
  valueToReal: React.MutableRefObject<string | null>;
  stateTax: React.MutableRefObject<string>;
  federalTaxCash: number;
  federalTaxCard: number;
  dollarExchangeRate: string;
  paymentMethod: React.MutableRefObject<string>;
}

const CurrencyInfoContext = createContext<CurrencyInfoContextData>({} as CurrencyInfoContextData);

export default function CurrencyInfoProvider({ children }: IProps) {
  const [date, setDate] = useState("")
  const valueToReal = useRef<string | null>("");
  const stateTax = useRef<string>("");
  const [dollarExchangeRate, setDollarExchangeRate] = useState("");
  const paymentMethod = useRef<string>("");
  const [federalTaxCash, setFederalTaxCash] = useState(0)
  const [federalTaxCard, setFederalTaxCard] = useState(0)

  function calcFees(conversionTax: string) {
    const conversionTaxNumber = parseFloat(conversionTax)
    setDollarExchangeRate(conversionTaxNumber.toFixed(2))
    setFederalTaxCash(conversionTaxNumber + (conversionTaxNumber * 0.011));
    setFederalTaxCard(conversionTaxNumber + (conversionTaxNumber * 0.064));
  }

  useEffect(() => {
    async function getCurrencyInfo() {
      try {
        const response = await axios.get("https://economia.awesomeapi.com.br/json/last/USD-BRL")
        if (response.data && response.data.USDBRL) {
          const dateUTC = response.data.USDBRL.create_date;
          const date = format(dateUTC, "PPP", {locale: ptBR})
          const hour = format(dateUTC, "p")
          const formatedDate = date + " | " + hour
          setDate(formatedDate)

          calcFees(response.data.USDBRL.bid)
        }
      } catch (error) {
        console.error("Erro na busca de informações sobre a moeda!")
      }
    }
    getCurrencyInfo();
  }, []);

  return (
    <CurrencyInfoContext.Provider value={{ date, valueToReal, stateTax, federalTaxCash, federalTaxCard, paymentMethod, dollarExchangeRate}}>
      {children}
    </CurrencyInfoContext.Provider>
  )
}

export function useCurrencyInfo() {
  return useContext(CurrencyInfoContext);
}