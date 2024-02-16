"use client"

import { Header } from "@/app/components/header";
import { useCurrencyInfo } from "@/app/hooks/useCurrencyInfo";
import { useRouter } from "next/navigation";

export default function ConversionResult() {
  const route = useRouter();
  const { valueToReal, paymentMethod, stateTax, dollarExchangeRate } = useCurrencyInfo();

  function handleBack() {
    route.push("/screens/formFields")
  }

  return (
    <div className="flex flex-col justify-center items-center md:justify-normal md:items-start">
      <button onClick={handleBack} className="flex shadow-lg font-semibold text-gray-800 border-2 flex-row justify-center gap-4 items-center w-[149px] text-base h-[56px] bg-white p-4 rounded-lg">
        <img className="" src="/arrow-left.svg" alt="" />
        Voltar
      </button>
      <div className="mt-8">
        <p className="text-gray-500 text-lg font-semibold">O resultado do cálculo é</p>
        <h1 className="text-green-500 mt-4 text-6xl font-bold">R${valueToReal.current ? valueToReal.current?.replace(".", ",") : "0,00"}</h1>
      </div>
      <div className="mt-10 space-y-2">
        <p className="text-gray-500 text-sm font-semibold">Compra no {paymentMethod.current} e taxa de <span className="font-normal">{stateTax.current ? stateTax.current : "0%"}</span></p>
        <p className="text-gray-500 text-sm font-semibold">Cotação do dolar: <span className="font-normal">$1,00 = R${dollarExchangeRate.replace(".", ",")}</span></p>
      </div>
    </div>
  )
}