import Header from "./Header";
import {useState, useEffect,useMemo, useCallback,useContext} from 'react';
import axios from "axios";
import "./Donations.css"
import DonationModul from "./DonationModul";
import Modal from 'react-modal';
import ListingDonations from "./ListingDonations";
import DonationData from "../models/DonationData";
import DonationTypes from "../constants/DonationTypes";
import AdminContext from "../context/AdminContext";

const Donations = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState<DonationData[]>([]);
    const{isAdmin}=useContext(AdminContext)

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onUpdateDonations = useCallback((id: number, vrsta: string ) => {
    setData(oldData => {
        const index = oldData.findIndex(data => data.id === id);
        if (index === -1) return oldData;
        oldData[index].vrsta = vrsta;
        return [...oldData];
    })
  }, [])

  useEffect(() => {
    axios
    .get("http://localhost:3001/donacije")
    .then((res) => setData(res.data));
  }, [])

  const NeedDonations = useMemo(() => {
    return data.filter(d => d.vrsta === DonationTypes.TRAZIM)
  }, [data])

  const GiveDonations =useMemo(() => {
    return data.filter(d => d.vrsta === DonationTypes.NUDIM)
  }, [data])

  const GotDonations =useMemo(() => {
    return data.filter(d => d.vrsta === DonationTypes.DONIRANO)
  }, [data])

  const onNewDonation = useCallback((donation: DonationData) => {
    setData(oldData => [...oldData, donation])
  }, [])
  

    return(
        
        <div>
            <Header/>
            <button className="btn btn-danger" id="makeNew" onClick={handleOpenModal}>NOVA DONACIJA</button>
            
            <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
            <button className="close" onClick={handleCloseModal}>X</button>
            <DonationModul onNewDonation={onNewDonation} />
            
        </Modal>
            <h3 className="need">Tražimo:</h3>
            <div className="tableHead"><h5>Tip</h5><h5 className="tableTitle">Vrijednost</h5><h5 className="tableTitle">Opis</h5><h5 className="tableTitle">Doniraj</h5></div>
            <ListingDonations data={NeedDonations} onUpdateDonation={onUpdateDonations}/>
           
            {isAdmin && <>
            <h3 className="need">Nudi se:</h3>
            <div className="tableHead"><h5>Tip</h5><h5 className="tableTitle">Vrijednost</h5><h5 className="tableTitle">Opis</h5><h5 className="tableTitle">Doniraj</h5></div>
            <ListingDonations data={GiveDonations} onUpdateDonation={onUpdateDonations}/>
            <h3 className="need">Donirano:</h3>
            <div className="tableHead"><h5>Tip</h5><h5 className="tableTitle">Vrijednost</h5><h5 className="tableTitle">Opis</h5><h5 className="tableTitle">Doniraj</h5></div>
            <ListingDonations data={GotDonations} onUpdateDonation={onUpdateDonations}/>
            </> 
            }
   
            
            
            

            
        </div>
    )
}
export default Donations;