import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {changeCategory} from '../../store/actions/category';
import selectors from '../../selectors';

const CategoryList = ({currentCategory, categoryList, currentList, jokesCount, favoritesCount, changeCategory}) => {
    const count = currentList === 'jokes' ? jokesCount : favoritesCount;
    return (
        <div className="category">
            {categoryList.map(categoryLink =>
                <p
                    key={categoryLink}
                    className={`category-name ${categoryLink === currentCategory ? 'active' : ''}`}
                    onClick={()=>changeCategory(categoryLink)}
                >
                    {categoryLink }
                    <span>{count[categoryLink] || 0}</span>
                </p>
            )}
        </div>
    )
};

CategoryList.propTypes = {
    currentCategory: PropTypes.string.isRequired,
    categoryList: PropTypes.array.isRequired,
    currentList: PropTypes.string.isRequired,
    changeCategory: PropTypes.func.isRequired,
    jokesCount: PropTypes.object.isRequired,
    favoritesCount: PropTypes.object.isRequired
};

export default connect(
    state => ({
        currentCategory: selectors.getCurrentCategory(state),
        categoryList: selectors.getCategoriesList(state),
        currentList: selectors.getCategoryListName(state),
        jokesCount: selectors.jokesCategoriesCounter(state),
        favoritesCount: selectors.favoritesCategoriesCounter(state)
    }),
    {
        changeCategory
    }
)(CategoryList)