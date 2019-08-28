import React, { Component } from 'react';

class Edit extends Component {

    state = {
        marcas: [],
        modelos: [],
        versoes: [],
        anuncios: {}
    };

    async updateAnuncio(event) {
        event.preventDefault();
        const { marca, modelo, versao, ano, quilometragem, observacao, state } = this;
        const { id } = state.anuncios;

        let body = {
            id,
            "marca": marca.options[marca.selectedIndex].text,
            "modelo": modelo.options[modelo.selectedIndex].text,
            "versao": versao.options[versao.selectedIndex].text,
            "ano": ano.value,
            "quilometragem": quilometragem.value,
            "observacao": observacao.value
        }
        const data = await fetch("./api/AnuncioWebmotors/" + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (data.ok) {
            window.location.href = "/";
        }

    }

    componentDidMount() {
        const { anuncios } = this.props.location.state
        this.setState({ anuncios });

        this.setOptionsListMarcas().then(() => {
            const { marcas } = this.state;
            let indexMarca = marcas.findIndex(item => item.Name == anuncios.marca);
            this.setOptionsListModelos(marcas[indexMarca].ID);
            this.setOptionsListVersao(marcas[indexMarca].ID);
        });
    }

    async setOptionsListMarcas() {
        const data = await fetch("http://desafioonline.webmotors.com.br/api/OnlineChallenge/Make", { mode: 'cors' })
        if (data.ok) {
            let marcas = await data.json();
            this.setState({ marcas })
        }

    }

    async setOptionsListModelos(id) {
        const data = await fetch("http://desafioonline.webmotors.com.br/api/OnlineChallenge/Model?MakeID=" + id, { mode: 'cors' })
        if (data.ok) {
            let modelos = await data.json();
            this.setState({ modelos })
        }
    }

    async setOptionsListVersao(id) {
        const data = await fetch("http://desafioonline.webmotors.com.br/api/OnlineChallenge/Version?ModelID=" + id, { mode: 'cors' })
        if (data.ok) {
            let versoes = await data.json();
            this.setState({ versoes })
        }
    }

    first = true;
    render() {
        const { marcas, modelos, versoes, anuncios, first } = this.state;
        let indexMarca = marcas.findIndex(item => item.Name == anuncios.marca);
        let indexModelo = modelos.findIndex(item => item.Name == anuncios.modelo);
        let indexVersao = versoes.findIndex(item => item.Name == anuncios.versao);

        if (marcas[indexMarca] && modelos[indexModelo] && versoes[indexVersao]) {
            this.first = false;
        }

        return (
            <div className="container text-center">
                <h2>Cadastro de Anúncios</h2>
                <form onSubmit={(event) => { this.updateAnuncio(event) }}>
                    <div className="form-group">
                        {(this.first ? marcas[indexMarca] && modelos[indexModelo] && versoes[indexVersao] : true) ? (<div>
                            <div className="form-group">
                                <label htmlFor="marcarSelect">Marca</label>
                                <select ref={element => this.marca = element} className="form-control" id="marcarSelect" required name="marca" defaultValue={(indexMarca != -1 ) ? marcas[indexMarca].ID:""} onChange={(event) => {
                                    this.setOptionsListModelos(event.target.value);
                                    this.setOptionsListVersao(event.target.value);
                                }}
                                >
                                    {
                                        marcas.map(item => (<option value={item.ID}  key={item.ID} > {item.Name} </option>))
                                    }

                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="ModeloSelect">Modelo</label>
                                <select ref={element => this.modelo = element} className="form-control" id="ModeloSelect" required defaultValue={(indexModelo != -1) ? modelos[indexModelo].ID:""}>
                                    {
                                        modelos.map(item => (<option value={item.ID} key={item.ID}> {item.Name} </option>))
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="VersaoSelect">Versão</label>
                                <select ref={element => this.versao = element} className="form-control" id="VersaoSelect" required defaultValue={(indexVersao != -1) ? versoes[indexVersao].ID:""}>
                                    {
                                        versoes.map(item => (<option value={item.ID} key={item.ID} > {item.Name} </option>))
                                    }
                                </select>
                            </div>


                            <label htmlFor="inputAno">Ano</label>
                            <input ref={element => this.ano = element} type="number" min={new Date().getFullYear() - 60} defaultValue={anuncios.ano} max={new Date().getFullYear()} className="form-control" id="inputAno" name="ano" required />


                            <label htmlFor="inputQuilometragem">Quilometragem(KM)</label>
                            <input ref={element => this.quilometragem = element} type="number" min="0" defaultValue={anuncios.quilometragem} className="form-control" id="inputQuilometragem" name="quilometragem" required />

                            <label htmlFor="inputObservacao">Observação</label>
                            <textarea ref={element => this.observacao = element} defaultValue={anuncios.observacao} type="text" className="form-control" id="inputObservacao" name="observacao" required />
                            <br />
                            <div className="btn-group clearfix" role="group">
                                <button className="btn btn-info" onClick={(event) => {
                                    event.preventDefault();
                                    window.history.back()
                                }} >Voltar</button>
                                <button className="btn btn-success" type="submit">Salvar</button>
                            </div>
                        </div>
                        ) : (<h4>Carregando...</h4>)
                        }

                    </div>
                </form>
            </div>)
    }
}

export default Edit;