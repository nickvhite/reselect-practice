import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {changeCategory} from '../../store/actions/category';
import {jokesCategoriesCounter, favoritesCategoriesCounter} from '../../selectors/jokes';

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: {}
        };
    }

    getFavorites() {
        return this.props.jokes.filter(joke => joke.favorite)
    }

    getJokesArray() {
        return this.props.category.currentList === 'jokes' ? this.props.jokes : this.getFavorites();
    }

    getJokesCount() {
        let jokesArray = this.getJokesArray();
        let count = {
            all: jokesArray.length
        };
        jokesArray.map(joke => {
            if (joke.categories.length) {
                count[joke.categories[0]] = count[joke.categories[0]] ? count[joke.categories[0]] += 1 : 1;
            }
        });
        return count;
    }

    render () {
        const {category} = this.props;
        const count = this.props.category.currentList === 'jokes' ? this.props.jokesCount : this.props.favoritesCount;
        return (
            <div className="category">
                {category.available.map(categoryLink =>
                    <p
                        key={categoryLink}
                        className={`category-name ${categoryLink === category.currentCategory ? 'active' : ''}`}
                        onClick={()=>this.props.changeCategory(categoryLink)}
                    >
                        {categoryLink }
                        <span>{count[categoryLink] || 0}</span>
                    </p>
                )}
            </div>
        )
    }
};

CategoryList.propTypes = {
    category: PropTypes.object.isRequired,
    changeCategory: PropTypes.func.isRequired,
    jokesCount: PropTypes.object.isRequired,
    favoritesCount: PropTypes.object.isRequired
};

export default connect(
    state => ({
        category: state.category,
        jokesCount: jokesCategoriesCounter(state),
        favoritesCount: favoritesCategoriesCounter(state)
    }),
    {
        changeCategory
    }
)(CategoryList)