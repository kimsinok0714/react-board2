
import { Route, Routes } from 'react-router-dom';
import BoardList from './component/BoardList';
import BoardWrite from './component/BoardWrite';
import BoardView from './component/BoardView';
import BoardModify from './component/BoardModify';
import './App.css'


function App() {
  return (
    <Routes>
      <Route path='/' element={<BoardList />} />
      <Route path='/list' element={<BoardList />} />
      <Route path='/write' element={<BoardWrite />} />
      <Route path='/view/:id' element={<BoardView />} />
      <Route path='/modify/:id' element={<BoardModify />} />
    </Routes>
  )
}

export default App
