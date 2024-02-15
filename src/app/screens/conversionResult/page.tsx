"use client"

import { Header } from "@/app/components/header";
import { useCurrencyInfo } from "@/app/hooks/useCurrencyInfo";
import { useRouter } from "next/navigation";

export default function ConversionResult() {
  const route = useRouter();
  const { valueToReal } = useCurrencyInfo();

  function handleBack() {
    route.push("/screens/formFields")
  }

  return (
    <div className="bg-white w-full p-12 h-screen">
      <Header />
        <button onClick={handleBack} className="flex shadow-lg font-semibold text-gray-800 border-2 flex-row justify-center gap-4 items-center w-[149px] text-base h-[56px] bg-white p-4 rounded-lg">
          <img className="" src="/arrow-left.svg" alt="" />
          Voltar
        </button>
        <p className="text-gray-800 font-semibold">O resultado do cálculo é</p>
        <h1 className="text-gray-500 font-semibold">R${valueToReal.current}</h1>
        {/* <p className="text-gray-500 font-semibold">Compra no {paymentType} e taxa de {stateTax}</p>
        <p className="text-gray-500 font-semibold">Cotação do dolar: $1,00 = {dollarExchangeRate}</p> */}
    </div>
  )
}