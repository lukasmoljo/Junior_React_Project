import "./List.css"
import Header from "./Header";
import MakingList from "./MakingList";
import {useState, useEffect, useCallback} from 'react'
import axios from "axios";
import NewAnimalData from "../models/NewAnimalData";

const List = () =>{
    const[data,setData]=useState<NewAnimalData[]>([]);
    const [filter, setFilter] = useState({tip:"",udomljen:""});
    
    console.log(filter)
    const onChangeFilterType = (event) =>{
        
        setFilter((oldValue) => ({ ...oldValue, tip: event.target.value.toLowerCase() }));
    }
    const onChangeFilterTaken = (event) =>{
        
        setFilter((oldValue) => ({ ...oldValue, udomljen:event.target.value }));
    }
    
    useEffect(() => {
        let url = "http://localhost:3001/zivotinje";
        if (filter.tip!==""&& filter.udomljen!=="") {
        url = `http://localhost:3001/zivotinje?tip=${filter.tip}&udomljen=${filter.udomljen}`;
    }
        else
        {   if(filter.tip!==""){
            url = `http://localhost:3001/zivotinje?tip=${filter.tip}`; 
        }
            if(filter.udomljen!==""){
                url = `http://localhost:3001/zivotinje?udomljen=${filter.udomljen}`;
            }

        }
        
        
    
        
        axios
        .get(url)
        .then((res) => setData(res.data));
      }, [filter])

      const onDeleteAnimal = useCallback((id: number) => {
        setData(oldData => oldData.filter(data => data.id !== id))
      }, [])

      const onUpdateAnimal = useCallback((id: number, udomljen: boolean ) => {
        setData(oldData => {
            const index = oldData.findIndex(data => data.id === id);
            if (index === -1) return oldData;
            oldData[index].udomljen = udomljen;
            return [...oldData];
        })
      }, [])
    return(
    <div>
        <Header/>
        <div>
        <div className="both-filters">
        
        <form className="filter">
        <h4>Filter:</h4>
        <div className="list-radios">
            <div><input type="radio" id="udomljen" value="true" name="filter" onChange={onChangeFilterTaken}/>
            <label className="label">Udomljen</label>
            </div>
            <div><input type="radio" id="neudomljen" value="false" name="filter" onChange={onChangeFilterTaken}/>
            <label  className="label">Neudomljen</label>
            </div>
            </div>
            </form>
        
       
        
        <form className="filter">
        <h4 className="titleVrsta">Vrsta:</h4>
        <div className="list-radios">
            <div><input type="radio" id="sve" value="" name="filter" onChange={onChangeFilterType}/>
            <label className="label">Sve</label>
            </div>
            <div><input type="radio" id="pas" value="Pas" name="filter" onChange={onChangeFilterType}/>
            <label  className="label">Pas</label>
            </div>
            <div>
            <input type="radio" id="mačka" value="Mačka" name="filter" onChange={onChangeFilterType}/>
            <label  className="label">Mačka</label>
            </div>
            </div>
        
            
            
            </form>
            </div>
            <div className="makingList">
            <MakingList data={data} onDeleteAnimal={onDeleteAnimal} onUpdateAnimal={onUpdateAnimal}/>
        </div>
            
            
           
       
        
        </div>
        
     
    </div>
    
    )

};
export default List;