import React from 'react';

import JokesContainer from '../../containers/JokesContainer';
import JokesNavigator from '../../containers/JokesNavigator';

const Jokes = () => (
    <div className='container'>
        <JokesNavigator/>
        <JokesContainer/>
    </div>
);

export default Jokes;
