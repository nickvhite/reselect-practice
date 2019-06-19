import jokesConst from '../../constants/jokes';

const initialState = [];

export default function (state = initialState, action) {
    switch( action.type ) {
        case jokesConst.PUSH_JOKE: {
            return [
                ...state,
                action.payload
            ]
        }
        case jokesConst.PUSH_TO_FAVORITES: {
            const newJoke = {...action.payload};
            newJoke.favorite = true;
            newJoke.favorited_at = new Date();
            const newState = state.map(joke => joke.id === newJoke.id ? newJoke : joke);
            return [
                ...newState
            ]
        }
        case jokesConst.REMOVE_FROM_FAVORITES: {
            const newJoke = {...action.payload};
            newJoke.favorite = false;
            const newState = state.map(joke => joke.id === newJoke.id ? newJoke : joke);
            return [
                ...newState
            ]
        }
        case jokesConst.CHANGE_FAVORITE: {
            const newJoke = {...action.payload};
            const newState = state.map(joke => joke.id === newJoke.id ? newJoke : joke);
            return [
                ...newState
            ]
        }
        default:
            return state;
    }
}