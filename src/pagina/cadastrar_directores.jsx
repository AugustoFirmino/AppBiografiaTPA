// Arquivo: App.jsx

import { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import ReactCountryFlag from 'react-country-flag';
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';


import { FiLogOut } from "react-icons/fi";


//icon para actualizaçao de dados
import { ArrowPathIcon } from "@heroicons/react/24/solid";


// icon para listar dados 
import { ListBulletIcon } from '@heroicons/react/24/solid';

// icon para cadastrar dados
import { UserPlusIcon } from '@heroicons/react/24/solid';


//icon para processar enquanto carrega os dados
import { AiOutlineLoading } from 'react-icons/ai';



//icon para sucesso  quando actualizar ou cadastrar
import { BsCheckCircleFill } from "react-icons/bs";


//icon para erro quando nao cadastrar nem actualizar
import { BsExclamationCircleFill } from "react-icons/bs";


// icon para sair do admin
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

import Listar_Directores from './listar_directores';
import Listar_Directores_Actualizar_Dados  from './listar_directores_actualizar_dados';
const initialState = {
  
  id: null,
  name: '',
  link: '',
  nacionalidade: '',
  ocupacao: '',
  nascimento: '',
  falecimento: '',
  cargo: '',
  biografia: '',
  
  email: '',
  contactos: [''],
  data_publicacao: '',
  
};


function App() {

  const location = useLocation();
  const { id } = useParams();




  // variavel para pegar o id do director selecionado
   const [idDirector, setIdDirector] = useState(null);


  const [paginaAtual, setPaginaAtual] = useState('listar');
   const [mostrarFormulario, setMostrarFormulario] = useState(false); // novo estado



  const hoje = new Date();
  const dataMax = new Date(hoje.getFullYear() - 18, hoje.getMonth(), hoje.getDate()).toISOString().split('T')[0];
  const dataMin = new Date(hoje.getFullYear() - 120, hoje.getMonth(), hoje.getDate()).toISOString().split('T')[0];

  // funcao para direcionar a pagina actualizacao de dados para o director selecionado
   const handleSelecionarDirector = (id) => {

  setIdDirector(id);
  setMostrarFormulario(true); // Mostra apenas o formulário
  setPaginaAtual('actualizar');
};


  const handleNavegacao = (pagina) => {
    setPaginaAtual(pagina);
  };

const [fotos, setFotos] = useState([{ caminho: '' }]);

useEffect(() => {
  setFotos([{ caminho: '' }]);
}, [id]);


const [qualificacoes, setQualificacoes] = useState([
  { descricao: '' }
]);


const [experiencias, setExperiencias] = useState([{ descricao: '' }]);



const [idiomas, setIdiomas] = useState([{ idioma: '' }]);

useEffect(() => {
  setIdiomas([{ idioma: '' }]);
}, [id]);



const [contactos, setContactos] = useState([{ telefone: '' }]);

useEffect(() => {
  setContactos([{ telefone: '' }]);
}, [id]);


const [premios, setPremios] = useState([{ titulo: '', descricao: '' }]);

useEffect(() => {
  setPremios([{ titulo: '', descricao: '' }]);
}, [id]); // Atualiza quando o id do diretor mudar


const [depoimentos, setDepoimentos] = useState([
  { nome: '', cargo: '', mensagem: '' }
]);




useEffect(() => {
  setQualificacoes([{ descricao: '' }]);
}, [id]);

useEffect(() => {
  setExperiencias([{ descricao: '' }]);
}, [id]);

useEffect(() => {
  setDepoimentos([{  nome: '', cargo: '', mensagem: '' }]);
}, [id]);


   const [erroNascimento, setErroNascimento] = useState('');

  const [imagemModal, setImagemModal] = useState(null);
  const [imagens, setImagens] = useState([]);
  const [selectedImagesToDelete, setSelectedImagesToDelete] = useState([]);
  const imagensRef = useRef([]);
  // Seleção de imagens para exclusão múltipla
   const navigate = useNavigate();





   //para qualificacoes
   const handleChangeQualificacao = (index, value) => {
  const novas = [...qualificacoes];
  novas[index].descricao = value;
  setQualificacoes(novas);
};

const handleAddQualificacao = () => {
  setQualificacoes(prev => [...prev, { descricao: '' }]);
};

const handleRemoveQualificacao = (index) => {
  setQualificacoes(prev => prev.filter((_, i) => i !== index));
};


const handleChangeExperiencia = (index, value) => {
  const novas = [...experiencias];
  novas[index].descricao = value;
  setExperiencias(novas);
};

const handleAddExperiencia = () => {
  setExperiencias(prev => [...prev, { descricao: '' }]);
};

const handleRemoveExperiencia = (index) => {
  setExperiencias(prev => prev.filter((_, i) => i !== index));
};




//para idiomas 
const handleChangeIdioma = (index, value) => {
  const atualizados = [...idiomas];
  atualizados[index].idioma = value;
  setIdiomas(atualizados);
};

const handleAddIdioma = () => {
  setIdiomas(prev => [...prev, { idioma: '' }]);
};

const handleRemoveIdioma = (index) => {
  setIdiomas(prev => prev.filter((_, i) => i !== index));
};



//para premios

const handleChangePremio = (index, field, value) => {
  const atualizados = [...premios];
  atualizados[index][field] = value;
  setPremios(atualizados);
};

const handleAddPremio = () => {
  setPremios(prev => [...prev, { titulo: '', descricao: '' }]);
};

const handleRemovePremio = (index) => {
  setPremios(prev => prev.filter((_, i) => i !== index));
};



//para contactos

const handleChangeContacto = (index, value) => {
  const atualizados = [...contactos];
  atualizados[index].telefone = value;
  setContactos(atualizados);
};

const handleAddContacto = () => {
  setContactos(prev => [...prev, { telefone: '' }]);
};

const handleRemoveContacto = (index) => {
  setContactos(prev => prev.filter((_, i) => i !== index));
};


   // para depoimentos
const handleAddDepoimento = () => {
  setDepoimentos(prev => [
    ...prev,
    { id_director: id || '', nome: '', cargo: '', mensagem: '' }
  ]);
};

const handleRemoveDepoimento = (idx) => {
  setDepoimentos(prev => prev.filter((_, i) => i !== idx));
};

const handleDepoimentoChange = (idx, field, value) => {
  setDepoimentos(prev =>
    prev.map((dep, i) => i === idx ? { ...dep, [field]: value } : dep)
  );
};


   //sessao para depoimentos

  const handleToggleSelectImage = (id) => {
    setSelectedImagesToDelete((prev) =>
      prev.includes(id) ? prev.filter((imgId) => imgId !== id) : [...prev, id]
    );
  };



const handleDeleteSelectedImages = async () => {
  const imagensParaDeletar = imagens.filter(img => selectedImagesToDelete.includes(img.id));
  const imagensDoBanco = imagensParaDeletar.filter(img => !img.file && img.id); // imagens já salvas no banco

  // 1. Fecha o modal se a imagem estiver nele
  if (imagemModal && selectedImagesToDelete.includes(imagemModal.id)) {
    setImagemModal(null);
  }

  // 2. Remove imagens do banco via API
  if (imagensDoBanco.length > 0) {
    try {
      const response = await fetch('https://appbiografiatpa.onrender.com/api/remover/imagens', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ids: imagensDoBanco.map(img => img.id)
        })
      });

      const data = await response.json();
      if (!data.sucesso) {
        // Aqui você pode mostrar uma notificação
        console.warn("Erro ao excluir imagens do banco:", data.mensagem);
      }
    } catch (err) {
      console.error("Erro na requisição de exclusão:", err);
    }
  }

  // 3. Atualiza o estado de imagens
  const novasImagens = imagens.filter((img) => !selectedImagesToDelete.includes(img.id));
  setImagens(novasImagens);
  setSelectedImagesToDelete([]);

  // 4. Apenas limpa o input file (não usa DataTransfer para evitar conflitos no DOM)
  if (fileInputRef.current) {
    fileInputRef.current.value = '';
  }
};




  // Define data_publicacao automaticamente na criação do cadastro
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [form, setForm] = useState({ ...initialState, data_publicacao: getTodayDate() });
  const countryOptions = countryList().getData();

  useEffect(() => {
    imagensRef.current.forEach(img => {
      if (!imagens.find(i => i.url === img.url)) {
        URL.revokeObjectURL(img.url);
      }
    });
    imagensRef.current = imagens;
  }, [imagens]);

  // Handlers para campos simples
  const handleChange = e => {
    const { name, value } = e.target;
    // Se o campo alterado for nascimento, calcula idade automaticamente
    if (name === 'nascimento') {
      let idade = '';
      if (value) {
        const hoje = new Date();
        const nasc = new Date(value);
        let anos = hoje.getFullYear() - nasc.getFullYear();
        const m = hoje.getMonth() - nasc.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
          anos--;
        }
        idade = anos >= 0 ? String(anos) : '';
      }
      setForm(prev => ({ ...prev, nascimento: value, idade }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handler para nacionalidade (country select)
  const handleCountryChange = option => {
    setForm(prev => ({ ...prev, nacionalidade: option ? option.label : '' }));
  };


  // Imagem (mantém seleção múltipla e preview)
const fileInputRef = useRef();

const handleImageChange = e => {
  const files = Array.from(e.target.files);
  const novas = files.map(file => ({
    id: `${file.name}_${file.size}_${file.lastModified}`,
    file,
    url: URL.createObjectURL(file),
    descricao: '',
    rotate: 0,
  }));

  setImagens(prev => [...prev, ...novas]);

 
  if (fileInputRef.current) fileInputRef.current.value = '';
};
  // Handler para descrição de cada imagem
  const handleImageDescricaoChange = (id, value) => {
    setImagens(prev => prev.map(img => img.id === id ? { ...img, descricao: value } : img));
  };

const handleRemoveImage = async (id) => {
  const imagem = imagens.find(img => img.id === id);

  // Se imagem antiga (já no banco)
  if (imagem && !imagem.file && imagem.id) {
    try {
      const response = await fetch(`https://appbiografiatpa.onrender.com/api/deletar/imagem/${imagem.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (!data.sucesso) return;
    } catch (error) {
      return;
    }
  }

  // Atualiza o estado
  setImagens(prev => prev.filter(img => img.id !== id));

  // Limpa o file input (opcional)
  if (fileInputRef.current) {
    fileInputRef.current.value = '';
  }

  // Fecha o modal se estiver aberto
  if (imagemModal?.id === id) {
    setImagemModal(null);
  }
};



  // Salvar (envio real para o servidor)
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState("");


  // Actualizar (envio real para o servidor)
  const [actualizando, setActualizando] = useState(false);
  const [mensagem_actualizar, setMensagem_actualizar] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);  
  
  const [mostrarConfirmacaoDeletar, setMostrarConfirmacaoDeletar] = useState(false);

  const enviarImagens = async (id_director, imagens) => {
  try {
    const formData = new FormData();
    formData.append('id_director', id_director);

    imagens.forEach((img, idx) => {
      formData.append('imagens', img.file); // img.file = File
      formData.append(`descricao_foto_${idx + 1}`, img.descricao || "");
    });

    const resp = await fetch('https://appbiografiatpa.onrender.com/api/cadastrar/imagens', {
      method: 'POST',
      body: formData
    });

    const data = await resp.json();
    if (data.sucesso) {
      
    } else {
     
    }
  } catch (err) {
   
  }
};


const enviarQualificacoes = async (id_director) => {
  try {
    const qualificacoesFiltradas = qualificacoes.filter(q => q.descricao && q.descricao.trim() !== '');

    const response = await fetch('https://appbiografiatpa.onrender.com/api/cadastrar/qualificacoes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_director,
        qualificacoes: qualificacoesFiltradas
      })
    });

    const data = await response.json();
    if (data.sucesso) {
      
    } else {
     
    }
  } catch (error) {

  }
};


const enviarExperiencias = async (id_director, experiencias) => {
  try {
    const response = await fetch('https://appbiografiatpa.onrender.com/api/cadastrar/experiencias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_director, experiencias })
    });

    const data = await response.json();
    if (data.sucesso) {
     
    } else {
     
    }
  } catch (error) {
  
  }
};



  // Após receber o ID do diretor criado:
const enviarIdiomas = async (id_director, idiomas) => {
  try {
    const response = await fetch('https://appbiografiatpa.onrender.com/api/cadastrar/idiomas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_director,
        idiomas
      })
    });

    const data = await response.json();
    if (data.sucesso) {

    } else {
  
    }

  } catch (error) {
   
  }
};



// funcao para contactos
const enviarContactos = async (id_director, contactos) => {
  try {
    const response = await fetch('https://appbiografiatpa.onrender.com/api/cadastrar/contactos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_director,
        contactos
      })
    });

    const data = await response.json();
    if (data.sucesso) {
    
    } else {
      console.error(data.erro);
    }
  } catch (error) {
   
  }
};


const enviarPremios = async (id_director, premios) => {
  try {
    const response = await fetch('https://appbiografiatpa.onrender.com/api/cadastrar/premios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_director, premios })
    });

    const data = await response.json();
    if (data.sucesso) {

    } else {
 
    }
  } catch (error) {

  }
};


  // Após receber o ID do diretor criado:
const enviarDepoimentos = async (id_director) => {
  try {
    const response = await fetch('https://appbiografiatpa.onrender.com/api/cadastrar/depoimentos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_director,
        depoimentos
      })
    });

    const data = await response.json();
    if (data.sucesso) {
      
    } else {
    
    }

  } catch (error) {
  
  }
};


//funcao validar data
const validarData = (data) => {
  const regexFormato = /^\d{4}-\d{2}-\d{2}$/;
  if (!regexFormato.test(data)) return false;

  const [ano, mes, dia] = data.split('-').map(Number);
  const dataObj = new Date(`${ano}-${mes}-${dia}`);
  
  return (
    dataObj instanceof Date &&
    !isNaN(dataObj.getTime()) &&
    dataObj.getFullYear() === ano &&
    dataObj.getMonth() + 1 === mes &&
    dataObj.getDate() === dia
  );
};



const handleSubmitActualizarDados = async e => {
  e.preventDefault();
  setEnviando(true);
  setCarregando(true); // inicia spinner

  setMensagem("");
   // limpa mensagem anterior
    
  setTipoMensagem("");  


  if (!validarData(form.nascimento)) {
  setErroNascimento("Data de nascimento inválida! Use o formato AAAA-MM-DD.");
  return;
} else {
  setErroNascimento(""); // limpa erro se a data for válida
}

  try {
   const formData = new FormData();

   
formData.append("name", form.name);
formData.append("nacionalidade", form.nacionalidade);
formData.append("nascimento", form.nascimento);
formData.append("falecimento", form.falecimento);
formData.append("email", form.email);
formData.append("cargo", form.cargo);
formData.append("ocupacao", form.ocupacao);
formData.append("link", form.link);
formData.append("biografia", form.biografia);
formData.append("data_publicacao", form.data_publicacao);




    // Envia o formulário
     const response = await fetch(`https://appbiografiatpa.onrender.com/api/actualizar/directores/${idDirector}`, {
      method: 'PUT',

      body: formData
    });
    const data = await response.json(); // 👈 pega o JSON da resposta

    if (response.ok && data.sucesso) {
     
  setMensagem('');

      //funcao para enviar imagens
       atualizarImagens(idDirector,imagens);

      //funcao para enviar qualificacoes
       atualizarQualificacoes(idDirector,qualificacoes);

       //funcao para enviar experiencias
       atualizarExperiencias(idDirector,experiencias);

      //funcao para enviar ediomas
      atualizarIdiomas(idDirector,idiomas);


      //função para enviar contactos
      atualizarContactos(idDirector, contactos);


      //funcao para premios
      atualizarPremios(idDirector,premios);


      //funcao para enviar depoimentos
      atualizarDepoimentos(idDirector,depoimentos);

     setMensagem_actualizar('Dados actualizados com sucesso');
      setTipoMensagem("sucesso");
  
    } else {
      setTipoMensagem("erro");
      setMensagem_actualizar('Erro ao actualizar dados. Tente novamente.');
      
    }

  } catch (err) {
    setTipoMensagem("erro");
    setMensagem_actualizar('Erro de conexão com o servidor.');
  }
   finally {
    setCarregando(false); // esconde spinner
    setTimeout(() => setMensagem_actualizar(""), 3000); // limpa msg
  }

  setEnviando(false);
};


//funcao para actualizar idiomas
const atualizarIdiomas = async (id_director, idiomas) => {
  try {
    const response = await fetch('https://appbiografiatpa.onrender.com/api/actualizar/idiomas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_director, idiomas })
    });
    const data = await response.json();
    if (data.sucesso) {
      
    } else {
    
    }
  } catch (error) {

  }
};


// funcao para actualizar experiencias
const atualizarExperiencias = async (id_director, experiencias) => {
  try {
    const response = await fetch('https://appbiografiatpa.onrender.com/api/actualizar/experiencias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_director, experiencias })
    });
    const data = await response.json();
    if (data.sucesso) {
      
    } else {
 
    }
  } catch (error) {

  }
};


// funcao para actualizar qualificacoes
const atualizarQualificacoes = async (id_director, qualificacoes) => {
  try {
    const response = await fetch('https://appbiografiatpa.onrender.com/api/actualizar/qualificacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_director, qualificacoes })
    });
    const data = await response.json();
    if (data.sucesso) {
 
    } else {
      
    }
  } catch (error) {
 
  }
};


