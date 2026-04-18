import './App.css'
import useFetch from './useFetch'
import {Link} from 'react-router-dom'
import {useState} from 'react'

export default function App(){

  const {data,error,loading}=useFetch("https://meetup-backend-eight.vercel.app/meetups")
  // console.log(data)

  const[eventType,setEventType]=useState("")
  const[search,setSearch]=useState("")
  

  
  const filteredDataByType=eventType?data.filter(event=>event.eventType===eventType):data
  
  const filterData=search?filteredDataByType.filter(event=>(event.title.toLowerCase().includes(search.toLowerCase())) || (
    event.eventTags.find(tag=>tag.toLowerCase().includes(search.toLowerCase()))
  )):filteredDataByType
  

  // console.log(filteredData)

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error in getting data</p>


  return (
    <main className='container bg-light'>
      <div className='d-flex justify-content-between align-items-center '>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubs8OoTGktOH5FyiIUnK_oSH0sSDr5hC0Sg&s" 
        style={{ width: "100px", height: "100px" }} />
        <input type="text" placeholder='Search by title or tags' onChange={(event)=>setSearch(event.target.value)} className='form-control w-auto'/>
      </div>
      <hr/>

      <div className="d-flex justify-content-between align-items-center pb-3">
        <h1>Meetup Events</h1>
        <select className='form-select w-auto' onChange={(event)=>setEventType(event.target.value)} >
          <option value="">Select Event Type</option>
          <option value="Online Event">Online Event</option>
          <option value="Offline Event">Offline Event</option>
        </select>
      </div>

      <div className='row container'>
      {filterData?.map(event=>(
        <div className='col-md-4 px-6 my-1'>
            <div key={event._id} className='card'>
              <Link to={`/details/${event._id}`}><img src={event.imageUrl} className='image-fluid rounded event-image' /></Link>
            </div>
            <figcaption className='fs-6 fw-light'>{event.dateTime.start}</figcaption>
            <h5><strong>{event.title}</strong></h5>
            <p></p>
        </div>
        ))}
      </div>
    </main>
  )
}