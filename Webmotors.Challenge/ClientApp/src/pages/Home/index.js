import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Home extends Component {

    state = {
        load: true,
        anuncios: []
    }
       
    async updateList() {

        this.setState({ load: true });
        const data = await fetch("./api/AnuncioWebmotors")
        if (data.ok) {
            let anuncios = await data.json();
            this.setState({ anuncios, load: false });
        } else {
            this.setState({ load: false });
        }

    }

    async deleteItem(id) {
        let b = window.confirm("Apagar o anuncio de ID: " + id);
        if (b) {
            await fetch("./api/AnuncioWebmotors/" + id, {
                method: 'DELETE',
            })
            this.updateList();
        }

    }

    componentDidMount = () => this.updateList()

    render() {
        const { load, anuncios } = this.state;
        return (
            <div className="container">

                <div className="table-wrapper">
                    {(load) ? (
                        <h4>Carregando...</h4>
                    ) : (
                            <div>
                                <div className="table-title">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <h2>
                                                Anúncios <b>Webmotors</b>
                                            </h2>
                                        </div>
                                        <div className="col-sm-4">
                                            <Link className="btn btn-info add-new" to="/add">
                                                <i className="fa fa-plus"></i>
                                                Adicionar Novo
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Marca</th>
                                            <th>Modelo</th>
                                            <th>Versão</th>
                                            <th>Ano</th>
                                            <th>Quilometragem</th>
                                            <th>Observação</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            anuncios.map(anuncios => (
                                                <tr key={anuncios.id}>
                                                    <td>{anuncios.id}</td>
                                                    <td>{anuncios.marca}</td>
                                                    <td>{anuncios.modelo}</td>
                                                    <td>{anuncios.versao}</td>
                                                    <td>{anuncios.ano}</td>
                                                    <td>{anuncios.quilometragem}</td>
                                                    <td>{anuncios.observacao}</td>
                                                    <td>
                                                        <Link className="edit" title="Editar" data-toggle="tooltip" to={{
                                                            pathname: "edit/" + anuncios.id,
                                                            state: {anuncios}
                                                        }} >
                                                            <i className="material-icons">&#xE254;</i>
                                                        </Link>
                                                        <a className="delete" title="Deletar" data-toggle="tooltip" onClick={() => { this.deleteItem(anuncios.id) }}>
                                                            <i className="material-icons">&#xE872;</i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
                                            )
                                        }

                                    </tbody>
                                </table>
                            </div>
                        )}

                </div>
            </div>)
    }
}
export default Home;