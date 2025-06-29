import { useState, useEffect } from "react";

const useFetch = (url) =>{
   const [data,setData] = useState(null);
   const [isPending,setPending] = useState(true);
   const [isError,setError] = useState(null);

    useEffect(() =>{
        const abortCont = new AbortController();

    setTimeout(() => {
        fetch(url, {signal: abortCont.signal})
          .then(res => {
        if(!res.ok){
            throw Error('Failed to fetch data from server');
        }
        
        return res.json()
    })
    .then ((data) => {
        console.log(data);
        setData(data)
        setPending(false);
        setError(null)
    }).catch (err => {
        if(err.name === 'AbortError'){
            console.log("fetch aborted");
        }
        else{
             setPending(false);
             setError(err.message);
        }
       
    })
    }, 1000);

    return () => abortCont.abort();

}, [url])
return {data, isPending, isError}
}



export default useFetch;