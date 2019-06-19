import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Joke from '../Joke';

class JokesList extends Component {
    static propTypes = {
        jokes: PropTypes.array.isRequired,
        category: PropTypes.object.isRequired,
        getJoke: PropTypes.func.isRequired
    };

    componentWillMount() {
        if (!this.props.jokes.length && this.props.category.currentCategory === 'all') {
            this.props.getJoke();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.jokes.length !== this.props.jokes.length ||
            prevProps.category.currentCategory !== this.props.category.currentCategory) {
            this.jokesList.scrollTo('top', 9999999999);
        }
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

    renderAll() {
        const {jokes} = this.props;
        if (jokes.length) {
            return this.renderList(jokes);
        }
    }

    renderCategory() {
        const {jokes} = this.props;
        const {currentCategory} = this.props.category;
        let sortedList = jokes.filter(joke => {
            if (joke.categories.indexOf(currentCategory) >= 0) {
                return joke;
            }
        });
        if (sortedList.length) {
            return this.renderList(sortedList);
        } else {
            this.props.getJoke();
        }
    }

    render() {
        const {currentCategory} = this.props.category;
        return (
            <div
                ref={ref => this.jokesList = ref}
                className='jokes-list'
            >
                {currentCategory === 'all' ? (
                        this.renderAll()
                    ) : (
                        this.renderCategory()
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
    null
)(JokesList)