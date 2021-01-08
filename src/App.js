import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

function App() {

  const dataFiguras = [
    { id: 1, nombre: "cuadrado" },
    { id: 2, nombre: "reactangulo" },
    { id: 3, nombre:  "circulo" },
    { id: 4, nombre: "triangulo" },
    { id: 5, nombre: "octagono" },
    
  ];

  const [data, setData] = useState(dataFiguras);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [figuraSeleccionada, setFiguraSeleccionada] = useState({
    id: '',
    nombre: ''
  });

  const [search, setSearch] = useState("");
  const [figurasFiltradas, setFigurasFiltradas] = useState([]);

  useEffect(() => {
    setFigurasFiltradas(
      data.filter((figura) =>
        figura.nombre.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  const seleccionarFigura=(elemento, caso)=>{
setFiguraSeleccionada(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setFiguraSeleccionada((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(figura=>{
      if(figura.id===figuraSeleccionada.id){
        figura.nombre=figuraSeleccionada.nombre;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(figura=>figura.id!==figuraSeleccionada.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setFiguraSeleccionada(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=figuraSeleccionada;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  return (
    <div className="App">
      <h2>Listado de Figuras</h2>
      <br />
      
      <input
        type="text"
        placeholder="Buscar figuras"
        onChange={(e) => setSearch(e.target.value)}
      />
    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
    <br /><br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {figurasFiltradas.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td><button className="btn btn-primary" onClick={()=>seleccionarFigura(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>seleccionarFigura(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Figura</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={figuraSeleccionada && figuraSeleccionada.id}
            />
            <br />

            <label>Figura</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={figuraSeleccionada && figuraSeleccionada.nombre}
              onChange={handleChange}
            />
            <br />

            
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar la figura {figuraSeleccionada && figuraSeleccionada.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>


        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Figura</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length-1].id+1}
            />
            <br />

            <label>Figura</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={figuraSeleccionada ? figuraSeleccionada.nombre: ''}
              onChange={handleChange}
            />
            <br />

           
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;