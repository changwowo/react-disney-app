import axios from '../../api/axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DatailPage = () => {

  let { movieId } = useParams()

  const [movie , setMovie ] = useState({})

  console.log(movieId)

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`/movie/${movieId}`)
      setMovie(res.data)
      console.log(res.data)
    }
    fetchData()
 } ,[movieId])

  if(!movie.backdrop_path) {
    return null
  }else{
    return (
      <section>
        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="img" className='modal__poster-img'/>
      </section>
    )
  }
}

export default DatailPage