// funcao para actualizar contactos
const atualizarContactos = async (id_director, contactos) => {
  try {
    const response = await fetch('https://appbiografiatpa.onrender.com/api/actualizar/contactos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_director, contactos })
    });
    const data = await response.json();
    if (data.sucesso) {
      
    } else {
      console.error("Erro:", data.erro);
    }
  } catch (error) {

  }
};


//funcao para actualizar premios
const atualizarPremios = async (id_director, premios) => {
  try {
    const response = await fetch('https://appbiografiatpa.onrender.com/api/actualizar/premios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_director, premios })
    });
    const data = await response.json();
    if (data.sucesso) {
      
    } else {
   
    }
  } catch (error) {

  }
};


//funcao para actualizar os depoimentos
const atualizarDepoimentos = async (id_director, depoimentos) => {
  try {
    const response = await fetch('https://appbiografiatpa.onrender.com/api/actualizar/depoimentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_director, depoimentos })
    });
    const data = await response.json();
    if (data.sucesso) {
 
    } else {
     
    }
  } catch (error) {
 
  }
};


const atualizarImagens = async (id_director, imagens) => {
  try {
    // 1. Atualizar descrições das imagens EXISTENTES (já têm id)
    const imagensExistentes = imagens.filter(img => !img.file && img.id);
    if (imagensExistentes.length > 0) {
      const response1 = await fetch('https://appbiografiatpa.onrender.com/api/actualizar/imagens', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imagens: imagensExistentes.map(img => ({
            id: img.id,
            descricao: img.descricao || ''
          }))
        })
      });

      const data1 = await response1.json();
      if (!data1.sucesso) {
   
      }
    }

    // 2. Enviar imagens NOVAS
    const imagensNovas = imagens.filter(img => img.file);
    if (imagensNovas.length > 0) {
      const formData = new FormData();
      formData.append('id_director', id_director);

      imagensNovas.forEach((img, i) => {
        formData.append('imagens', img.file);
        formData.append('descricoes', img.descricao || '');
      });

      const response2 = await fetch('https://appbiografiatpa.onrender.com/api/actualizar/novas-imagens', {
        method: 'PUT',
        body: formData
      });

      const data2 = await response2.json();
      if (!data2.sucesso) {
     
      } else {
       
      }
    }
  } catch (error) {

  }
};


