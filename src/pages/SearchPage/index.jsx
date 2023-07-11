import axios from '../../api/axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Search.css'
import { useDebounce } from '../../hooks/useDebounce'


const SearchPage = () => {

  const [searchResults , setSearchResults] = useState([])
  const navigate = useNavigate()
  
  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }

  const searchTerm = useDebounce(useQuery().get('q'),500)

  useEffect(()=>{
    if(searchTerm){
      fetchSearchMovie(searchTerm)
    }else{
      navigate('/main')
    }
  },[searchTerm])

  const fetchSearchMovie = async () => {
    try{
      const res = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`)
      setSearchResults(res.data.results)
      console.log(searchResults)
    }catch(e) {
      console.log(e)
    }
  }
  console.log(searchTerm)
  if(searchResults.length > 0 ){ 
    return (
      <section className='search-container'>
        {searchResults.map((movie) => {
          if(movie.backdrop_path !== null && movie.media_type !== 'person'){
            const movieImageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
            return (
              <div className='movie' key={movie.id}>
                <div className='movie__column-poster' onClick={()=> navigate(`/${movie.id}`)}>
                  <img src={movieImageUrl} alt="movie" className='movie__poster' />
                </div>
              </div>
            )
          }
        })}
      </section>
    )
  }else{
    return (
      <section className='no-results'>
        <div className='no-results-text'>
          <p>
            探している映画 '{searchTerm}'はいない映画です！
          </p>
        </div>
      </section>
    )
  }
}

export default SearchPage
