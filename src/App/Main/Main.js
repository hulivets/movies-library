import React from 'react'
import MoviesList from './MoviesList/MoviesList'
import AddMovieForm from './AddMovieForm/AddMovieForm'

const Main = () => {
    return (
       <div className="container">
            <div className="main-wrapper">
                        <MoviesList />
                  <div className="sidebar">
                        <AddMovieForm />
                  </div>  
            </div>
       </div>
    )
}

export default Main