import React, { Component } from 'react';

class Add extends Component {


    state = {
        marcas: [],
        modelos: [],
        versoes:[]
    };

    async saveAnuncio(event) {
        event.preventDefault();
        const { marca, modelo, versao, ano, quilometragem, observacao } = this;
        let body = {
            "marca": marca.options[marca.selectedIndex].text,
            "modelo": modelo.options[modelo.selectedIndex].text,
            "versao": versao.options[versao.selectedIndex].text,
            "ano": ano.value,
            "quilometragem": quilometragem.value,
            "observacao": observacao.value
        }
        const data = await fetch("./api/AnuncioWebmotors", {
            method: 'POST',
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
        this.setOptionsListMarcas();
        this.setOptionsListModelos(1);
        this.setOptionsListVersao(1);
    }

    async setOptionsListMarcas() {
        const data = await fetch("http://desafioonline.webmotors.com.br/api/OnlineChallenge/Make")
        if (data.ok) {
            let marcas = await data.json();
            this.setState({ marcas })
        }
        
    }

    async setOptionsListModelos(id) {
        const data = await fetch("http://desafioonline.webmotors.com.br/api/OnlineChallenge/Model?MakeID=" + id)
        if (data.ok) {
            let modelos = await data.json();
            this.setState({ modelos})
        }
    }

    async setOptionsListVersao(id) {
        const data = await fetch("http://desafioonline.webmotors.com.br/api/OnlineChallenge/Version?ModelID=" + id)
        if (data.ok) {
            let versoes = await data.json();
            this.setState({ versoes })
        }
    }

    render() {
        const { marcas, modelos, versoes } = this.state;
        return (
            <div className="container text-center">
                <h2>Cadastro de Anúncios</h2>
                <form onSubmit={(event) => { this.saveAnuncio(event) }}>
                    <div className="form-group">
                        {(marcas.length) ?(<div>
                            <div className="form-group">
                                <label htmlFor="marcarSelect">Marca</label>
                                <select ref={element => this.marca = element} className="form-control" id="marcarSelect" required name="marca" onChange={(event) => {
                                    this.setOptionsListModelos(event.target.value);
                                    this.setOptionsListVersao(event.target.value);
                                }}
                                >
                                    {
                                        marcas.map(item => (<option value={item.ID} id={item.ID} key={item.ID} > {item.Name} </option>))
                                    }

                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="ModeloSelect">Modelo</label>
                                <select ref={element => this.modelo = element} className="form-control" id="ModeloSelect" required>
                                    {
                                        modelos.map(item => (<option value={item.ID} key={item.ID}> {item.Name} </option>))
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="VersaoSelect">Versão</label>
                                <select ref={element => this.versao = element} className="form-control" id="VersaoSelect" required  >
                                    {
                                        versoes.map(item => (<option value={item.ID} key={item.ID}> {item.Name} </option>))
                                    }
                                </select>
                            </div>


                            <label htmlFor="inputAno">Ano</label>
                            <input ref={element => this.ano = element} type="number" min={new Date().getFullYear() - 60} max={new Date().getFullYear()} className="form-control" id="inputAno" name="ano" required />


                            <label htmlFor="inputQuilometragem">Quilometragem(KM)</label>
                            <input ref={element => this.quilometragem = element} type="number" min="0" className="form-control" id="inputQuilometragem" name="quilometragem" required />

                            <label htmlFor="inputObservacao">Observação</label>
                            <textarea ref={element => this.observacao = element} type="text" className="form-control" id="inputObservacao" name="observacao" required />
                            <br />
                            <div className="btn-group clearfix" role="group">
                                <button className="btn btn-info" onClick={(event) => {
                                    event.preventDefault();
                                    window.history.back()
                                }} >Voltar</button>
                                <button className="btn btn-success" type="submit">Enviar</button>
                            </div>
                            </div>
                        ) : (<h4>Carregando...</h4>)
                            }
                        
                </div>
                </form>
               </div>)
}
}

export default Add;