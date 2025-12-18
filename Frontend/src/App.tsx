import './App.css'
import axios from 'axios';
import {useState, useEffect} from 'react';
import type { Car } from './Models/Car';


function App() {

const [array, setArray] = useState<Car[]>([]);

const fetchData = async () => {
  const response = await axios.get("http://localhost:8000/");
  setArray(response.data.carInfo);
}

useEffect(() => {
  fetchData();
}, [])

  return (
    <ul>

      {array?.map((car: Car, index: number) => (
        <li key={index}>{car.title} {car.description} {car.price}</li> 
      ))}
    </ul>
  )
}

export default App
