import Alerta from '../Alerta';
import config from '../../Config';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TabelaHome from './TabelaHome';

function TabelaTeste ({ listaObjetos }) {

    return (
            <div style={{ padding: '20px' }}>
                <h1>Campeões</h1>
                <Link className="btn btn-primary" to="/cadastrarcampeao">
                    Novo <i className="bi bi-file-earmark-plus"></i>
                </Link>
                <Alerta alerta={alerta} />
                {listaObjetos.length === 0 && <h1>Nenhum campeão encontrado</h1>}
                {listaObjetos.length > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Código</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Dificuldade</th>
                                <th scope="col">Função</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaObjetos.map(objeto => (
                                <tr key={objeto.codigo}>
                                    <td>{objeto.codigo}</td>
                                    <td>{objeto.nome}</td>
                                    <td>{objeto.dificuldade}</td>
                                    <td>{objeto.funcao_nome}</td>
                                    <td>
                                        <Link className="btn btn-info"
                                            to={`/editarcampeao/${objeto.codigo}`}>
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
        )
}

export default TabelaTeste;