import DonationData from "../models/DonationData";
import {useContext, useState,useCallback} from "react"
import AdminContext from "../context/AdminContext";
import axios from "axios";
import DonationTypes from "../constants/DonationTypes";
interface ListingDonationProps {
    data: DonationData[];
    onUpdateDonation: (id:number, vrsta:DonationTypes) => void;

    
}
const ListingDonations = (props:ListingDonationProps) => {
    const { data, onUpdateDonation } = props;
    const[result,setResult]=useState<DonationData[]>([]);
    const {isAdmin} = useContext(AdminContext);
    

    
    const onAcceptDonation = (id:number)=>{

      
      
      const requestBody={
       vrsta: DonationTypes.DONIRANO
      }
      const url_patch = `http://localhost:3001/donacije/${id}`;
      axios.patch(url_patch,requestBody)
      .then(((res) =>  onUpdateDonation(id,DonationTypes.DONIRANO)))
   
      
    }

    
   

    return (
        <div>
          {data.map(item => (
            <div key={item.id} className="rowDonation">
              <p >{item.tip}</p>
              <p className="tableTitle">{item.vrijednost}</p>
              <p className="tableTitle">{item.opis}</p>
                
                
            {item.vrsta==="donirano"?<p className="tableDonate">DONIRANO</p>:
            <button className="tableTitles" id="btn-btndanger" onClick={()=>onAcceptDonation(item.id)} >{item.vrsta === "nudim" ? "PRIHVATI":"DONIRAJ"}</button>}
         
          
        </div>
      ))}
    </div>
  );
};

            
            
       

    

export default ListingDonations;