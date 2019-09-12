import React, { Component } from 'react'
import { connect } from 'react-redux'
import './AddMovieForm.css'
import MessageBoxSuccess from '../../../common/features/MessageBoxSuccess'

class AddMovieForm extends Component {
    
    state = {
            title: '',
            releaseYear: '',
            format: '',
            stars: '',
            formatTypes: ['Set the format','DVD', 'VHS', 'Blu-Ray'],
            formErrors: {
                title: '',
                releaseYear: '',
                format: '',
                stars: '',
            },
            titleValid: false,
            releaseYearValid: false,
            formatValid: false,
            starsValid: false,
            formValid: false,
    }

    onChangeHandle = (e) => {
        const name = e.target.name
        const value = e.target.value

        this.setState({
                [name]: value,
            },
            () => { this.validateField(name, value) }
        )
    }

    validateField = (fieldName, value) => {

        let fieldValidationErrors = this.state.formErrors
        let titleValid = this.state.titleValid
        let releaseYearValid = this.state.releaseYearValid
        let formatValid = this.state.formatValid
        let starsValid = this.state.starsValid

        switch (fieldName) {
            case 'title':
                titleValid = !/^[\s]+$/.test(value)
                fieldValidationErrors.title = titleValid ? ''  : 'Input the title'
                break
            case 'releaseYear':
                releaseYearValid = value >= 1850 && value <= 2020
                fieldValidationErrors.releaseYear = releaseYearValid ? '' : 'Years only 1850-2020 '
                break
            case 'format':
                formatValid = value !== 'Set the format'
                fieldValidationErrors.format = formatValid ? '' : 'Set the format'
                break
            case 'stars':
                starsValid = !/\d/.test(value) && !/^[\s]+$/.test(value)
                fieldValidationErrors.stars = starsValid ? '' : 'Names only'
                break
            default :
                break
        }

        this.setState({
                formErrors: fieldValidationErrors,
                titleValid: titleValid,
                releaseYearValid: releaseYearValid,
                formatValid: formatValid,
                starsValid: starsValid,
            },
            this.validateForm
        )
    }

    validateForm = () => {
        const { titleValid, releaseYearValid, formatValid, starsValid } = this.state
        this.setState({
            formValid: titleValid && releaseYearValid && formatValid && starsValid
        })
    }

    hideMessageBoxSend = () => {
        setTimeout(() => (
            this.setState({ msgAlert: false})
        ), 4000)
    }

    onSubmitHandle = async (e, data) => {
        const { getNewRequest } = this.props
        e.preventDefault()

        let formData = new FormData()
        for (var name in data) {
            formData.append(name, data[name])
        }

        await fetch('http://localhost:3012/movies',{
            method: 'POST',
            body: formData
        })

        this.setState({
            title: '',
            releaseYear: '',
            stars: '',
            msgAlert: true,
        })
        
        getNewRequest()
        this.hideMessageBoxSend()
    }

    render () {
        const { title, releaseYear, formatTypes, stars, formValid, formErrors, msgAlert } = this.state
        const { onChangeHandle, onSubmitHandle } = this
        return (
            <div>
                <div className="add-movie-form">
                    <div className="add-movie-form-title">Add Movie</div>
                    <form onSubmit={(e) => onSubmitHandle(e, this.state)}>
                        <label htmlFor="title">Title: <span>{formErrors.title}</span></label>
                        <input 
                            name="title" value={title} onChange={onChangeHandle} required
                        />
                        <label htmlFor="releaseYear">Release Year: <span>{formErrors.releaseYear}</span></label>
                        <input 
                            name="releaseYear" value={releaseYear} onChange={onChangeHandle} required
                        />
                        <label htmlFor="format">Format:</label>
                        <select name="format" onChange={onChangeHandle}>
                            {
                                formatTypes.map((type, i) => (
                                    <option key={i} value={type}>{type}</option>
                                ))
                            }
                        </select>
                        <label htmlFor="stars">Stars: <span>{formErrors.stars}</span></label>
                        <input 
                            name="stars" value={stars} onChange={onChangeHandle} required
                        />
                        <button type="submit"  className={formValid ? 'btn-allowed' : 'btn-not-allowed'} 
                                disabled={!formValid}
                        >Add</button>
                    </form>
                </div>
                { msgAlert ? <MessageBoxSuccess /> : ''}
            </div>
        )
   }
}

const mapDispatchToProps = (dispatch) => ({
    getNewRequest: () => dispatch({
        type: "NEW_REQUEST_ON_POST",
    })
})

export default connect(null, mapDispatchToProps)(AddMovieForm)