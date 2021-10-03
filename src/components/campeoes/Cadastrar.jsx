import { Redirect } from 'react-router-dom';
import config from '../../Config';
import { useState, useEffect } from 'react';

function Cadastrar({ pcodigo, atualizaAlerta, editar }) {

    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", dificuldade: "", funcao: ""
    })

    const [listaFuncoes, setListaFuncoes] = useState([]);

    const [redirecionar, setRedirecionar] = useState(false);

    const recuperar = async codigo => {
        await fetch(`${config.enderecoapi}/campeoes/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data[0]))
            .catch(err => console.log(err))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {
            try {
                const body = {
                    codigo: objeto.codigo,
                    nome: objeto.nome,
                    dificuldade: objeto.dificuldade,
                    funcao: objeto.funcao
                }
                const response = await fetch(config.enderecoapi + "/campeoes", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }).then(response => response.json())
                    .then(json => {
                        atualizaAlerta(json.status, json.message)
                    })

            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const body = {
                    nome: objeto.nome,
                    dificuldade: objeto.dificuldade,
                    funcao: objeto.funcao
                }
                const response = await fetch(config.enderecoapi + "/campeoes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }).then(response => response.json())
                    .then(json => {
                        atualizaAlerta(json.status, json.message)
                    })

            } catch (err) {
                console.log(err)
            }
        }
        setRedirecionar(true);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value })
    }

    const recuperaFuncoes = async () => {
        await fetch(`${config.enderecoapi}/funcoes`)
            .then(response => response.json())
            .then(data => setListaFuncoes(data))
            .catch(err => console.log('Erro: ' + err))
    }

    useEffect(() => {
        if (editar) {
            recuperar(pcodigo);
        } else {
            setObjeto({
                codigo: "", nome: "", dificuldade: "", funcao: ""
            });
        }
        recuperaFuncoes();
    }, []);

    if (redirecionar === true) {
        return <Redirect to="/campeoes" />
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Campeão</h2>
            <form id="formulario" onSubmit={acaoCadastrar}>
                <div >
                    <div className="form-group">
                        <label htmlFor="txtCodigo" className="form-label">
                            Código
                        </label>
                        <input
                            type="text"
                            readOnly
                            className="form-control"
                            id="txtCodigo"
                            name="codigo"
                            value={objeto.codigo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtNome" className="form-label">
                            Nome
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="txtNome"
                            name="nome"
                            value={objeto.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtDificuldade" className="form-label">
                            Dificuldade
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="txtDificuldade"
                            name="dificuldade"
                            value={objeto.dificuldade}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="selectFuncao" className="form-label">
                            Função
                        </label>
                        <select
                            required
                            className="form-control"
                            id="selectselectFuncaoPerson"
                            value={objeto.funcao}
                            name="funcao"
                            onChange={handleChange}>
                            <option disable="true" value="">(Selecione a função do campeão)</option>
                            {listaFuncoes.map((funcao) => (
                                <option key={funcao.codigo} value={funcao.codigo}>
                                    {funcao.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-success" >
                    Salvar  <i className="bi bi-save"></i>
                </button>

            </form>
        </div>
    )

}

export default Cadastrar;
