import categoriesConst from '../../constants/category';

const initialState = {
    currentList: 'jokes',
    available: [],
    currentCategory: 'all',
    disabledButtons: {}
};

export default function (state = initialState, action) {
    switch( action.type ) {
        case categoriesConst.SET_JOKES_CATEGORIES: {
            return {
                ...state,
                available: [
                    'all',
                    ...action.payload
                ]
            }
        }
        case categoriesConst.CHANGE_CATEGORY: {
            return {
                ...state,
                currentCategory: action.payload
            }
        }
        case categoriesConst.SHOW_JOKES: {
            return {
                ...state,
                currentList: 'jokes'
            }
        }
        case categoriesConst.SHOW_FAVORITES: {
            return {
                ...state,
                currentList: 'favorites'
            }
        }
        case categoriesConst.DISABLE_BUTTON: {
            return {
                ...state,
                disabledButtons: {
                    ...state.disabledButtons,
                    [action.payload]: true
                }
            }
        }
        default:
            return state;
    }
}