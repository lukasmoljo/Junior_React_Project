import React from "react";

import axios from "axios";
import "./Modal.css"
import NewAnimal from "./NewAnimal";
import NewAnimalData from "../models/NewAnimalData";

interface ModalProps {
    data: NewAnimalData;
    close: () => void;

}

const Modal = (props: ModalProps) =>{
    const { data, close } = props;
    

    const onSubmit = (event) =>{
        const requestBody = { 
            ime: event.target.elements.name.value,
            tip: event.target.elements.vrsta.value,
            opis: event.target.elements.opis.value,
            godine: event.target.elements.godine.value,
            čip:event.target.elements.chip.checked,
            datum:event.target.elements.date.value, 
            udomljen:event.target.elements.udomljen.checked?true:false,
                
         }
        axios
            .patch(`http://localhost:3001/zivotinje/${item.id}`, requestBody)
  };
  return(
        <div className="modal">
            <form onSubmit={onSubmit} className="adding" id="modal">
            
                <NewAnimal activeItem={data}/>
                <button className="cancel" onClick={close}>Cancel</button>
            </form>
        </div>

  )}
  export default Modal;
