import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {getAuth , GoogleAuthProvider , signInWithPopup , onAuthStateChanged, signOut} from 'firebase/auth'

const Nav = () => {

  const [show , setShow] = useState(false)

  const { pathname } = useLocation() // 이게 뭐냐면 현재의 경로를 나타내주는 함수이다
  // console.log( pathname ) // 내가 지금 /main 에서 이 로그를 본다면 pathname은 /main이라고 뜰것이다

  const [searchValue , setSearchValue] = useState('')
  const navigate = useNavigate()

  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  const initalUserData = localStorage.getItem('userData') ?
  JSON.parse(localStorage.getItem('userData')) : {}
  const [userData , setUserDate] = useState(initalUserData)

  useEffect(() => {
    onAuthStateChanged(auth , (user) => {
      console.log(user)
      if(user){
        if(pathname === '/'){
          navigate('/main')
        }
      }else{
        navigate('/')
      }
    })
  },[auth , navigate])


  useEffect(()=> {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll' , handleScroll)
    }
  },[])


  const handleScroll = () => {
    if(window.scrollY > 50) {
      setShow(true)
    }else{
      setShow(false)
    }
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value)
    navigate(`/search?q=${e.target.value}`)
  }

  const handleAuth = () => {
    signInWithPopup(auth , provider)
    .then(result => {
      setUserDate(result.user)
      localStorage.setItem('userData', JSON.stringify(result.user))
    })
    .catch(error => {
      console.log(error)
    })
  }
  const handleLogOut = () => {
    signOut(auth).then(() => {
      setUserDate({})
      navigate('/')
    }).catch(error => {
      console.log(error)
    })
  }


  return (
    <NavWrapper show={show}>
      <Logo>
        <img 
          src="/images/logo.svg" 
          alt="Disney Plus Logo" 
          onClick={()=> (window.location.href = '/')}
        />
      </Logo>
      {pathname === '/' ?
       (<Login onClick={handleAuth}>Login</Login>) :
        <>
          <Input 
            className='nav__input' 
            type='text' 
            placeholder='映画を検索してください'
            value={searchValue}
            onChange={handleChange}
          />
          <SignOut>
            <UserImg src={userData.photoURL} alt={userData.displayName}/>
            <DropDown>
              <span onClick={handleLogOut}>Sign Out</span>
            </DropDown>
          </SignOut>
          </>
      }
      
    </NavWrapper>
  )
}

export default Nav

const Login = styled.a`
  background-color: rgba(0,0,0,.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;  
  border: 1px solid #f9f9f9;
  transition : all .2s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color : gray;
    border-color : transparent;
  }
`
const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50% , 0);
  background-color : rgba(0,0,0, .582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
`

const NavWrapper = styled.nav`
  position : fixed;
  top : 0;
  left : 0;
  right : 0;
  height : 70px;
  background-color :${props => props.show ? '#090b13' : 'transparent'};
  display : flex;
  justify-content : space-between;
  align-items : center;
  padding : 0 36px;
  letter-spacing : 16px;
  z-index : 3;
`

const Logo = styled.a`
  padding : 0;
  width : 80px;
  margin-top : 4px;
  max-height :70px;
  font-size : 0;
  display : inline-block;

  img{
    display : block;
    width : 100%;
    cursor : pointer;
  }
`
const DropDown = styled.div`
  position : absolute;
  top : 48px;
  right : 0px;
  background : rgb(19,19,19);
  border : 1px solid rgba(151,151,151,.34);
  border-radius : 4px;
  box-shadow : rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding : 10px;
  font-size : 14px;
  letter-spacing : 3px;
  width : 100%;
  opacity : 0;
`

const SignOut = styled.div`
  position : relative;
  height : 48px;
  width : 48px;
  display : flex;
  cursor : pointer;
  align-items : center;
  justify-content :center;

  &:hover {
    ${DropDown} {
      opacity : 1;
      transition-duration : 1s;
    }
  }

`
const UserImg = styled.img`
  border-radius : 50%;
  width : 100%;
  height : 100%;

`
