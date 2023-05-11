import React, { useState, useEffect } from "react";
import "./NewAnimal.css"
import Header from "./Header";
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NewAnimalData from "../models/NewAnimalData";
interface NewAnimalProps{
  activeItem?:NewAnimalData;
  
}

function NewAnimal(props:NewAnimalProps) {
  const {activeItem}=props
  const [name, setName] = useState(activeItem?.ime ||"");
  const [type, setType] = useState(activeItem?.tip ||"");
  const [age, setAge] = useState(activeItem?.godine ||"");
  const [description, setDescription] = useState(activeItem?.opis ||"");
  const [chip, setChip] = useState(activeItem?.chip ||false);
  const [taken,setTaken]=useState(activeItem?.udomljen||false)
  const [date, setDate] = useState<Date | null>(new Date);


  const handleSubmit = (event) => {
    event.preventDefault();
    
    const requestBody: NewAnimalData = { 
        ime: event.target.elements.name.value,
        tip: event.target.elements.vrsta.value,
        opis: event.target.elements.opis.value,
        godine: event.target.elements.godine.value,
        chip:event.target.elements.chip.checked,
        datum:event.target.elements.date.value, 
        udomljen:event.target.elements.udomljen.checked?true:false, 
        
     }

     
    axios.post("http://localhost:3001/zivotinje", requestBody);

    setName('');
    setType('');
    setAge("");
    setDescription("")
    setChip(false)
    setDate(null)
    setTaken(false)
  };

    return (
    <div className="wholeAnimal">
    <Header/>
    
    <form onSubmit={handleSubmit}>
      <label className="nameAnimal">
        Ime:
        <input required className= "inputAnimal " id="name" name="name" type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <br />
      <h4 className="headType">Vrsta</h4>
      <label className="filters">
        
        <br />
        <div className="radios">
        Ostalo
        <input className="typeRadio" type="radio" value="ostalo" name="vrsta" id="vrsta" checked={type === "ostalo"} onChange={(event) => setType(event.target.value)} />
        <label className="radioCat">
        <input className="typeRadio" type="radio" value="macka" name="vrsta" id="vrsta" checked={type === "macka"} onChange={(event) => setType(event.target.value)} />
        Mačka
        
        </label>

        Pas
        <input className="typeRadio" type="radio" value="pas" name="vrsta" id="vrsta" checked={type === "pas"} onChange={(event) => setType(event.target.value)} />
        
        
        
        </div>

      </label>
      <div className="chip">
      <input className="chipCheckbox" id="chip" type="checkbox" checked={chip} onChange={(event) => setChip(event.target.checked)} />
            Čipiran
            </div>
            <div className="datum">
              <p>Pregled:</p>
              <DatePicker selected={date} id="date" className="calendar" onChange={(event) =>{
                console.log(event)
                setDate(event)}} > Datum pregleda </DatePicker>
            </div>
      <br />
      <div className="udomljavanje">
      <input className="takenCheckbox" id="udomljen" type="checkbox" checked={taken} onChange={(event) => setTaken(event.target.checked)} />
                <span>Udomljen</span>
            </div>
      <label className="age">
        Godine:
        <input required className="inputAge" type="number" id="godine" name="godine" value={age} onChange={(event) => setAge(event.target.value)} />
      </label>
      <br />
      <label className="description">
        Opis:
        <textarea className="descriptionBox" id="opis" name="opis" value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <br />
      <div className="buttonSave">
      <button className="btn btn-danger" type="submit">Spremi</button>
      
      </div>
      
    </form>
    </div>
  );
  }

export default NewAnimal;