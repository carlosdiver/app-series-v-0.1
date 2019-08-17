import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import api from './Api'

const statuses = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assistir'
}
const rating = {
    'bad': 'Ruim',
    'normal': 'Normal',
    'good': 'Boa',
    'excelent': 'Excelente',
    'toKnow': 'A avaliar'
}


class NewSeries extends Component {
    //Construtor para exibir os gêneros na tela
    constructor(props) {
        super(props)

        this.state = {
            genres: [],
            isLoading: false,
            redirect: false
        }
        this.saveSeries = this.saveSeries.bind(this)
    }
    componentDidMount() {
        this.setState({ isLoading: true }) //Define que os dados estão sendo carregados
        api.loadGenres()  //Chama a API
            .then((res) => { //Esse then acontece quando os dados terminarem de ser carregados, pois é uma promisse (assíncrono)
                this.setState({
                    isLoading: false, //Após o carregamanto isLoading é false, pois não está mais carregando
                    genres: res.data //Os gêneros são os dados retornados da api
                })
            })
    }
    //Salvando os dados do formulário
    saveSeries() {
        const NewSeries = {
            name: this.refs.name.value,
            status: this.refs.status.value,
            rating: this.refs.rating.value,
            genre: this.refs.genre.value,
            comments: this.refs.comments.value
        }
        api.saveSeries(NewSeries)
            .then((res) => {
                this.setState({
                    redirect: '/series/' + this.refs.genre.value
                })
            })
    }
    render() {
        return (
            <section className="intro-section">
                {this.state.redirect &&
                    <Redirect to={this.state.redirect} />
                }
                <div className="col-xs-12">
                    <h1>Nova Série</h1>
                    <form style={{ margin: 30 + 'px' }}>
                        <span className="lead">Nome:</span>
                        <input type="text" ref='name' className="form-control" /> <br />
                        <span className="lead">Status:</span>
                        <select ref='status' style={{ margin: 8 + 'px', padding: 3 + 'px' }}>
                            {Object.keys(statuses).map(key => <option key={key} value={key}>{statuses[key]}</option>)}
                        </select>
                        <span className="lead">Classificação:</span>
                        <select ref='rating' style={{ margin: 8 + 'px', padding: 3 + 'px' }}>
                            {Object.keys(rating).map(key => <option key={key} value={key}>{rating[key]}</option>)}
                        </select>
                        <span className="lead">Gênero:</span>
                        <select ref='genre' style={{ margin: 8 + 'px', padding: 3 + 'px' }}>
                            {this.state.genres.map(key => <option key={key} value={key}>{key}</option>)}
                        </select> <br />
                        <span className="lead">Comentários:</span>
                        <textarea ref='comments' className="form-control"></textarea> <br />
                        <button type="button" className="btn btn-success" onClick={this.saveSeries}>Salvar</button>
                    </form>
                </div>

            </section>
        )
    }
}

export default NewSeries