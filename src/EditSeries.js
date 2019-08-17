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

class EditSeries extends Component {
    constructor(props) {
        super(props)

        this.state = {
            genres: [],
            isLoading: false,
            redirect: false,
            series: {}
        }
        this.saveSeries = this.saveSeries.bind(this)
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        api.loadSeriesById(this.props.match.params.id)
            .then((res) => {
                this.setState({ series: res.data })
                //Para carregar os valores nos respectivos campos
                this.refs.name.value = this.state.series.name
                this.refs.status.value = this.state.series.status
                this.refs.rating.value = this.state.series.rating
                this.refs.genre.value = this.state.series.genre
                this.refs.comments.value = this.state.series.comments



            })
        api.loadGenres()
            .then((res) => {
                this.setState({
                    isLoading: false,
                    genres: res.data
                })
            })
    }
    //Salvando os dados do formulário
    saveSeries() {
        const NewSeries = {
            id: this.props.match.params.id,
            name: this.refs.name.value,
            status: this.refs.status.value,
            rating: this.refs.rating.value,
            genre: this.refs.genre.value,
            comments: this.refs.comments.value
        }
        api.updateSeries(NewSeries)
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
                    <h1>Editar a Série - {this.state.series.name}</h1>
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

export default EditSeries