import React, { useContext, useState } from 'react';
import "./DonationModul.css"
import axios from 'axios';
import DonationData from '../models/DonationData';
import Header from './Header';
import AdminContext from '../context/AdminContext';
import DonationTypes from '../constants/DonationTypes';

interface DonationModulProps {
  onNewDonation: (donation: DonationData) => void;
}

function DonationModul(props: DonationModulProps) {
  const { onNewDonation } = props;
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const {isAdmin}=useContext(AdminContext)

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = { 
      tip: event.target.elements.tip.value,
      vrijednost: event.target.elements.value.value,
      opis: event.target.elements.opis.value ,
      vrsta: isAdmin ? DonationTypes.TRAZIM: DonationTypes.NUDIM
   }
  axios
        .post("http://localhost:3001/donacije", requestBody)
        .then((res) =>  onNewDonation(res.data));
    
    setType('');
    setValue('');
    setDescription('');
  };

  return (
    <div className="form-window">
      <Header/>
      <h2>Nova donacija</h2>
      <form onSubmit={handleSubmit}>
        <div className='newDonation'>
        <label  >
          Tip:
          <input  required className='newType' type="text" id="tip" value={type} onChange={(event) => setType(event.target.value)} />
        </label>
        <label>
          Vrijednost:
          <input required className='newType' type="text" id="value" value={value} onChange={(event) => setValue(event.target.value)} />
        </label>
        <label className='opis'>
          Opis:
          <textarea required className='newType' id='opis' value={description} onChange={(event) => setDescription(event.target.value)} />
        </label>
        <button className='submitDonation' type="submit">Dodaj donaciju</button>
        </div>
      </form>
    </div>
  );
}

export default DonationModul;