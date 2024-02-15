"use client";
import * as Label from "@radix-ui/react-label";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useCurrencyInfo } from "../hooks/useCurrencyInfo";

export function Form() {
  const router = useRouter();
  const [dollarValue, setDollarValue] = useState("");
  const [stateTaxValue, setstateTaxValue] = useState("");
  const { stateTax, valueToReal, federalTaxCard, federalTaxCash } = useCurrencyInfo();
  const [isCash, setIsCash] = useState(true);

  function handleDollarValueChange(event: ChangeEvent<HTMLInputElement>) {
    setDollarValue(event.target.value)
  }

  function handleStateTaxValueChange(event: ChangeEvent<HTMLInputElement>) {
    setstateTaxValue(event.target.value)
  }

  function handleConverter(event: FormEvent) {
    calcValue();
    console.log("passou")
    router.push("/screens/conversionResult");
  }

  function calcValue() {
    const dollarValueNumber  = parseFloat(dollarValue.replace("$", ""))
    const percentageStateTax = (parseFloat(stateTaxValue.replace("%", "")) / 100);
    const percentageStateTaxValue = dollarValueNumber * percentageStateTax;
    if (isCash) {
      const totalValue = ((dollarValueNumber + percentageStateTaxValue) * federalTaxCash);
      console.log(federalTaxCash)
      valueToReal.current = totalValue.toString();
      return;
    }
    const totalValue = ((dollarValueNumber + percentageStateTaxValue) * federalTaxCard);
      valueToReal.current = totalValue.toString();
    return;
  }

  return (
    <>
      <form action="">
        <div className="flex flex-row gap-6">
          <div className="flex flex-col">
            <Label.Root className="text-black font-medium mb-1">Dólar</Label.Root>
            <CurrencyInput
              name="input-dollar"
              intlConfig={{ locale: "en-US", currency: "USD" }}
              allowDecimals={true}
              prefix="$"
              onChange={handleDollarValueChange}
              className="text-black p-4 border shadow-lg w-[168px] h-[56px] border-slate-300 rounded-sm"
            />
          </div>
          <div className="flex flex-col">
            <Label.Root className="text-black font-medium mb-1">
              Taxa do Estado
            </Label.Root>
            <CurrencyInput
              name="input-statetax"
              suffix="%"
              decimalsLimit={2}
              maxLength={4}
              defaultValue={0}
              onChange={handleStateTaxValueChange}
              fixedDecimalLength={2}
              className="text-black p-4 border shadow-lg w-[168px] h-[56px] border-slate-300 rounded-sm"
            />
          </div>
        </div>
        <div className="mt-8">
          <Label.Root className="text-black font-medium">
            Tipo de compra
          </Label.Root>
          <RadioGroup.Root
            className="flex flex-row mt-4 gap-6"
            aria-label="View density"
            defaultValue="cash"
          >
            <div className="flex items-center">
              <RadioGroup.Item
                className="bg-white w-[20px] h-[20px] outline-gray-200 rounded-full hover:bg-green-100 hover:outline-green-300 outline focus:outline-green-600 cursor-default"
                value="cash"
                id="r1"
              >
                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[14px] after:h-[14px] after:rounded-[100%] after:bg-green-600" />
              </RadioGroup.Item>
              <label className="text-black font-medium text-[15px] leading-none pl-[15px]">
                Dinheiro
              </label>
            </div>
            <div className="flex items-center">
              <RadioGroup.Item
                className="bg-white w-[20px] h-[20px] outline-gray-200 rounded-full hover:bg-green-100 hover:outline-green-300 outline focus:outline-green-600 cursor-default"
                value="card"
                id="r1"
              >
                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[14px] after:h-[14px] after:rounded-[100%] after:bg-green-600" />
              </RadioGroup.Item>
              <label className="text-black font-medium text-[15px] leading-none pl-[15px]">
                Cartão
              </label>
            </div>
          </RadioGroup.Root>
        </div>
        <button
          onClick={handleConverter}
          type="button"
          className="flex flex-row justify-center mt-8 gap-4 items-center w-[149px] text-base h-[56px] bg-green-500 p-4 rounded-lg"
        >
          <img src="converter.svg" alt="" />
          Converter
        </button>
      </form>
    </>
  );
}
