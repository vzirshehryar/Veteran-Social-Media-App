import React, { useEffect, useState } from 'react'

import User from './User'

function LeftBottom() {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  
  const fetchData = () =>{
    const url = `http://localhost:4000/veteran/allveteran`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json.user))
      .catch((error) => console.log(error));
  }

  useEffect(() => {

    fetchData();

  }, []);

  const clicked = () =>{
    fetchData();
  }

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    // console.log(data);
  };

  const filteredData = data.filter((el) => {
    if (inputText === '') {
        return undefined;
    }
    else
      return el.name.toLowerCase().includes(inputText)
  })

  return (
    <>
        <input placeholder='Search' className='search' onChange={inputHandler} onClick={clicked}/>
        {filteredData.map((item) => (
          <User key={item._id} data={item}/> 
        ))}
    </>
  )
}

export default LeftBottom
