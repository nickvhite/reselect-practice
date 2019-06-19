import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {removeFromFavorites, changeFavorite} from "../../store/actions/jokes";

import Joke from '../Joke';

class FavoritesList extends Component {
    static propTypes = {
        jokes: PropTypes.array.isRequired,
        category: PropTypes.object.isRequired,
        removeFromFavorites: PropTypes.func.isRequired,
        changeFavorite: PropTypes.func.isRequired
    };

    getCategories() {
        const sortedList = {};
        this.props.category.available.map(category => sortedList[category] = []);
        return sortedList;
    }

    getFavorites() {
        return this.props.jokes.filter(joke => joke.favorite)
    }

    sortByGroups(favoritesList) {
        const categoriesList = this.getCategories();
        favoritesList.map(joke => {
            const category = joke.categories[0] || 'all';
            categoriesList[category].push(joke);
        });
        return categoriesList;
    }

    sortGroupsByDate(groupedList) {
        Object.keys(groupedList).map(category => {
            groupedList[category] = groupedList[category].sort((a, b) => a.favorited_at - b.favorited_at);
        });
        return groupedList;
    }

    sortFavorites() {
        const favoritesList = this.getFavorites();
        const groupedList = this.sortByGroups(favoritesList);
        const sortedList = this.sortGroupsByDate(groupedList);
        return sortedList;
    }

    renderList(list) {
        return (
            <div
                className='jokes-block'
            >
                {list.map(joke => (
                    <Joke
                        key={joke.id}
                        joke={joke}
                    />
                ))}
            </div>
        )
    }

    renderFavorites() {
        const {currentCategory} = this.props.category;
        const favorites = this.sortFavorites();
        if (currentCategory === "all") {
            let allJokes = [];
            Object.keys(favorites).map(category => allJokes = [...allJokes, ...favorites[category]]);
            return this.renderList(allJokes);
        } else {
            return this.renderList(favorites[currentCategory]);
        }
    }

    render() {
        return (
            <div className='jokes-list'>
                {this.renderFavorites()}
            </div>
        )
    }
}

export default connect(
    state => ({
        jokes: state.jokes,
        category: state.category
    }),{
        removeFromFavorites,
        changeFavorite
    }
)(FavoritesList)