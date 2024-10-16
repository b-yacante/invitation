'use client';

import Link from 'next/link';
import { MdArrowOutward } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { Updock, Bodoni_Moda } from 'next/font/google';
import ConfirmDialog from './components/confirm-invitation-dialog';
import { useState } from 'react';
import RegaloDialog from './components/regalo-dialog';

const updock = Updock({ weight: ['400'], subsets: ['latin'] });
const bodoni = Bodoni_Moda({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  const [openConfirmDialog, setConfirmDialog] = useState(false);
  const [openRegaloDialog, setRegaloDialog] = useState(false);
  const [confirmacion, setConfirmacion] = useState(false);

  function AsistenciaConfirmada() {
    setConfirmDialog(false);
    setConfirmacion(true);
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF9F1]">
      {/* background */}
      <div className="relative h-full min-w-full opacity-90">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="invitation.svg"
          alt="invitation"
          className="absolute top-0 h-auto object-contain border-solid border-slate-500 border-2"
        />
      </div>
      <main className="flex flex-col items-center justify-center py-12 md:mt-20">
        <div className={`${updock.className} text-3xl`}>
          <div>Te invito</div>
        </div>
        <div className="flex justify-center items-center max-h-24 space-x-2">
          <p className={`${updock.className} text-xl translate-y-3`}>a</p>
          <div className={`text-[150px] ${updock.className}`}>15</div>
          <p className={`${updock.className} text-xl translate-y-3`}>mis</p>
        </div>

        <div
          className={`flex justify-center items-center text-base ${bodoni.className} mt-8`}
        >
          {/* Dia */}
          <div className="flex justify-center items-center max-h-10 border-solid border-y-2 border-[#406086] px-1">
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
          <div className="flex justify-center items-center max-h-10 border-solid border-y-2 border-[#406086] px-1">
            9:30 PM
          </div>
        </div>
        <div
          className={`grid place-items-center ${updock.className} pt-6 text-3xl`}
        >
          Formal
        </div>
      </main>
      <div
        className={`flex flex-col justify-end items-center max-h-60 grow mt-20 pb-6 ${bodoni.className}`}
      >
        <button
          onClick={() => setRegaloDialog(true)}
          className="flex space-x-2 mb-5 px-4 py-2 bg-slate-300 rounded-2xl shadow-md"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="gift.svg" alt="gift" className="h-6 w-6 shake-animation" />
          <p className="text-lg font-extrabold">Regalo</p>
        </button>
        <button
          onClick={() => setConfirmDialog(true)}
          disabled={confirmacion}
          className={`font-extrabold bg-gradient-to-br w-10/12 ${confirmacion ? 'from-green-200 to-green-300 text-green-700 border-green-700/60 ' : 'from-slate-200 to-slate-300 text-[#406086] border-[#406086]/60 active:from-slate-100'} px-4 py-3 rounded-xl border-double border-4  drop-shadow-lg md:w-1/2`}
        >
          <p className="flex w-full text-center justify-center items-center">
            {confirmacion ? 'Asistencia Confirmada' : 'Confirmar Asistencia'}
            {confirmacion && <FaCheck className='ml-2' size={18} />}
          </p>
        </button>
      </div>
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setConfirmDialog(false)}
        complete={() => AsistenciaConfirmada()}
      />
      <RegaloDialog
        open={openRegaloDialog}
        onClose={() => setRegaloDialog(false)}
      />
    </div>
  );
}
