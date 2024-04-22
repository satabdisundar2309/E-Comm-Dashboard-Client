import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import PrivateComponent from './components/PrivateComponent'
import Login from './components/Login'
import AddProduct from './components/AddProduct'
import ProductList from './components/ProductList'
import UpdateProduct from './components/UpdateProduct'


function App() {


  return (
    <div className='App'>
    <BrowserRouter>
    
      <Navbar/>

        <Routes>
          {/* Private routes */}
          <Route element= {<PrivateComponent/>}>
                  <Route path='/' element={<ProductList/>} />
                  <Route path='/add' element={<AddProduct/>} />
                  <Route path='/update/:id' element={<UpdateProduct/>} />
                  <Route path='/logout' element={<h1>Logout component</h1>} />
                  <Route path='/profile' element={<h1>Profile component</h1>} />
          </Route>

          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />

        </Routes>

    </BrowserRouter>
    
    </div>
  )
}

export default App
