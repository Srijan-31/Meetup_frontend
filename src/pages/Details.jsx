import {useParams} from 'react-router-dom'
import useFetch from '../useFetch'
import { CiClock2 } from "react-icons/ci"
import { GrLocation } from "react-icons/gr"

export default function Details(){

    const{data,loading,error}=useFetch('https://meetup-backend-eight.vercel.app/meetups')

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error in getting data</p>

    const {eventId}=useParams()
    console.log(eventId)
    const eventData=data?.find(event=>event._id===eventId)
    console.log(eventData)

    return(
        <main className='container bg-light'>
            <div className='d-flex justify-content-between align-items-center '>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubs8OoTGktOH5FyiIUnK_oSH0sSDr5hC0Sg&s" 
                style={{ width: "100px", height: "100px" }} />
                <input type="text" placeholder='Search by title' onChange={(event)=>setTitle(event.target.value)} className='form-control w-auto'/>
            </div>
            <hr/>
            <div className='row g-4'>
                <div className='col-md-7 container '>
                    <h2><strong>{eventData?.title}</strong></h2>
                    <span>Hosted By:</span>
                    <p className='fw-bold fs-5'>{eventData?.hostedBy}</p>
                    <br/>
                    <img src={eventData?.imageUrl} className='img-fluid'/>
                    <br/>
                    <br/>
                    <p className='fs-4 fw-bold'>Details:</p>
                    <p>{eventData?.details}</p>
                    <p className='fs-4 fw-bold'>Additional Information:</p>
                    <span className='fw-bold'>Dress Code:</span> {eventData?.dressCode}
                    <br/>
                    <span className='fw-bold'>Age Restrictions:</span> {eventData?.ageRestriction}
                    <p></p>
                    
                    <span className='fs-4 fw-bold'>Event Tags:</span>
                    <br/>
                    {eventData?.eventTags.map(tag=>(
                        
                            <span className='btn btn-danger me-3'>{tag}</span>
                        
                    ))}
                </div>
                <div className='col-md-1'></div>
                <div className='col-md-4'>
                    <div className="card bg-white">
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-md-2 mt-2'>
                                    <p><CiClock2 /></p>
                                    <br/>
                                    <p><GrLocation /></p>
                                    <br/>
                                    <p></p>
                                </div>
                                <div className='col-md-10'>
                                    <p className='card-text'>{eventData?.dateTime.start} to {eventData?.dateTime.end} </p>
                                    <span className='card-text'>{eventData?.location.venue}</span><br/>
                                    <span className='card-text'>{eventData?.location.address}</span>
                                    <p></p>
                                    <p>₹ {eventData?.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>

                    <span className='fs-4 fw-bold'>Speakers: ({eventData?.speakers.length})</span>
                    <div className='row'>
                        {eventData?.speakers.map(speaker=>(
                                <div className='col-md-6'>
                                    <div className='card'>
                                        <div className='card-body text-center'>
                                            <img src={speaker.photo}/><br/>
                                            <small className='fw-medium'>{speaker.name}</small><br/>
                                            <small>{speaker.title}</small>
                                        </div>
                                    </div>
                                </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}