const handleSubmit = async e => {
  e.preventDefault();
  setEnviando(true);
  setMensagem("");


   // limpa mensagem anterior
    
  setTipoMensagem(""); 

  if (!validarData(form.nascimento)) {
  setErroNascimento("Data de nascimento inválida! Use o formato AAAA-MM-DD.");
  return;
} else {
  setErroNascimento(""); // limpa erro se a data for válida
}

  try {
    const formData = new FormData();

    // Serializar os campos do formulário
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'depoimentos') {
        formData.append('depoimentos', JSON.stringify(value));
      } else if (Array.isArray(value)) {
        value.forEach((v, idx) => {
          formData.append(`${key}[${idx}]`, v);
        });
      } else {
        formData.append(key, value);
      }
    });

    //funcao para garantir que envia sempre uma data valida
    if (form.data_publicacao) {
  formData.append('data_publicacao', form.data_publicacao);
   } else {
  formData.append('data_publicacao', new Date().toISOString().slice(0, 19).replace('T', ' '));
   }

    // Envia o formulário
    const resp = await fetch('https://appbiografiatpa.onrender.com/api/cadastrar/directores', {
      method: 'POST',
      body: formData
    });

    const data = await resp.json(); // 👈 pega o JSON da resposta

    if (resp.ok && data.sucesso) {
      const idDiretor = data.id; // 👈 aqui está o ID do novo cadastro
   
      // Aqui você pode fazer outro fetch para cadastrar os depoimentos, se quiser separado:
      // await enviarDepoimentos(idDiretor);
      setTipoMensagem("sucesso");
      setMensagem('Cadastro realizado com sucesso!');
     
      //funcao para enviar imagens
       enviarImagens(idDiretor,imagens);

      //funcao para enviar qualificacoes
       enviarQualificacoes(idDiretor);

       //funcao para enviar experiencias
       enviarExperiencias(idDiretor,experiencias);

      //funcao para enviar ediomas
      enviarIdiomas (idDiretor,idiomas);


      //função para enviar contactos
      enviarContactos(idDiretor, contactos);


      //funcao para premios
      enviarPremios(idDiretor,premios);


      //funcao para enviar depoimentos
      enviarDepoimentos(idDiretor);


      setForm({ ...initialState, data_publicacao: getTodayDate() });
      setImagens([]);
      setImagemModal(null);

      //funcao para limpar todos registo dos campos input

      
      limparFormulario();
    } else {
      setTipoMensagem("erro"); 
      setMensagem('Erro ao cadastrar. Tente novamente.');

    }

  } catch (err) {
     setTipoMensagem("erro");
    setMensagem('Erro de conexão com o servidor.');
  }
   finally {
    setCarregando(false); // esconde spinner
    setTimeout(() => setMensagem(""), 3000); // limpa msg
  }

  setEnviando(false);
};

  const handleLogout = async () => {
    try {
      const res = await fetch('https://appbiografiatpa.onrender.com/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
      });

      const data = await res.json();
  

      // Redirecionar para login a tela principal
      navigate('/');
    } catch (err) {

    }
  };


