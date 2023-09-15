"use client"
import { useEffect, useState,useRef } from 'react'
import ListType from '@/types/types'
import axios from 'axios';

export default function Home() {

  const [userInput,setUserInput] = useState('');
  const [data, setData] = useState<ListType[]>([]);
  
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  }

  
  const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
       // Clean Space
       const cleanedUserInput = userInput.trim();

       if (cleanedUserInput === '') {
        // Empty input
        console.error('Boş bir giriş yapılamaz.');
        return; // error
      }
    try {
      const newItem:ListType = {task:userInput,checked:false};
        const response = await axios.post('/api/', newItem);
        console.log('Post isteği başarıyla gönderildi', response.data);
        setData((prevData) => [...prevData, newItem]);
        // Başarılı
        setUserInput("");
      } catch (error) {
        console.error('Post isteği sırasında bir hata oluştu', error);
        // Hata
      }
  };

  const handleListClick = async (e: React.MouseEvent<HTMLSpanElement>) => {
    const itemId = e.currentTarget.id;
    

 
  
    try {
      const response = await axios.patch('/api/', { v_id: itemId });
      console.log('PUT isteği başarıyla gönderildi', response.data);
  
      // Başarılı
    } catch (error) {
      console.error('PUT isteği sırasında bir hata oluştu', error);
      // Hata
    }
  }

  const handleDelete = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    
    const params = {v_id:e.currentTarget.id};
    try {
        const response = await axios.delete('/api/',{
          data: params
        });
        console.log('DELETE isteği başarıyla gönderildi', response.data);
        
        // Başarılı
      } catch (error) {
        console.error('DELETE isteği sırasında bir hata oluştu', error);
        // Hata 
      }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/');
        return response.data;
      } catch (error) {
        console.error('Veri alınamadı:', error);
        throw error; // Hata yeniden fırlatılıyor
      }
    }
    fetchData()
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Hata:', error);
      });
  }, [data]);

 

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 md:p-24 ">
      
      <section className=' w-full md:w-1/2 border  text-slate-600 shadow-sm rounded p-2'> 
        <h1 className='text-2xl text-center'>To do list</h1>
        <hr className='my-4'/>
        
        <ul className='flex flex-col gap-2  border'>
          {
          data.map((item:ListType, index) => (

              <li key={index} 
              className={"border p-2 flex items-center justify-between"} >
                  <span id={item._id} onClick={handleListClick} className={`${item.checked && 'line-through'} cursor-pointer`}>{item.task} </span>
                  <span id={item._id} className='mr-2 font-bold cursor-pointer' onClick={handleDelete}> -</span>
                  
                  </li>
                  
                    
               
                 
                
          ))}
        </ul>
          <section className='flex gap-2 items-center mt-4 border p-2'>
            <h2>New Task : </h2>
            <input onChange={handleChange} value={userInput} className="outline-none border px-2 py-1 " />
            <button onClick={handleSubmit}className='border px-2 py-1'>+</button>

          </section>
      </section>
    </main>
  )
}