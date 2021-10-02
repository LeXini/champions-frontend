import { useEffect, useState } from 'react';
import Alerta from '../Alerta';
import config from '../../Config';
import { Link } from 'react-router-dom';

function Tabela ({ alerta, atualizaAlerta }) {
    const [listaObjetos, setListaObjetos] = useState([]);

    const recuperaFuncoes = async () => {
        await fetch(`${config.enderecoapi}/funcoes`)
        .then(response => response.json())
        .then(data => setListaObjetos(data))
        .catch(err => console.log('Erro: ' + err))
    }
    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')){
            try{
                await fetch(`${config.enderecoapi}/funcoes/${objeto.codigo}`,
                { method : "DELETE"})
                .then(response => response.json())
                .then(json => atualizaAlerta(json.status, json.message))
                recuperaFuncoes();
            } catch(err){
                console.log('Erro: ' + err)
            }
        }
    }

    useEffect( () => {
        recuperaFuncoes();
    },[]);

    return(
        <div>
            <h1>Funções</h1>
            <Link className="btn btn-primary" to="/cadastrarfuncao">
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Link>
            <Alerta alerta={alerta}/>
            {listaObjetos.length === 0 && <h1>Nenhuma função encontrada</h1>}
            {listaObjetos.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Característica</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.codigo}>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.caracteristica}</td>
                                <td>
                                    <Link className="btn btn-info" 
                                    to={`/editarfuncao/${objeto.codigo}`}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remover(objeto); }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );

}

export default Tabela;