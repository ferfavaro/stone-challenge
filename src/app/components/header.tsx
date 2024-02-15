'use client'
import Image from "next/image";
import { useCurrencyInfo } from "../hooks/useCurrencyInfo";

export function Header() {
  const { date } = useCurrencyInfo()

  return (
    <div className="flex bg-white flex-row w-auto mb-24 items-center">
      <Image
        src={"/images/logo-stone.png"}
        priority={true}
        width={163}
        height={81}
        alt="logo-stone"
      />
      <div className="px-10">
        <h1 className="text-gray-800 text-[18px]">{date}</h1>
        <p className="text-gray-400 text-[14px]">Dados de câmbio disponibilizados pela Morningstar.</p>
      </div>
    </div>
  )
}