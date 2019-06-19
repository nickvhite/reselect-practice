import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import selectors from '../../selectors';

import {showJokes, showFavorites} from "../../store/actions/category";

class JokesNavigator extends Component {
    static propTypes = {
        currentList: PropTypes.string.isRequired,
        showJokes: PropTypes.func.isRequired,
        showFavorites: PropTypes.func.isRequired
    };

    render() {
        const {currentList} = this.props;
        return (
            <div className='jokes-navigation'>
                <p
                    className={`navigation-button ${currentList === 'jokes' ? 'active' : ''}`}
                    onClick={() => this.props.showJokes()}
                >jokes</p>
                <p
                    className={`navigation-button ${currentList === 'favorites' ? 'active' : ''}`}
                    onClick={() => this.props.showFavorites()}
                >favorites</p>
            </div>
        )
    }
}

export default connect(
    state => ({
        currentList: selectors.getCategoryListName(state)
    }),
    {
        showJokes,
        showFavorites
    }
)(JokesNavigator)