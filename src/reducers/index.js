import { combineReducers } from 'redux'

const movies = (state = [], action) => {
    switch (action.type) {
        case 'LIST_ADD':
            return [
                ...state,
                {
                    id: action.id,
                    title: action.title,
                    overview: action.overview,
                    poster: action.poster,
                    genre: action.genre,
                }
            ]
        default:
            return state
    }
}

export default combineReducers({
    movies,
})