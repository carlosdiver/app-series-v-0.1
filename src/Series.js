import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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

class Series extends Component {
    constructor(props) {
        super(props)

        this.state = {
            series: [],
            isLoading: false
        }
        this.renderSeries = this.renderSeries.bind(this)
        this.loadData = this.loadData.bind(this)
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        this.setState({ isLoading: true })
        api.loadSeriesByGenre(this.props.match.params.genre).then((res) => {
            this.setState({
                isLoading: false,
                series: res.data
            })
        })
    }
    //Deletar Série
    deleteSeries(id) {
        api.deleteSeries(id).then((res) => this.loadData())
    }
    //Componente para renderizar  cada série filtrada por gênero
    renderSeries(series) {
        return (
            <div key={series.id} className="item  col-xs-4 col-lg-4">
                <div className="thumbnail">
                    <img className="group list-group-image" style={{ marginTop: 20 + 'px', borderRadius: 6 + 'px' }} src="http://placehold.it/400x250/000/fff" alt="" />
                    <div className="caption">
                        <h3 className="group inner list-group-item-heading">
                            {series.name}</h3>
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <p className="lead">{series.genre}</p>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <Link className="btn btn-success"   style={{ marginTop: 6 + 'px' }}  to={'/series-edit/' + series.id}>Editar</Link>
                                <a className="btn btn-danger" style={{ marginLeft: 4 + 'px', marginTop: 6 + 'px'  }} onClick={() => this.deleteSeries(series.id)}>Excluir</a>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: 6 + 'px' }}  >
                            <div className="col-xs-12 col-md-6">
                                <p className="lead small">{statuses[series.status]} </p>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <p className="lead small">Classificação: {rating[series.rating]} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="col-xs-12">
                <section id="intro" className="intro-section">
                    <h1 style={{ marginTop: 6 + 'px' }} >Series de {this.props.match.params.genre}</h1>
                    {this.state.isLoading && <p>Carregando, aguarde...</p>}
                    {!this.state.isLoading && this.state.series.length === 0 && <div className='alert alert-info'>Nenhuma série cadastrada no gênero {this.props.match.params.genre}!</div>}

                    <div id="series" className="row list-group">
                        {!this.state.isLoading &&
                            this.state.series.map(this.renderSeries)
                        }
                    </div>
                </section>
            </div>
        )
    }
}

export default Series