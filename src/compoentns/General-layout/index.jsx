import React, {Component} from 'react';

const routes = [{
    text: 'Jokes',
    to: '/'
}, {
    text: 'About',
    to: '/about'
}];

class GeneralLayOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpened: false
        }
    }

    async toggleMenu() {
        await this.setState({menuOpened: !this.state.menuOpened});
        const category = document.querySelector('.category');
        this.state.menuOpened ? category.classList.add('opened') : category.classList.remove('opened');
    }

    hideMenu = (e) => {
        if (e.target.classList[0] !== 'main-nav-toggle' && this.state.menuOpened) {
            const category = document.querySelector('.category');
            category.classList.remove('opened');
            this.setState({menuOpened: false});
        }
    };

    componentWillMount() {
        document.body.addEventListener('click', this.hideMenu);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.hideMenu);
    }

    render() {
        return (
            <div className="general-container">
                <header className='header'>
                    <div className='menu-block'>
                        <p
                            className={`main-nav-toggle ${this.state.menuOpened ? 'is-active' : ''}`}
                            onClick={() => this.toggleMenu()}
                        >
                            <span className="lines" />
                            <span className="cross">
                                <span className="cross-diagonal" />
                            </span>
                        </p>
                    </div>
                </header>
                {this.props.children}
            </div>
        )
    }
}


export default GeneralLayOut;