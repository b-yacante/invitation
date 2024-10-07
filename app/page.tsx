"use client";

import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import Image from "next/image";
import { Updock, Bodoni_Moda } from "next/font/google";

const updock = Updock({ weight: ["400"], subsets: ["latin"] });
const bodoni = Bodoni_Moda({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <div className="grid min-h-screen bg-[#FBF9F1]">
      {/* background */}
      <div className="fixed min-h-screen min-w-full opacity-90">
        <Image
          src="invitation.svg"
          alt="invitation"
          layout="fill"
          objectFit="contain"
          quality={100}
        />
      </div>
      <main className="flex flex-col items-center justify-center">
        <div className={`${updock.className} text-3xl`}>
          <div>Te invito</div>
        </div>
        <div className="flex justify-center items-center max-h-24 space-x-2">
          <p className={`${updock.className} text-xl translate-y-3`}>a</p>
          <div className={`text-[150px] ${updock.className}`}>15</div>
          <p className={`${updock.className} text-xl translate-y-3`}>mis</p>
        </div>

        <div
          className={`flex justify-center items-center text-base ${bodoni.className} mt-12`}
        >
          {/* Dia */}
          <div className="flex justify-center items-center max-h-10 border-dashed border-y-2 border-[#406086] px-1">
            <p>SÁBADO</p>
          </div>
          <div className="grid place-items-center gap-y-2">
            <div>DICIEMBRE</div>
            <div className="h-14 w-14 text-3xl bg-slate-200 rounded-full grid place-items-center">
              14
            </div>
            {/* Ubicacion */}
            <Link
              href="https://www.google.com/maps?q=-31.6434939,-68.5900726&z=17&hl=es"
              target="_blank"
              className={`flex justify-center items-center translate-x-1`}
            >
              <p className="text-base">SALÓN</p>
              <MdArrowOutward className="text-slate-400 text-xs" />
            </Link>
          </div>
          {/* Horario */}
          <div className="flex justify-center items-center max-h-10 border-dashed border-y-2 border-[#406086] px-1">
            9:30 PM
          </div>
        </div>
      </main>
    </div>
  );
}
