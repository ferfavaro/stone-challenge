'use client'
import Image from "next/image";
import { useCurrencyInfo } from "../hooks/useCurrencyInfo";

export function Header() {
  const { date } = useCurrencyInfo()

  return (
    <div className="flex flex-col gap-6 md:gap-0 lg:flex-row md:flex-row w-auto mb-24 md:justify-normal justify-center items-center">
      <img
        className="w-[163px] h-[81px]"
        src={"/images/logo-stone.png"}
        alt="logo-stone"
      />
      <div className="px-10">
        <h1 className="text-gray-800 text-center md:text-start text-[18px]">{date}</h1>
        <p className="text-gray-400 text-center md:text-start text-[14px]">Dados de câmbio disponibilizados pela Morningstar.</p>
      </div>
    </div>
  )
}