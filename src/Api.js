import axios from 'axios'

//Define a URL base do projeto
const url = axios.create({
    baseURL: 'https://localhost:3001/'
})

//Interface de todas a API's do projeto
export const loadGenres = () => url.get('genres')
export const saveSeries = (newSeries) => url.post('series', newSeries)
export const updateSeries = (series) => url.put('series/'+ series.id, series)
export const loadSeriesByGenre = (genre) => url.get('series?genre='+genre)
export const deleteSeries = (id) => url.delete('series/'+id)
export const loadSeriesById = (id) => url.get('series/'+id)

const apis = {
    loadGenres,
    saveSeries,
    updateSeries,
    loadSeriesByGenre,
    deleteSeries,
    loadSeriesById
}
export default apis
