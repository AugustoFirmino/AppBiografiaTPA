// App.jsx




import { BrowserRouter, Routes,Router, Route, Link } from 'react-router-dom';
import Home from './pagina/inicio'
import Biografia from './pagina/bibiografia'
import Cadastro_Directores from './pagina/cadastrar_directores'
import Login from './pagina/login'
import './App.css';
function App() {
  return (
   <>
   <BrowserRouter>
      {/* sua navegação aqui token github: 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 */}
      
     

      <Routes>
        <Route path="/" element={<Home />} /> {/* Rota para Home */}
        <Route path="/biografia/:nome/:id" element={<Biografia />} /> {/* Rota para Biografia */}
       <Route path="/cadastrar_directores" element={<Cadastro_Directores/>} /> {/* Rota para Cadastro pelo admin */}
          <Route path="/login" element={<Login/>} /> {/* Rota para login pelo admin */}
      </Routes>

    </BrowserRouter>
   </>
     
   
  );
}

export default App;
