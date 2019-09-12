import React from 'react'
import { connect } from 'react-redux'
import './Search.css'


const Search = ({
    title,
    findByTitle
}) => {
    return (
        <div className="header-search">
            <input type="search" name="title" value={title} onChange={(e) => findByTitle(e.target.value)} placeholder="search"/>   
        </div>
    )
}
const mapStateToProps = (state) => ({
    title: state.search.title
})

const mapDispatchToProps = (dispatch) => ({
    findByTitle: (title) => dispatch({
        type: "ADD_SEARCHED_TITLE",
        title: title
    }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)