'use client';
import { IoClose } from 'react-icons/io5';
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';
import { useState } from 'react';
import handler from '../api/update-sheet';

export interface ConfirmInvitationProps {
  open: boolean;
  onClose: () => void;
}

export interface IPerson {
  name: string;
  amount: string;
}

export default function ConfirmDialog(props: ConfirmInvitationProps) {
  const [cantidadPersonas, setCantidadPersonas] = useState(1);
  const [newPerson, setNewPerson] = useState<IPerson>({ name: '', amount: '' });
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  function buttonCantidadPersonas(type: 'minus' | 'plus') {
    if (type == 'plus') setCantidadPersonas(cantidadPersonas + 1);
    if (type == 'minus' && cantidadPersonas > 1) {
      setCantidadPersonas(cantidadPersonas - 1);
    }
  }

  function confirmDialog() {
    if (inputValue == '') return;
    setNewPerson({ name: inputValue, amount: cantidadPersonas.toString() });
    AddPerson();
  }

  async function AddPerson() {
    if (newPerson.name == '') return;
    if (newPerson.amount == '') return;
    const value = [newPerson.name, newPerson.amount];
    try {
      setLoading(true);
      const res = await fetch('api/update-sheet');
      const data = await res.json();
      //   handler(value);

      //   await fetch('/api/update-sheet', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ values: value }),
      //   });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.warn(error);
    }
  }

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
        <form action="" className="w-full px-6 space-y-2">
          <div className="flex flex-col space-y-1">
            <p>Nombre y Apellido</p>
            <input
              value={inputValue}
              onChange={handleInputChange}
              type="text"
              className="w-full rounded-md px-3 h-8 border-2 border-solid border-[#406086]/20"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <p>Cantidad de personas</p>
            <div className="flex ml-2 space-x-4">
              <a
                onClick={() => buttonCantidadPersonas('minus')}
                className="text-3xl text-white bg-slate-500/50 rounded-full shadow active:bg-slate-500/30"
              >
                <CiCircleMinus size={32} />
              </a>
              <p className="text-xl">{cantidadPersonas}</p>
              <a
                onClick={() => buttonCantidadPersonas('plus')}
                className="text-3xl text-white bg-slate-500/50 rounded-full shadow active:bg-slate-500/30"
              >
                <CiCirclePlus size={32} />
              </a>
            </div>
          </div>
        </form>
        <button
          onClick={confirmDialog}
          disabled={loading}
          className="px-4 py-3 bg-slate-300 rounded-lg w-10/12 grid place-items-center"
        >
          {loading && (
            <div
              className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-slate-500 rounded-full"
              role="status"
              aria-label="loading"
            ></div>
          )}
          <p className={loading ? 'hidden' : 'block'}>Confirmar</p>
        </button>
      </div>
      <div className="fixed top-0 left-0 h-screen w-screen bg-slate-500/50 z-0"></div>
    </div>
  );
}
