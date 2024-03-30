import React,{useEffect,useState} from 'react'
import Layout from '../components/Layout/Layout.js';
import { useAuth } from '../context/auth';
import axios from 'axios';
import {Link} from 'react-router-dom'
import './Store.css'
import { FiGrid } from "react-icons/fi";
import { FaListUl } from "react-icons/fa";




const Store = () => {
const [auth,setAuth] = useAuth();
const [products,setProducts] = useState([]);
const [categories, setCategories] = useState([]);
const [view, setView] = useState('grid');







const getAllProducts = async()=>{
  try{
    const {data} = await axios.get('/api/v1/product/get-product')
    setProducts(data.products);
  }catch(err){
    console.log(err)
  }}


  useEffect(()=>{
    getAllProducts()
  },[])

  const handleViewChange = (newView) => {
    setView(newView);
  };



  return (
    <Layout>
        <div className="App">
      <FiGrid onClick={() => handleViewChange('grid')} cursor={'pointer'} size={37}/>
      <FaListUl onClick={() => handleViewChange('list')}cursor={'pointer'} size={37}/>

      {view === 'grid' ? (
        <div className="grid-container">
          <div className='prods'>
          {products?.map((p) => (
              <Link
                key={p._id}
                to={`/product/${p.slug}`}
                className="product-link"
              >
                <div className="prod-card grid-container">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className=""
                    alt={p.name}
                  />
                  <div className="card-content">
                    <h5>{p.name}</h5>
                    <p>Rs.{p.price}/-</p>
                  </div>
                </div>
              </Link>
            ))}
</div>
        </div>
      ) : ( 
        <div className="list-container">
           {products?.map((p) => (
              <Link
                key={p._id}
                to={`/product/${p.slug}`}
                className="product-link"
              >
                <div className="prod-card-list">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className=""
                    alt={p.name}
                  />
                  <div className="card-content">
                    <h5>{p.name}</h5>
                    <p>Rs.{p.price}/-</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
    </Layout>
  )
}
 




export default Store
