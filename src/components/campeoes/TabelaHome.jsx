import { useState } from 'react';
import React from 'react';

function TabelaHome ({ listaObjetos }) {

    return (
        <div>
            <h1>Campeões</h1>
            {listaObjetos.length === 0 && <h1>Sem Campeões</h1>}
            {listaObjetos.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Dificuldade</th>
                            <th scope="col">Função</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.codigo}>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.dificuldade}</td>
                                <td>{objeto.funcao_nome}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TabelaHome;