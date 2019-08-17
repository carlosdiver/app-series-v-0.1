import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from './Api'

class Home extends Component {
    constructor(props) {
        super(props)

        //Exibir os gêneros na tela
        this.state = {
            genres: [],
            isLoading: false
        }
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
    //Gerar links para os gêneros
    renderGenreLink(genre) {
        return (
            <span key={genre}>&nbsp;<Link to={`/series/${genre}`}>{genre}</Link>&nbsp;</span>
        )
    }

    render() {
        return (
            <div>
                <section id="intro" className="intro-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <img src="/images/logo.png" alt="Minhas Séries" />
                                <h2 >Nunca mais esqueça uma série que você assistiu ou que alguém lhe indicou.</h2>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.isLoading &&
                        <span>Aguarde, carregando...</span>
                    }
                    {
                        !this.state.isLoading &&
                        <div>
                            <p style={{ fontSize: 1.4 + 'em' }}>
                                Ver séries do gênero:
                                {this.state.genres.map(this.renderGenreLink)}
                            </p>
                        </div>
                    }
                </section>
            </div>
        )
    }
}
export default Home