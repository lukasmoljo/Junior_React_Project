import Header from "./Header";
import {useEffect, useState, useContext, useCallback} from 'react';
import "./News.css";
import axios from "axios";
import NewsData from "../models/NewsData";
import ListingNews from "./ListingNews"
import AdminContext from "../context/AdminContext";



const News = () => {
    const {isAdmin} = useContext(AdminContext)
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [important, setImportant] = useState(false);
    const [data, setData] = useState<NewsData[]>([]);
    
    
    const handleSubmit = (event) => {
    event.preventDefault();
    
    const requestBody = { 
        naslov: event.target.elements.naslov.value,
        tekst: event.target.elements.news.value,
        vazno: event.target.elements.checkbox?.checked ? true:false ,
     }
    axios
          .post("http://localhost:3001/obavijesti", requestBody)
          .then((res) => setData((prev) => [...prev, res.data]));
    

    
    setTitle('');
    setContent('');
    setImportant(false);
  };
  useEffect(() => {
    axios
    .get("http://localhost:3001/obavijesti")
    .then((res) => setData(res.data));
  }, [])

  const onDeleteItem = useCallback((id: number) => {
    setData(oldData => oldData.filter(data => data.id !== id))
  }, [])

    return(
        
        <div>
            <Header/>
            <form onSubmit={handleSubmit}>
            
            <div className="new">
        <label>
            Naslov:
            <input className="line" id="naslov" type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <br />
        <label>
            Obavijest:
            <textarea className="line" id="news" value={content} onChange={(event) => setContent(event.target.value)} />
        </label>
        
        <br />
        <label >
            
            
            {isAdmin && (
  <div className="vaznoInput">
    <input
      className="line"
      id="checkbox"
      type="checkbox"
      checked={important}
      onChange={(event) => setImportant(oldValue => !oldValue)}
    />
    <span className="textVazno">VAŽNO</span>
  </div>
)}
            
        </label>
        </div>
        <br />
        <button className="btn btn-danger" type="submit">Dodaj obavijest</button>
        
        </form>

        <ListingNews  data={data} onDeleteItem={onDeleteItem} />
            
            

            
        </div>
    )
}
export default News;