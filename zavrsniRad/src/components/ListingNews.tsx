import NewsData from "../models/NewsData";
import {useContext, useState} from "react"
import AdminContext from "../context/AdminContext";
import axios from "axios";
interface ListingNewsProps {
    data: NewsData[];
    onDeleteItem: (id: number) => void;
}

const ListingNews = (props: ListingNewsProps) =>{
    const { data, onDeleteItem } = props;
    const {isAdmin} = useContext(AdminContext);
    
   
   
      const handleDelete= (id: number)=>{

        const url_delete = `http://localhost:3001/obavijesti/${id}`;
        axios.delete(url_delete)
        .then(() => {
          onDeleteItem(id);
        })

    }
    

    return (
        <div>
          {data.map(item => (
            <div key={item.id} className={(item.vazno)? "vaznoListingNews":"listingNews"}>
              <p className="listTitle">{item.naslov}</p>
              <p>{item.tekst}</p>
              { (item.vazno) ? <p className="važno">VAŽNO</p> :""
            }
            
            {isAdmin &&
            
            <button className="btn btn-danger" id="deleteNew" onClick={() =>handleDelete(item.id)}>IZBRIŠI</button>

            }
            </div>
          ))}
        </div>
      );

}
export default ListingNews;