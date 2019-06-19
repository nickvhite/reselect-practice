import jokesConst from '../../constants/jokes';

export function pushJoke(payload) {
    return {
        type: jokesConst.PUSH_JOKE,
        payload
    }
}

export function pushToFavorites (payload) {
    return {
        type: jokesConst.PUSH_TO_FAVORITES,
        payload
    }
}

export function removeFromFavorites (payload) {
    return {
        type: jokesConst.REMOVE_FROM_FAVORITES,
        payload
    }
}

export function changeFavorite (payload) {
    return {
        type: jokesConst.CHANGE_FAVORITE,
        payload
    }
}