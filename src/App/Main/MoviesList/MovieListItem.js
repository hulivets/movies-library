import React, { Component } from 'react'
import { connect } from 'react-redux'
import './MovieListItem.css'


class MovieListItem extends Component {

    state = {
        confirmClass: '',
        msgConfirmRemove: false,
    }

    showConfirmMessage = () => {
        this.setState({ confirmClass: 'confirm-remove'})
    }

    onCanselButton = () => {
        this.setState({ confirmClass: ''})
    }

    onRemoveButton = async (id) => {

        await fetch(`http://localhost:3012/movies/${id}`, {
            method: 'DELETE'
        })

        this.props.getNewRequest()
        this.setState({ confirmClass: ''})
    }
    render () {
        const {
            id,
            title,
            releaseYear,
            format,
            stars,
        } = this.props

        return (
            <div>
                <div className="movie-list-item">
                    <div className="movie-list-item-id">id: {id}</div>
                    <h2 className="movie-list-item-title"><span>Title:</span> {title}</h2>
                    <div className="movie-list-item-year"><span>Release Year:</span> {releaseYear}</div>
                    <div className="movie-list-item-format"><span>Format:</span> {format}</div>
                    <div className="movie-list-item-stars"><span>Stars:</span> {stars}</div>
                    <button className="btn-remove" onClick={this.showConfirmMessage}>X</button> 
                    <div className={`msg-confirm ${this.state.confirmClass}`}>
                        <button className="confirm-btn" onClick={this.onCanselButton}>Cancel</button>
                        <button className="confirm-btn" onClick={() => this.onRemoveButton(id)}>Remove</button> 
                    </div> 
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getNewRequest: () => dispatch({
        type: "NEW_REQUEST_ON_REMOVE",
    })
})

export default connect(null, mapDispatchToProps)(MovieListItem)