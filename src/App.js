import './App.css';
import Nav from './components/Nav';
import { Outlet, Route, Routes } from 'react-router-dom';
import LoingPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import DatailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';


const Layout = () => {
  return(
    <div>
        <Nav />
 
        <Outlet />
    </div>
  )
}
function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index  element={<LoingPage/>}/>
          <Route path='main'  element={<MainPage/>}/>
          <Route path=':movieId' element={<DatailPage />}/>
          <Route path='search' element={<SearchPage />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

