import React from 'react'
import Banner from '../../components/Banner'
import Category from '../../components/Category'
import Row from '../../components/Row'
import requests from '../../api/request'
import { styled } from 'styled-components'

const MainPage = () => {
  return (
    <div>
      <Container>
        <Banner />
        <Category />
        <Row title='最近人気な Movies' id='TN' fetchUrl={requests.fetchTrending}/>
        <Row title='Top Movies' id='TR' fetchUrl={requests.fetchTopRated}/>
        <Row title='アクションMovies' id='AM' fetchUrl={requests.fetchActionMovies}/>
        <Row title='コミックMovies' id='CM' fetchUrl={requests.fetchComedyMovies}/>
      </Container>
    </div>
  ) 
}

export default MainPage

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow: hidden;
  display: block;
  top :72px;
  padding : 0 calc(3.5vw + 5px);

  &:after {
    background : url('/images/home-background.png') center center / cover no-repeat fixed;
    content : '';
    position : absolute;
    inset : 0px;
    opacity : 1;
    z-index : -1;
  }
`