// funcao para buscar todos os dados do director selecionado
const carregarDadosDoDirector = async (id) => {
  try {
   const resp = await fetch(`https://appbiografiatpa.onrender.com/api/directores/${id}`);
const data = await resp.json();


// Calcular idade com base na data de nascimento
let idade = '';
if (data.nascimento) {
  const hoje = new Date();
  const dataNasc = new Date(data.nascimento);
  let anos = hoje.getFullYear() - dataNasc.getFullYear();
  const m = hoje.getMonth() - dataNasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < dataNasc.getDate())) {
    anos--;
  }
  idade = anos >= 0 ? String(anos) : '';
}

// Preencher o formulário principal com idade incluída
setForm(prev => ({
  ...prev,
  id: data.id || null,
  name: data.nome || '',
  nacionalidade: data.nacionalidade || '',
  nascimento: data.nascimento ? data.nascimento.split('T')[0] : '',
  falecimento: data.falecimento ? data.falecimento.split('T')[0] : '',
  email: data.email || '',
  cargo: data.cargo || '',
  ocupacao: data.ocupacao || '',
  link: data.link || '',
  biografia: data.biografia || '',
  data_publicacao: data.data_publicacao || getTodayDate(),
  idade: idade // 
}));




    // Fotos
const imagensDoBanco = Array.isArray(data.fotos)
      ? data.fotos.map(foto => ({
          id: foto.id, // 👈 ID REAL do banco (INT)
          url: `https://appbiografiatpa.onrender.com/${foto.caminho}`,
          descricao: foto.descricao || '',
          file: null,
          rotate: 0,
        }))
      : [];

    setImagens(imagensDoBanco);

    // Idiomas
    setIdiomas(
      Array.isArray(data.idiomas) && data.idiomas.length > 0
        ? data.idiomas.map(idioma => ({ idioma }))
        : [{ idioma: '' }]
    );

    // Experiências
    setExperiencias(
      Array.isArray(data.experiencias) && data.experiencias.length > 0
        ? data.experiencias.map(desc => ({ descricao: desc }))
        : [{ descricao: '' }]
    );

    // Qualificações
    setQualificacoes(
      Array.isArray(data.qualificacoes_academica) && data.qualificacoes_academica.length > 0
        ? data.qualificacoes_academica.map(desc => ({ descricao: desc }))
        : [{ descricao: '' }]
    );

    // Depoimentos
    setDepoimentos(
      Array.isArray(data.depoimentos) && data.depoimentos.length > 0
        ? data.depoimentos.map(dep => ({
            nome: dep.nome || '',
            cargo: dep.cargo || '',
            mensagem: dep.mensagem || ''
          }))
        : [{ nome: '', cargo: '', mensagem: '' }]
    );

    // Prêmios
    setPremios(
      Array.isArray(data.premios) && data.premios.length > 0
        ? data.premios.map(p => ({
            titulo: p.titulo || '',
            descricao: p.descricao || ''
          }))
        : [{ titulo: '', descricao: '' }]
    );

    // Contactos (caso esteja no retorno)
    if (data.contactos && Array.isArray(data.contactos)) {
      setContactos(
        data.contactos.map(c => ({ telefone: c.telefone }))
      );
    } else {
      setContactos([{ telefone: '' }]);
    }

  } catch (error) {

  }
};





   const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  const confirmarSaida = () => {
    handleLogout();
    setMostrarConfirmacao(false);
  };


const limparFormulario = () => {
  setForm({
    name: '',
    nacionalidade: '',
    nascimento: '',
    falecimento: '',
    email: '',
    cargo: '',
    ocupacao: '',
    link: '',
    biografia: '',
    data_publicacao: '',
    // e qualquer outro campo que você esteja usando
  });

  setIdiomas([]);
  setExperiencias([]);
  setQualificacoes([]);
  setContactos([]);
  setPremios([]);
  setDepoimentos([]);
  setImagens([]);
  setImagemModal(null);

  if (fileInputRef.current) fileInputRef.current.value = '';
};





