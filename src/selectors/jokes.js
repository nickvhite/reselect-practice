import {createSelector} from 'reselect';

const jokes = state => state.jokes;
const favorites = state => state.jokes.filter(joke => joke.favorite);
const categoriesList = state => state.category.available;

const categories = createSelector(
    categoriesList,
    list => list
);

const getCategoriesCount = jokesArray => {
    const categoriesCounter = {
        all: jokesArray.length
    };
    jokesArray.map(joke => {
        if (joke.categories.length) {
            categoriesCounter[joke.categories[0]] = categoriesCounter[joke.categories[0]] ? categoriesCounter[joke.categories[0]] += 1 : 1;
        }
    });
    return categoriesCounter;
};

export const jokesCategoriesCounter = createSelector(
    jokes,
    jokesArray => getCategoriesCount(jokesArray)
);

export const favoritesCategoriesCounter = createSelector(
    favorites,
    favoritesArray => getCategoriesCount(favoritesArray)
);

