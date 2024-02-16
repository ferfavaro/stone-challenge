import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import CurrencyInfoProvider from "./hooks/useCurrencyInfo";
import { Header } from "./components/header";

const roboto = Roboto({
  weight: ['300','400', "500", "700", "900"],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Challenge - Stone",
  description: "Desenvolvido em live junto com o chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
      <img className="w-screen h-screen invisible md:visible -z-10 flex absolute" src={"/images/background-money.png"} alt="" />
      <CurrencyInfoProvider>
      <div className="p-6 lg:p-16 md:p-8">
        <Header />
            {children}
      </div>
      </CurrencyInfoProvider>
      </body>
    </html>
  );
}
