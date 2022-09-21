
import './App.css';
import NoteApp from './component/NoteApp';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import EditNote from './component/EditNote';
function App() {
  return (
    <>
    <BrowserRouter>
    
    <Routes>

    <Route path='/' element={<NoteApp/>}/>
    <Route path='/home' element={<NoteApp/>}/>
      <Route path='/:id/:title' element={<EditNote/>}/>
    </Routes>
    </BrowserRouter>
     
    </>
  );
}

export default App;
