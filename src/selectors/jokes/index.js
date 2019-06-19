import {createPropSelector} from '../helper';

const jokesSelectors = {};

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

const getFavoritesCount = jokesArray => {
    const favoritesArray = jokesArray.filter(joke => joke.favorite);
    return getCategoriesCount(favoritesArray);
};

jokesSelectors.jokesCategoriesCounter = createPropSelector(
    'jokes',
    jokesArray => getCategoriesCount(jokesArray)
);

jokesSelectors.favoritesCategoriesCounter = createPropSelector(
    'jokes',
    favoritesArray => getFavoritesCount(favoritesArray)
);

jokesSelectors.getJokes = createPropSelector('jokes');

export default jokesSelectors;