const deletarDirector = async (id) => {

  try {
    const response = await fetch(`https://appbiografiatpa.onrender.com/api/deletar/director/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (data.sucesso) {

      setMostrarConfirmacaoDeletar(false);
      handleNavegacao('listar'); 
      // Aqui você pode atualizar a lista ou redirecionar
      // Ex: atualizarListaDeDirectores();
    } else {
     setTipoMensagem("erro");
      setMensagem_actualizar("Erro ao deletar o diretor.");
    }
  } catch (error) {
      setTipoMensagem("erro");
      setMensagem_actualizar("Erro ao deletar o diretor.");
  }
};




  useEffect(() => {
  if (idDirector) {
    carregarDadosDoDirector(idDirector);
  }
}, [idDirector]);

  




  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8 mb-8">

      {/* Barra de Navegação */}
<div className="bg-white p-4 rounded-2xl shadow-lg mb-8 flex flex-wrap justify-center gap-4 border border-gray-200">
 <button
  onClick={() => { 
    handleNavegacao('listar'); 
    limparFormulario();
  }}
  className={`px-6 py-2 text-sm font-semibold transition duration-200 rounded-full focus:outline-none inline-flex items-center
    ${paginaAtual === 'listar' 
      ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' 
      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
>
  <ListBulletIcon className="w-5 h-5 mr-2" />
  Listar Directores
</button>

<button
  onClick={() => {
    handleNavegacao('cadastrar');
    limparFormulario(); // ← limpa os campos ao entrar em modo de cadastro
  }}
  className={`px-6 py-2 text-sm font-semibold transition duration-200 rounded-full focus:outline-none inline-flex items-center
    ${paginaAtual === 'cadastrar' 
      ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' 
      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
>
  <UserPlusIcon className="w-5 h-5 mr-2" />
  Cadastrar Directores
</button>

<button
  onClick={() => {
    handleNavegacao('actualizar');
    carregarDadosDoDirector(idDirector);
    setMostrarFormulario(false); // volta a mostrar a lista ao clicar no botão
  }}
  className={`px-6 py-2 text-sm font-semibold transition duration-200 rounded-full focus:outline-none inline-flex items-center
    ${paginaAtual === 'actualizar' && mostrarFormulario 
      ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' 
      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
>
  <ArrowPathIcon className="w-5 h-5 mr-2" />
  Actualizar Dados
</button>


<button
  onClick={() => setMostrarConfirmacao(true)}
  className="px-6 py-2 text-sm font-semibold bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition duration-200 focus:outline-none inline-flex items-center"
>
  <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
  Sair
</button>
</div>
        {paginaAtual === 'listar' && (
          <div>
           <Listar_Directores  />
          </div>
        )}




          {paginaAtual === 'cadastrar' && (
          <div>
             <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Cadastro de Directores</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow p-6 space-y-6 border border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Nome</label>
                <input name="name" value={form.name} onChange={handleChange} required className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Nome completo" />
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Link</label>
                <input name="link" value={form.link} onChange={handleChange} required className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Link externo (opcional)" />
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Idade</label>
                <div className="relative">
                  <input
                    name="idade"
                    value={form.idade ? form.idade + ' Anos' : ''}
                    readOnly
                    required
                    className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-gray-100 cursor-not-allowed pr-16"
                    placeholder="Idade"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Nacionalidade</label>
                <Select
                  options={countryOptions}
                  value={countryOptions.find(opt => opt.label === form.nacionalidade) || null}
                  onChange={handleCountryChange}
                  isClearable={false}
                  placeholder="Selecione a nacionalidade..."
                  classNamePrefix="react-select"
                  formatOptionLabel={option => (
                    <div className="flex items-center gap-2">
                      <ReactCountryFlag countryCode={option.value} svg style={{ width: '1.5em', height: '1.5em' }} />
                      <span>{option.label}</span>
                    </div>
                  )}
                  styles={{
                    control: (base) => ({ ...base, minHeight: '48px', borderRadius: '0.5rem', borderColor: '#bfdbfe', boxShadow: 'none' }),
                    option: (base, state) => ({ ...base, padding: '10px 16px', backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#e0e7ff' : 'white', color: state.isSelected ? 'white' : '#1e293b' }),
                  }}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Ocupação</label>
                <input name="ocupacao" value={form.ocupacao} onChange={handleChange} required className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Ocupação" />
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Nascimento</label>
                <input type="date"  min={dataMin} max={dataMax} name="nascimento" value={form.nascimento} onChange={handleChange} required className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Data de nascimento" />
              {erroNascimento && (
            <div className="text-red-600 mt-1 text-sm font-medium">
              {erroNascimento}
            </div>
             )}
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Falecimento</label>
                <input type="date"  min={dataMin} max={dataMax} name="falecimento" value={form.falecimento} onChange={handleChange}  className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Data de falecimento (opcional)" />
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Cargo</label>
                <input name="cargo" value={form.cargo} onChange={handleChange} required className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Cargo" />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-blue-800 mb-1">Biografia</label>
              <textarea name="biografia" value={form.biografia} onChange={handleChange} rows={5} required className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Biografia detalhada do director" />
            </div>


            <div>
  
  
</div>
            {/* Imagens */}
            <div className="mt-6">
              <label className="block font-semibold">Galerias de Fotos</label>
              <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleImageChange} className="file-input file-input-bordered w-full" />
              {imagens.length > 0 && (
                <div className="flex items-center gap-4 mt-2 mb-2">
                  <button
                    type="button"
                    className={`bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed`}
                    onClick={handleDeleteSelectedImages}
                    disabled={selectedImagesToDelete.length === 0}
                  >
                    Excluir Selecionadas
                  </button>
                  <span className="text-sm text-gray-500">
                    {selectedImagesToDelete.length === 0
                      ? 'Nenhuma imagem selecionada'
                      : `${selectedImagesToDelete.length} imagem${selectedImagesToDelete.length > 1 ? 's' : ''} selecionada${selectedImagesToDelete.length > 1 ? 's' : ''}`}
                  </span>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {imagens.map(img => (
                  <div key={img.id} className="relative flex flex-col items-center">
                    <input
                      type="checkbox"
                      checked={selectedImagesToDelete.includes(img.id)}
                      onChange={() => handleToggleSelectImage(img.id)}
                      className="absolute top-1 left-1 w-4 h-4 accent-blue-600 z-10 bg-white border border-blue-300 rounded"
                      title="Selecionar para exclusão em lote"
                    />
                    <img
                      src={img.url}
                      className="w-20 h-20 object-cover rounded cursor-pointer border-2 border-blue-200"
                      style={{ transform: `rotate(${img.rotate}deg)` }}
                      onClick={() => setImagemModal(img)}
                    />
                    <input
                      type="text"
                      placeholder="Descrição da imagem"
                      value={img.descricao}
                      onChange={e => handleImageDescricaoChange(img.id, e.target.value)}
                      className="mt-1 text-xs p-1 border rounded w-20"
                    />
                    <button
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5"
                      type="button"
                      onClick={() => handleRemoveImage(img.id)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Arrays dinâmicos */}
        
        <div>
  <label className="block font-semibold capitalize">Qualificações Acadêmicas</label>
  {qualificacoes.map((item, index) => (
    <div key={index} className="flex gap-2 mb-1">
      <input
        value={item.descricao}
        onChange={e => handleChangeQualificacao(index, e.target.value)}
        className="input input-bordered w-full rounded border-gray-300 p-2"
        placeholder="Descrição da qualificação"
      />
      <button type="button" onClick={() => handleRemoveQualificacao(index)} className="text-red-500 font-bold">-</button>
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddQualificacao}
    className={`text-blue-600 font-bold ${
      qualificacoes.length > 0 && qualificacoes[qualificacoes.length - 1].descricao.trim() === ''
        ? 'opacity-50 cursor-not-allowed'
        : ''
    }`}
    disabled={
      qualificacoes.length > 0 && qualificacoes[qualificacoes.length - 1].descricao.trim() === ''
    }
  >
    Adicionar
  </button>
</div>


{/* Experiências Profissionais com objetos */}
<div>
  <label className="block font-semibold capitalize">Experiências Profissionais</label>
  {experiencias.map((item, index) => (
    <div key={index} className="flex gap-2 mb-1">
      <input
        value={item.descricao}
        onChange={e => handleChangeExperiencia(index, e.target.value)}
        className="input input-bordered w-full rounded border-gray-300 p-2"
        placeholder="Descrição da experiência"
      />
      <button type="button" onClick={() => handleRemoveExperiencia(index)} className="text-red-500 font-bold">-</button>
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddExperiencia}
    className={`text-blue-600 font-bold ${
      experiencias.length > 0 && experiencias[experiencias.length - 1].descricao.trim() === ''
        ? 'opacity-50 cursor-not-allowed'
        : ''
    }`}
    disabled={
      experiencias.length > 0 && experiencias[experiencias.length - 1].descricao.trim() === ''
    }
  >
    Adicionar
  </button>
</div>

{/* Idiomas */}
<div>
  <label className="block font-semibold capitalize">Idiomas</label>
  {idiomas.map((item, index) => (
    <div key={index} className="flex gap-2 mb-1">
      <input
        value={item.idioma}
        onChange={e => handleChangeIdioma(index, e.target.value)}
        className="input input-bordered w-full rounded border-gray-300 p-2"
        placeholder="Ex: Português, Inglês, Kimbundu"
      />
      <button
        type="button"
        onClick={() => handleRemoveIdioma(index)}
        className="text-red-500 font-bold"
      >
        -
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddIdioma}
    className={`text-blue-600 font-bold ${
      idiomas.length > 0 && idiomas[idiomas.length - 1].idioma.trim() === ''
        ? 'opacity-50 cursor-not-allowed'
        : ''
    }`}
    disabled={
      idiomas.length > 0 && idiomas[idiomas.length - 1].idioma.trim() === ''
    }
  >
    Adicionar
  </button>
</div>

{/* Contactos */}
<div>
  <label className="block font-semibold capitalize">Contactos (Telefone)</label>
  {contactos.map((item, index) => (
    <div key={index} className="flex gap-2 mb-1">
      <input
        value={item.telefone}
        onChange={e => handleChangeContacto(index, e.target.value)}
        className="input input-bordered w-full rounded border-gray-300 p-2"
        placeholder="Ex: +244 912 345 678"
        maxLength={9}
      />
      <button
        type="button"
        onClick={() => handleRemoveContacto(index)}
        className="text-red-500 font-bold"
      >
        -
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddContacto}
    className={`text-blue-600 font-bold ${
      contactos.length > 0 && contactos[contactos.length - 1].telefone.trim() === ''
        ? 'opacity-50 cursor-not-allowed'
        : ''
    }`}
    disabled={
      contactos.length > 0 && contactos[contactos.length - 1].telefone.trim() === ''
    }
  >
    Adicionar
  </button>
</div>

<div className="mb-4">
  <label htmlFor="email" className="block font-semibold">Email</label>
  <input
    type="email"
    id="email"
    value={form.email}
    onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
    className="input input-bordered w-full rounded border-gray-300 p-2"
    placeholder="exemplo@dominio.com"
  />
</div>

{/* Prêmios */}
<div>
  <label className="block font-semibold mb-1">Prêmios</label>
  {premios.map((item, index) => (
    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
      <input
        type="text"
        value={item.titulo}
        onChange={e => handleChangePremio(index, 'titulo', e.target.value)}
        className="input input-bordered w-full rounded border-gray-300 p-2"
        placeholder="Título do prêmio"
      />
      <div className="flex gap-2">
        <input
          type="text"
          value={item.descricao}
          onChange={e => handleChangePremio(index, 'descricao', e.target.value)}
          className="input input-bordered w-full rounded border-gray-300 p-2"
          placeholder="Descrição"
        />
        <button
          type="button"
          onClick={() => handleRemovePremio(index)}
          className="text-red-500 font-bold"
        >
          -
        </button>
      </div>
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddPremio}
    className={`text-blue-600 font-bold ${
      premios.length > 0 && (
        premios[premios.length - 1].titulo.trim() === '' ||
        premios[premios.length - 1].descricao.trim() === ''
      ) ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    disabled={
      premios.length > 0 && (
        premios[premios.length - 1].titulo.trim() === '' ||
        premios[premios.length - 1].descricao.trim() === ''
      )
    }
  >
    Adicionar prêmio
  </button>
</div>


      
<div className="mt-6">
  <label className="block font-semibold">Depoimentos</label>
  {Array.isArray(depoimentos) && depoimentos.map((dep, idx) => (
    <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
      <input
        type="text"
        placeholder="Nome"
        value={dep.nome}
        onChange={(e) => handleDepoimentoChange(idx, 'nome', e.target.value)}
        className="input input-bordered w-full rounded border-gray-300 p-2"
      />
      <input
        type="text"
        placeholder="Cargo"
        value={dep.cargo}
        onChange={(e) => handleDepoimentoChange(idx, 'cargo', e.target.value)}
        className="input input-bordered w-full rounded border-gray-300 p-2"
      />
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Mensagem"
          value={dep.mensagem}
          onChange={(e) => handleDepoimentoChange(idx, 'mensagem', e.target.value)}
          className="input input-bordered w-full rounded border-gray-300 p-2"
        />
        <button
          type="button"
          onClick={() => handleRemoveDepoimento(idx)}
          className="text-red-500 font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddDepoimento}
    className="text-blue-600 font-bold mt-2"
  >
    Adicionar Depoimento
  </button>
</div>
        <div className="flex flex-col items-center mt-8 gap-2">
                   <button
  type="submit"
  className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all flex items-center gap-2"
  disabled={enviando}
>
            {enviando ? (
    <>
      <AiOutlineLoading className="animate-spin w-5 h-5" />
      Enviando...
    </>
  ) : (
    'Salvar Dados'
  )}
</button>
       {mensagem && tipoMensagem !== 'erro' &&(
  <div className="text-green-600 flex items-center gap-2 font-semibold text-center mt-2">
    <BsCheckCircleFill className="text-green-500 w-5 h-5" />
    {mensagem}
  </div>
)}
       {mensagem && tipoMensagem === 'erro' &&(
  <div className="text-red-600 flex items-center gap-2 font-semibold text-center mt-2">
         <BsExclamationCircleFill className="text-red-500 w-5 h-5" />
    {mensagem}
  </div>
)}
        </div>
      </form>
          </div>
        )}
  

     {/* chamando o componente listar director para actualizar */}
    {paginaAtual === 'actualizar' && !mostrarFormulario && (
  <div>
    <Listar_Directores_Actualizar_Dados onSelecionar={handleSelecionarDirector} />
  </div>
   )}

   {paginaAtual === 'actualizar' && mostrarFormulario && (
          <div>
                 <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Actualização de Dados de Directores</h2>
      <form onSubmit={handleSubmitActualizarDados} className="space-y-6">
        <button
  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-1.5 px-4 rounded-lg shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
  onClick={() =>  setMostrarConfirmacaoDeletar(true)}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
  Excluir Director
</button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow p-6 space-y-6 border border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Nome</label>
                <input name="name" value={form.name} onChange={handleChange} required className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Nome completo" />
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Link</label>
                <input name="link" value={form.link} onChange={handleChange} required className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Link externo (opcional)" />
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Idade</label>
                <div className="relative">
                  <input
                    name="idade"
                    value={form.idade ? form.idade + ' Anos' : ''}
                    readOnly
                    required
                    className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-gray-100 cursor-not-allowed pr-16"
                    placeholder="Idade"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Nacionalidade</label>
                <Select
                  options={countryOptions}
                  value={countryOptions.find(opt => opt.label === form.nacionalidade) || null}
                  onChange={handleCountryChange}
                  isClearable={false}
                  placeholder="Selecione a nacionalidade..."
                  classNamePrefix="react-select"
                  formatOptionLabel={option => (
                    <div className="flex items-center gap-2">
                      <ReactCountryFlag countryCode={option.value} svg style={{ width: '1.5em', height: '1.5em' }} />
                      <span>{option.label}</span>
                    </div>
                  )}
                  styles={{
                    control: (base) => ({ ...base, minHeight: '48px', borderRadius: '0.5rem', borderColor: '#bfdbfe', boxShadow: 'none' }),
                    option: (base, state) => ({ ...base, padding: '10px 16px', backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#e0e7ff' : 'white', color: state.isSelected ? 'white' : '#1e293b' }),
                  }}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Ocupação</label>
                <input name="ocupacao" value={form.ocupacao} onChange={handleChange} required className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Ocupação" />
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Nascimento</label>
                <input type="date"  min={dataMin}  max={dataMax} name="nascimento" value={form.nascimento} onChange={handleChange} required className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Data de nascimento" />
              {erroNascimento && (
            <div className="text-red-600 mt-1 text-sm font-medium">
              {erroNascimento}
            </div>
             )}
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Falecimento</label>
                <input type="date"  min={dataMin} max={dataMax} name="falecimento" value={form.falecimento} onChange={handleChange}  className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Data de falecimento (opcional)" />
              </div>
              <div>
                <label className="block font-semibold text-blue-800 mb-1">Cargo</label>
                <input name="cargo" value={form.cargo} onChange={handleChange} required className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Cargo" />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-blue-800 mb-1">Biografia</label>
              <textarea name="biografia" value={form.biografia} onChange={handleChange} rows={5} required className="input input-bordered w-full rounded-lg border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 bg-white" placeholder="Biografia detalhada do director" />
            </div>


            <div>
  
  
</div>
            {/* Imagens */}
            <div className="mt-6">
              <label className="block font-semibold">Galerias de Fotos</label>
              <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleImageChange} className="file-input file-input-bordered w-full" />
              {imagens.length > 0 && (
                <div className="flex items-center gap-4 mt-2 mb-2">
                  <button
                    type="button"
                    className={`bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed`}
                    onClick={handleDeleteSelectedImages}
                    disabled={selectedImagesToDelete.length === 0}
                  >
                    Excluir Selecionadas
                  </button>
                  <span className="text-sm text-gray-500">
                    {selectedImagesToDelete.length === 0
                      ? 'Nenhuma imagem selecionada'
                      : `${selectedImagesToDelete.length} imagem${selectedImagesToDelete.length > 1 ? 's' : ''} selecionada${selectedImagesToDelete.length > 1 ? 's' : ''}`}
                  </span>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {imagens.map(img => (
                  <div key={img.id} className="relative flex flex-col items-center">
                    <input
                      type="checkbox"
                      checked={selectedImagesToDelete.includes(img.id)}
                      onChange={() => handleToggleSelectImage(img.id)}
                      className="absolute top-1 left-1 w-4 h-4 accent-blue-600 z-10 bg-white border border-blue-300 rounded"
                      title="Selecionar para exclusão em lote"
                    />
                    <img
                      src={img.url}
                      className="w-20 h-20 object-cover rounded cursor-pointer border-2 border-blue-200"
                      style={{ transform: `rotate(${img.rotate}deg)` }}
                      onClick={() => setImagemModal(img)}
                    />
                    <input
                      type="text"
                      placeholder="Descrição da imagem"
                      value={img.descricao}
                      onChange={e => handleImageDescricaoChange(img.id, e.target.value)}
                      className="mt-1 text-xs p-1 border rounded w-20"
                    />
                    <button
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5"
                      type="button"
                      onClick={() => handleRemoveImage(img.id)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Arrays dinâmicos */}
        
        <div>
  <label className="block font-semibold capitalize">Qualificações Acadêmicas</label>
  {qualificacoes.map((item, index) => (
    <div key={index} className="flex gap-2 mb-1">
      <input
        value={item.descricao}
        onChange={e => handleChangeQualificacao(index, e.target.value)}
        className="input input-bordered w-full rounded border-gray-300 p-2"
        placeholder="Descrição da qualificação"
      />
      <button type="button" onClick={() => handleRemoveQualificacao(index)} className="text-red-500 font-bold">-</button>
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddQualificacao}
    className={`text-blue-600 font-bold ${
      qualificacoes.length > 0 && qualificacoes[qualificacoes.length - 1].descricao.trim() === ''
        ? 'opacity-50 cursor-not-allowed'
        : ''
    }`}
    disabled={
      qualificacoes.length > 0 && qualificacoes[qualificacoes.length - 1].descricao.trim() === ''
    }
  >
    Adicionar
  </button>
</div>


{/* Experiências Profissionais com objetos */}
<div>
  <label className="block font-semibold capitalize">Experiências Profissionais</label>
  {experiencias.map((item, index) => (
    <div key={index} className="flex gap-2 mb-1">
      <input
        value={item.descricao}
        onChange={e => handleChangeExperiencia(index, e.target.value)}
        className="input input-bordered w-full rounded border-gray-300 p-2"
        placeholder="Descrição da experiência"
      />
      <button type="button" onClick={() => handleRemoveExperiencia(index)} className="text-red-500 font-bold">-</button>
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddExperiencia}
    className={`text-blue-600 font-bold ${
      experiencias.length > 0 && experiencias[experiencias.length - 1].descricao.trim() === ''
        ? 'opacity-50 cursor-not-allowed'
        : ''
    }`}
    disabled={
      experiencias.length > 0 && experiencias[experiencias.length - 1].descricao.trim() === ''
    }
  >
    Adicionar
  </button>
</div>

{/* Idiomas */}
<div>
  <label className="block font-semibold capitalize">Idiomas</label>
  {idiomas.map((item, index) => (
    <div key={index} className="flex gap-2 mb-1">
      <input
        value={item.idioma}
        onChange={e => handleChangeIdioma(index, e.target.value)}
        className="input input-bordered w-full rounded border-gray-300 p-2"
        placeholder="Ex: Português, Inglês, Kimbundu"
      />
      <button
        type="button"
        onClick={() => handleRemoveIdioma(index)}
        className="text-red-500 font-bold"
      >
        -
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddIdioma}
    className={`text-blue-600 font-bold ${
      idiomas.length > 0 && idiomas[idiomas.length - 1].idioma.trim() === ''
        ? 'opacity-50 cursor-not-allowed'
        : ''
    }`}
    disabled={
      idiomas.length > 0 && idiomas[idiomas.length - 1].idioma.trim() === ''
    }
  >
    Adicionar
  </button>
</div>

{/* Contactos */}
<div>
  <label className="block font-semibold capitalize">Contactos (Telefone)</label>
  {contactos.map((item, index) => (
    <div key={index} className="flex gap-2 mb-1">
      <input
        value={item.telefone}
        onChange={e => handleChangeContacto(index, e.target.value)}
        className="input input-bordered w-full rounded border-gray-300 p-2"
        placeholder="Ex: +244 912 345 678"
        maxLength={9}
      />
      <button
        type="button"
        onClick={() => handleRemoveContacto(index)}
        className="text-red-500 font-bold"
      >
        -
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddContacto}
    className={`text-blue-600 font-bold ${
      contactos.length > 0 && contactos[contactos.length - 1].telefone.trim() === ''
        ? 'opacity-50 cursor-not-allowed'
        : ''
    }`}
    disabled={
      contactos.length > 0 && contactos[contactos.length - 1].telefone.trim() === ''
    }
  >
    Adicionar
  </button>
</div>

<div className="mb-4">
  <label htmlFor="email" className="block font-semibold">Email</label>
  <input
    type="email"
    id="email"
    value={form.email}
    onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
    className="input input-bordered w-full rounded border-gray-300 p-2"
    placeholder="exemplo@dominio.com"
  />
</div>

{/* Prêmios */}
<div>
  <label className="block font-semibold mb-1">Prêmios</label>
  {premios.map((item, index) => (
    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
      <input
        type="text"
        value={item.titulo}
        onChange={e => handleChangePremio(index, 'titulo', e.target.value)}
        className="input input-bordered w-full rounded border-gray-300 p-2"
        placeholder="Título do prêmio"
      />
      <div className="flex gap-2">
        <input
          type="text"
          value={item.descricao}
          onChange={e => handleChangePremio(index, 'descricao', e.target.value)}
          className="input input-bordered w-full rounded border-gray-300 p-2"
          placeholder="Descrição"
        />
        <button
          type="button"
          onClick={() => handleRemovePremio(index)}
          className="text-red-500 font-bold"
        >
          -
        </button>
      </div>
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddPremio}
    className={`text-blue-600 font-bold ${
      premios.length > 0 && (
        premios[premios.length - 1].titulo.trim() === '' ||
        premios[premios.length - 1].descricao.trim() === ''
      ) ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    disabled={
      premios.length > 0 && (
        premios[premios.length - 1].titulo.trim() === '' ||
        premios[premios.length - 1].descricao.trim() === ''
      )
    }
  >
    Adicionar prêmio
  </button>
</div>


      
<div className="mt-6">
  <label className="block font-semibold">Depoimentos</label>
  {Array.isArray(depoimentos) && depoimentos.map((dep, idx) => (
    <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
      <input
        type="text"
        placeholder="Nome"
        value={dep.nome}
        onChange={(e) => handleDepoimentoChange(idx, 'nome', e.target.value)}
        className="input input-bordered w-full rounded border-gray-300 p-2"
      />
      <input
        type="text"
        placeholder="Cargo"
        value={dep.cargo}
        onChange={(e) => handleDepoimentoChange(idx, 'cargo', e.target.value)}
        className="input input-bordered w-full rounded border-gray-300 p-2"
      />
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Mensagem"
          value={dep.mensagem}
          onChange={(e) => handleDepoimentoChange(idx, 'mensagem', e.target.value)}
          className="input input-bordered w-full rounded border-gray-300 p-2"
        />
        <button
          type="button"
          onClick={() => handleRemoveDepoimento(idx)}
          className="text-red-500 font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  ))}
  <button
    type="button"
    onClick={handleAddDepoimento}
    className="text-blue-600 font-bold mt-2"
  >
    Adicionar Depoimento
  </button>
</div>
        <div className="flex flex-col items-center mt-8 gap-2">
          <button
  type="submit"
  className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all flex items-center gap-2"
  disabled={enviando}
>
  {enviando ? (
    <>
      <AiOutlineLoading className="animate-spin w-5 h-5" />
      Actualizando...
    </>
  ) : (
    'Actualizar Dados'
  )}
</button>
       {mensagem_actualizar && tipoMensagem !== 'erro' &&(
  <div className="text-green-600 flex items-center gap-2 font-semibold text-center mt-2">
    <BsCheckCircleFill className="text-green-500 w-5 h-5" />
    {mensagem_actualizar}
  </div>
)}
       {mensagem_actualizar && tipoMensagem === 'erro' &&(
  <div className="text-red-600 flex items-center gap-2 font-semibold text-center mt-2">
         <BsExclamationCircleFill className="text-red-500 w-5 h-5" />
    {mensagem_actualizar}
  </div>
)}

        </div>
      </form>
          </div>
        )}

     {/* Modal de visualização de imagem */}
{imagemModal && (
  <div
    className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
    onClick={() => setImagemModal(null)}
  >
    <div
      className="bg-white p-6 rounded-2xl shadow-2xl relative max-w-lg w-full flex flex-col items-center animate-fadeIn"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex flex-row items-center w-full justify-center relative">
        {/* Botão Anterior */}
        <button
          type="button"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-1.5 shadow focus:outline-none disabled:opacity-30 z-10 transition-all duration-150"
          style={{ fontSize: 20, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => {
            const idx = imagens.findIndex(img => img.id === imagemModal.id);
            if (idx > 0) {
              setImagemModal({ ...imagens[idx - 1], rotate: imagens[idx - 1].rotate || 0 });
            }
          }}
          disabled={imagens.findIndex(img => img.id === imagemModal.id) === 0}
          aria-label="Anterior"
        >
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>&#8592;</span>
        </button>

        <img
          src={imagemModal.url}
          style={{ transform: `rotate(${imagemModal.rotate}deg)` }}
          className="rounded-lg border-4 border-blue-200 shadow-lg object-contain bg-gray-50 mx-8"
          alt="Visualização"
          width={350}
          height={350}
        />

        {/* Botão Próxima */}
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-1.5 shadow focus:outline-none disabled:opacity-30 z-10 transition-all duration-150"
          style={{ fontSize: 20, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => {
            const idx = imagens.findIndex(img => img.id === imagemModal.id);
            if (idx < imagens.length - 1) {
              setImagemModal({ ...imagens[idx + 1], rotate: imagens[idx + 1].rotate || 0 });
            }
          }}
          disabled={imagens.findIndex(img => img.id === imagemModal.id) === imagens.length - 1}
          aria-label="Próxima"
        >
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>&#8594;</span>
        </button>
      </div>

      <div className="text-gray-600 text-xs mt-2 max-w-xs text-center truncate">
        {imagens.find(img => img.id === imagemModal.id)?.descricao || 'Sem descrição'}
      </div>

      <div className="flex flex-wrap gap-3 mt-6 justify-center w-full">
        <button
          type="button"
          className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-semibold transition"
          onClick={() => setImagemModal(imagemModal => ({ ...imagemModal, rotate: (imagemModal.rotate - 90 + 360) % 360 }))}
        >
          Rotacionar -90°
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-semibold transition"
          onClick={() => setImagemModal(imagemModal => ({ ...imagemModal, rotate: (imagemModal.rotate + 90) % 360 }))}
        >
          Rotacionar +90°
        </button>

        {/* 🧠 Correção aqui */}
        <button
          type="button"
          className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold transition"
          onClick={() => {
            const idx = imagens.findIndex(img => img.id === imagemModal.id);
            const idParaExcluir = imagemModal.id;

            // Remove e atualiza estado de forma segura
            setImagens(prev => {
              const novas = prev.filter(img => img.id !== idParaExcluir);

              if (novas.length > 0) {
                if (idx < novas.length) {
                  setImagemModal(novas[idx]); // próxima
                } else if (idx - 1 >= 0) {
                  setImagemModal(novas[idx - 1]); // anterior
                } else {
                  setImagemModal(null);
                }
              } else {
                setImagemModal(null);
              }

              // Executa a função de remoção
              handleRemoveImage(idParaExcluir);
              return novas;
            });
          }}
        >
          Excluir
        </button>

        <button
          type="button"
          className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg font-semibold transition"
          onClick={() => {
            setImagens(prev => prev.map(img => img.id === imagemModal.id ? { ...img, rotate: imagemModal.rotate } : img));
            setImagemModal(null);
          }}
        >
          Salvar
        </button>
      </div>

      <button
        type="button"
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
        onClick={() => setImagemModal(null)}
        aria-label="Fechar modal"
      >
        &times;
      </button>
    </div>
  </div>
)}


          {/* Modal de Confirmação */}
      {mostrarConfirmacao && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center space-y-4 border border-red-100">
            <h2 className="text-lg font-bold text-red-700">Deseja realmente sair?</h2>
            <p className="text-gray-600">Você será desconectado do sistema.</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={confirmarSaida}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
              >
                Sim
              </button>
              <button
                onClick={() => setMostrarConfirmacao(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

{mostrarConfirmacaoDeletar && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
    <div className="bg-white w-full max-w-sm rounded-xl shadow-xl p-6 border border-red-200 text-center space-y-4 animate-fadeIn">
      <h2 className="text-lg font-semibold text-red-700">Deseja realmente excluir este diretor?</h2>
      <p className="text-sm text-gray-600">Essa ação é <strong>irreversível</strong> e apagará todos os dados associados.</p>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => deletarDirector(idDirector)}
          className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
        >
          Sim, Excluir
        </button>
        <button
          onClick={() => setMostrarConfirmacaoDeletar(false)}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default App;
