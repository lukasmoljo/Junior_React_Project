import NewAnimalData from "../models/NewAnimalData";
import AdminContext from "../context/AdminContext";
import {useContext} from 'react';
import axios from "axios";

import Modal from "./Modal"
import { useState } from "react";

interface MakingList {
    data: NewAnimalData[];
    onDeleteAnimal: (id: number) => void;
    onUpdateAnimal: (id: number, udomljen: boolean) => void;

}

const MakingList = (props: MakingList) =>{
    const { data,onDeleteAnimal, onUpdateAnimal } = props;
    const {isAdmin}= useContext(AdminContext)
    const [showModal, setShowModal]=useState(false)
    const [activeItem, setAciteItem] = useState<NewAnimalData | undefined>(undefined);
 console.log(showModal)
    const handleAnimal= (id: number)=>{

      const url_delete = `http://localhost:3001/zivotinje/${id}`;
      axios.delete(url_delete)
      .then(() => {
        
        onDeleteAnimal(id)
        
      })}
    const takeAnimal= (id:number)=>{
      axios.patch(`http://localhost:3001/zivotinje/${id}`, {
      udomljen:true,
    })
    .then(() => 
      onUpdateAnimal(id, true)
      )

    }

    

    return (
      
        <div className="allList">
         
          {data.map(item => {

            const onEdit = () => {
              setShowModal(true)
              setAciteItem(item)
            }
            return (
            <div key={item.id} className={item.udomljen? "takenAnimals":"untakenAnimals"}>
              <p className="listTitle">IME:{item.ime}</p>
              <p>VRSTA: {item.tip}</p>
              <p>GODINE: {item.godine}</p>
              <p>OPIS: {item.opis}</p>
              { (item.chip) ? <p >ČIPIRAN: DA</p> :<p>ČIPIRAN: NE</p>}
              { (item.udomljen) ? <p >UDOMLJEN: DA</p> :<p>UDOMLJEN: NE</p>}
              {!isAdmin&& !item.udomljen &&
            <button className="btn btn-danger" id="deleteNew" onClick={() =>takeAnimal(item.id)}>UDOMI</button>
            }
            <div className="adminButtons">
            {isAdmin&&
              <button className="btn btn-danger" id="deleteNew" onClick={onEdit} >UREDI</button>
              }
              {isAdmin&&
              <button className="btn btn-danger" id="deleteNew" onClick={() =>handleAnimal(item.id)}>IZBRIŠI</button>
              }
              </div>

    
            </div>
          )})}
              {showModal && <Modal data={activeItem} close={() => setShowModal(false)} />}
        </div>
      );

}
export default MakingList;