import React, { useState, useEffect } from 'react'
import MovieListItem from './MovieListItem'
import { connect } from 'react-redux'
import './MoviesList.css'

const MoviesList = ({
    requestSuccessed,requestFailed,movies,statusOnPost,
    statusOnRemove,sortByDirectionAsc,sortByDirectionDesc,
    sortDirection,titleSearched
}) => {

    const COUNT = 4
    const [ count, setCount ] = useState(COUNT)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                let response = await fetch(`http://localhost:3012/movies/?sort_direction=${sortDirection}`)
                let data = await response.json()
                requestSuccessed(data.movies)
            } catch {
                requestFailed()
            }
        }
            fetchMovies()
    }, [sortDirection, count, statusOnRemove, statusOnPost, titleSearched, requestSuccessed,requestFailed])

    const filteredMovies = movies.filter((title) => {
        return (title.title.toLowerCase().indexOf(titleSearched.toLowerCase()) !== -1 
            || title.stars.toLowerCase().indexOf(titleSearched.toLowerCase()) !== -1)
    })

    return (
        <div className="main">
            <div className="sort-btn-wrapp">
                <button className="sort-asc-btn" onClick={sortByDirectionAsc}>sort asc</button>
                <button className="sort-desc-btn" onClick={sortByDirectionDesc}>sort desc</button>
            </div>
                <div className="movie-list-wrapp">
                    {
                        filteredMovies.slice(0, count).map(({
                            _id,
                            title,
                            releaseYear,
                            format,
                            stars
                        }) => (
                            <div className="movie-list-items" key={_id}>
                                <MovieListItem 
                                    id={_id}
                                    title={title}
                                    releaseYear={releaseYear}
                                    format={format}
                                    stars={stars}
                                />
                            </div>
                        ))
                    }
                </div>    
                <div className="btn-show-more-less-wrapp">
                    {
                        (count === COUNT) ? null : <button onClick={() => setCount(count - COUNT)}>Show less</button>
                    }
                    { 
                        (count >= filteredMovies.length ) ? null : <button onClick={() => setCount(count + COUNT)}>Show more</button>
                    }    
                </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    movies: state.request.movies,
    statusOnPost: state.request.onPostStatus,
    statusOnRemove: state.request.onRemoveStatus,
    sortDirection: state.request.sortDirection,
    titleSearched: state.search.title,
})

const mapDispatchToProps = (dispatch) => ({
    requestSuccessed: (data) => dispatch({
        type: "MOVIE_REQUEST_SUCCESS",
        data: data
    }),
    requestFailed: () => dispatch({
        type: "MOVIE_REQUEST_ERROR",
    }),
    sortByDirectionAsc: () => dispatch({
        type: "SORT_DRECTION_ASC",
    }),
    sortByDirectionDesc: () => dispatch({
        type: "SORT_DRECTION_DESC",
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList)