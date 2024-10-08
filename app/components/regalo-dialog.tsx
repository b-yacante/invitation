'use client';

import { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

export interface RegaloDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function RegaloDialog(props: RegaloDialogProps) {
  const [copySuccess, setCopySuccess] = useState('');

  const alias = 'Este es el texto a copiar';
  const cbu = 'Este es el texto a copiar';

  const copyAlias = async () => {
    try {
      await navigator.clipboard.writeText(alias);
      setCopySuccess('Alias copiado!');
      setTimeout(() => {
        setCopySuccess('');
      }, 3000);
    } catch (err) {
      setCopySuccess('Error al copiar el Alias');
    }
  };
  const copyCBU = async () => {
    try {
      await navigator.clipboard.writeText(cbu);
      setCopySuccess('CBU copiado!');
      setTimeout(() => {
        setCopySuccess('');
      }, 3000);
    } catch (err) {
      setCopySuccess('Error al copiar el CBU');
    }
  };

  return (
    <div className={props.open ? 'block' : 'hidden'}>
      <div
        className={
          'flex flex-col justify-center space-y-4 items-center bg-[#fbf9f1] w-10/12 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 rounded-2xl p-2 pb-10'
        }
      >
        <div className="flex justify-start items-center w-full max-h-7 ">
          <button
            onClick={props.onClose}
            className="p-1 bg-slate-100 active:bg-slate-300 rounded-full"
          >
            <IoClose size={24} />
          </button>
        </div>
        <div className="flex items-center justify-around w-full h-12 p-2">
          <div>Alias</div>
          <a
            onClick={copyAlias}
            className="bg-blue-500 text-white py-2 p-2 rounded-lg active:bg-blue-700"
          >
            <FaRegCopy size={20} />
          </a>
        </div>
        <div className="flex items-center justify-around h-12 w-full pa-4">
          <div>CBU</div>
          <a
            onClick={copyCBU}
            className="bg-blue-500 text-white py-2 p-2 rounded-lg active:bg-blue-700"
          >
            <FaRegCopy size={20} />
          </a>
        </div>
      </div>
      <div className="fixed top-0 left-0 h-screen w-screen bg-slate-500/50 z-0">
        {copySuccess && (
          <div className="fixed flex justify-center items-center space-x-3 bottom-0 w-full text-green-500 bg-slate-50 font-bold text-xl px-4 py-4">
            <FaCheck />
            <p>{copySuccess}</p>
          </div>
        )}
      </div>
    </div>
  );
}
