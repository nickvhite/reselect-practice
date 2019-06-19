import categoriesConst from '../../constants/category';

export function setJokesCategories(payload) {
    return {
        type: categoriesConst.SET_JOKES_CATEGORIES,
        payload
    }
}

export function changeCategory(payload) {
    return {
        type: categoriesConst.CHANGE_CATEGORY,
        payload
    }
}

export function showJokes() {
    return {
        type: categoriesConst.SHOW_JOKES
    }
}

export function showFavorites() {
    return {
        type: categoriesConst.SHOW_FAVORITES
    }
}

export function disableButton(payload) {
    return {
        type: categoriesConst.DISABLE_BUTTON,
        payload
    }
}