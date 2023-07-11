import React, { useRef } from 'react'
import './MovieModal.css'
import useOnClickOutside from '../../hooks/useOnClickOutSide'

const MovieModal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen
}) => {
  const ref = useRef(null)

  useOnClickOutside(ref , () => {setModalOpen(false)})

  return (
    <div className='presentation' role='presentation'>
      <div className='wrapper-modal'>
        <div className='modal' ref={ref}>
          <span  className='modal-close' onClick={()=> setModalOpen(false)}>
            X
          </span>

          <img src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} 
          alt="modalImg"  
          className='modal__poster-img'/>

          <div className='modal__content'>
            <p className='modal__details'>
              <span className='modal__uesr_perc'></span>{' '}
              {release_date ? release_date : first_air_date}
            </p>

            <h2 className='modal__title'>{title ? title : name}</h2>
            <p className='modal__overview'>評点 : {vote_average}</p>
            <p className='modal__overview'>{overview}</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default MovieModal
