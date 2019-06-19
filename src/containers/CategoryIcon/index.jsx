import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {changeCategory} from '../../store/actions/category';

const iconsClasses = {
        'all': "fas fa-random",
        "animal": "fas fa-paw",
        "career": "fas fa-briefcase",
        "celebrity": "fas fa-chess-queen",
        "dev": "fas fa-code",
        "explicit": "fas fa-bullhorn",
        "fashion": "fas fa-tshirt",
        "food": "fas fa-hamburger",
        "history": "fas fa-history",
        "money": "fas fa-money-bill-alt",
        "movie": "fas fa-film",
        "music": "fas fa-music",
        "political": "fas fa-handshake",
        "religion": "fas fa-church",
        "science": "fas fa-microscope",
        "sport": "fas fa-basketball-ball",
        "travel": "fas fa-plane"
};

const CategoryIcon = ({category, changeCategory}) => (
    <i
        className={iconsClasses[category]}
        onClick={() => changeCategory(category)}
    />
);

CategoryIcon.propTypes = {
    category: PropTypes.string.isRequired,
    changeCategory: PropTypes.func.isRequired
};

export default connect(
    null,
    {
        changeCategory
    }
)(CategoryIcon);