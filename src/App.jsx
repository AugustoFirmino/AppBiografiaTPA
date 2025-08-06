// App.jsx




import { BrowserRouter, Routes,Router, Route, Link } from 'react-router-dom';
import Home from './pagina/inicio'
import Biografia from './pagina/bibiografia'



//rotas para admin fazer o CRUD do sistema e gerenciar
import Cadastro_Directores from './pagina/cadastrar_directores'
import Ver_Biografia from './pagina/ver_biografia'
import Listar_Directores from './pagina/listar_directores'
import Login from './pagina/login'


import './App.css';
function App() {
  return (
   <>
   <BrowserRouter>
      {/* sua navegação aqui token github: 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 */}
      
     

      <Routes>
        <Route path="/" element={<Home />} /> {/* Rota para Home */}
        <Route path="/biografia/:id" element={<Biografia />} /> {/* Rota para Biografia para ususarios */}


     <Route path="/visualizar_biografia/:id" element={<Ver_Biografia />} /> {/* Rota para Biografia o admim visualizar */}
        <Route path="/listar_directores/:id" element={<Listar_Directores />} /> {/* Rota para Biografia o admim listar */}

       <Route path="/cadastrar_directores/:id" element={<Cadastro_Directores/>} /> {/* Rota para Cadastro pelo admin. dos directores */}
        <Route path="/login" element={<Login/>} /> {/* Rota para login pelo admin */}
      </Routes>

    </BrowserRouter>
   </>
     
   
  );
}

export default App;
