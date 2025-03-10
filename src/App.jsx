
import './App.css'
import BookDetails from './components/BookDetails'
import BookLayout from './components/BookLayout/BookLayout'
import BookList from './components/BookList'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {

  return (
    <>
     
      <BrowserRouter>
      
        <Routes>
          <Route path='/' element = {<BookLayout/>}></Route>
          <Route path='/listBooks' element = {<BookList/>}></Route>
          <Route path="/book/:id" element={<BookDetails />}></Route>
        </Routes>
  
      </BrowserRouter>
     
    </>
  )
}

export default App
