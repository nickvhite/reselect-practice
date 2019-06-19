import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import CategoryIcon from '../CategoryIcon';

import {pushToFavorites, removeFromFavorites, changeFavorite} from '../../store/actions/jokes';

class Joke extends Component {
    static propTypes = {
        joke: PropTypes.object.isRequired,
        category: PropTypes.object.isRequired,
        pushToFavorites: PropTypes.func.isRequired,
        removeFromFavorites: PropTypes.func.isRequired,
        changeFavorite: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            changeMode: false,
            newValue: ''
        }
    }

    enableChangeMode() {
        this.setState({changeMode: true, newValue: this.props.joke.value})
    }

    disableChangeMode() {
        this.setState({changeMode: false})
    }

    validNewValue() {
        const {newValue} = this.state;
        return this.state.changeMode && newValue.length && newValue.replace(/\s/g, '').length
    }

    async saveJoke() {
        if (this.validNewValue()) {
            const updatedJoke = {
                ...this.props.joke,
                value: this.state.newValue
            };
            await this.props.changeFavorite(updatedJoke);
            this.disableChangeMode();
        }
    }

    setTextAreaHeight() {
        this.textarea.style.height = (this.textarea.scrollHeight)+"px";
    }

    render() {
        const {joke, removeFromFavorites, pushToFavorites, category} = this.props;
        return (
            <div className='joke-item'>
                <CategoryIcon category={joke.categories[0] || 'all'} />
                <div className='joke-body'>
                    {category.currentList === 'favorites' && this.state.changeMode ?
                        <textarea
                            ref={ref => this.textarea = ref}
                            value={this.state.newValue}
                            onChange={e => {
                                this.setTextAreaHeight();
                                this.setState({newValue: e.target.value})
                            }}
                        /> :
                        <p>{joke.value}</p>
                    }
                    {category.currentList === 'favorites' ? (
                        <div className='favorites-button'>
                            {this.state.changeMode ?
                                <i className="fas fa-times" onClick={() => this.disableChangeMode()} /> :
                                <i className="fas fa-pen-alt" onClick={() => this.enableChangeMode()} />
                            }
                            <i
                                className={`fas fa-save ${this.validNewValue() ? 
                                    'enabled' : 
                                    'disabled'}`}
                                onClick={() => this.saveJoke()}
                            />
                        </div>
                    ) : null}
                </div>
                {joke.favorite ?
                    <i
                        className="fas fa-star"
                        onClick={() => removeFromFavorites(joke)}
                    /> :
                    <i
                        className="far fa-star"
                        onClick={() => pushToFavorites(joke)}
                    />
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        category: state.category
    }), {
        pushToFavorites,
        removeFromFavorites,
        changeFavorite
    }
)(Joke);
