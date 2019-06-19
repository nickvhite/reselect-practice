import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {pushJoke} from "../../store/actions/jokes";
import {setJokesCategories, disableButton} from "../../store/actions/category";

import JokesService from '../../services/jokes-service';

import CategoryList from '../CategoryList';
import JokesList from '../JokesList';
import FavoritesList from '../FavoritesList';

class Jokes extends Component {
    static propTypes = {
        jokes: PropTypes.array.isRequired,
        category: PropTypes.object.isRequired,
        setJokesCategories: PropTypes.func.isRequired,
        disableButton: PropTypes.func.isRequired,
        pushJoke: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.requestCounter = 0;
        this.maxRequests = 5;
    }

    isUniqueJoke(joke) {
        return !!!this.props.jokes.filter(propJoke => propJoke.id === joke.id).length;
    }

    getJoke() {
        this.requestCounter += 1;
        const {currentCategory} = this.props.category;
        const category = (currentCategory === 'all') ? undefined : currentCategory;
        JokesService.getJoke(category)
            .then(resp => {
                if (this.isUniqueJoke(resp)) {
                    this.requestCounter = 0;
                    this.props.pushJoke(resp);
                } else {
                    if (this.requestCounter < this.maxRequests) {
                        this.getJoke();
                    } else {
                        this.requestCounter = 0;
                        this.props.disableButton(this.props.category.currentCategory);
                    }
                }
            })
            .catch(err => console.log(err));
    }

    componentWillMount() {
        if (!this.props.category.available.length) {
            JokesService.getCategories()
                .then(resp => this.props.setJokesCategories(resp))
                .catch(err => console.log(err));
        }
    }

    render() {
        const disabledButton = this.props.category.disabledButtons[this.props.category.currentCategory];
        return (
            <div className='jokes'>
                <CategoryList/>
                {this.props.category.currentList === 'jokes' ?
                    (
                        <div className='jokes-container'>
                            <JokesList
                                getJoke={() => this.getJoke()}
                            />
                            <div className='jokes-buttons'>
                                <button
                                    disabled={disabledButton}
                                    className='load-more-button'
                                    onClick={() => this.getJoke()}
                                >
                                    {disabledButton ? 'no more jokes' : 'get one more'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className='jokes-container'>
                            <FavoritesList/>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        jokes: state.jokes,
        category: state.category
    }),
    {
        setJokesCategories,
        pushJoke,
        disableButton
    }
)(Jokes)