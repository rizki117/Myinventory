








//bagian components/data/useFetchData.js

import React,{useState, useEffect} from 'react'

const useFetchData=(fetchFunction)=>{
  const[data, setData]=useState([]);
  const[loading, setLoading]=useState(true);
  const[error, setError]=useState(null);

const fetchData=async()=>{
  try{
 const result= await fetchFunction();
 setData(result || [])   
  }catch(err){
      setError(err.message)
  }finally{
      setLoading(false)
  }
  
};

useEffect(()=>{
    fetchData();
},[]);

return{data, setData, loading, error};
  
};

export default useFetchData;
