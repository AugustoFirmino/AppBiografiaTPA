// App.jsx
import { BrowserRouter, Routes,Router, Route, Link } from 'react-router-dom';
import Home from './pagina/inicio'
import Biografia from './pagina/bibiografia'
import './app.css';
function App() {
  return (
   <>
   <BrowserRouter>
      {/* sua navegação aqui */}
      
     

      <Routes>
        <Route path="/" element={<Home />} /> {/* Rota para Home */}
        <Route path="/biografia/:nome/:id" element={<Biografia />} /> {/* Rota para Home */}
     
      </Routes>

    </BrowserRouter>
   </>
     
   
  );
}

export default App;
