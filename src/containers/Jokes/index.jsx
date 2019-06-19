import React from 'react';

import JokesContainer from '../JokesContainer';
import JokesNavigator from '../JokesNavigator';

const Jokes = () => (
    <div className='container'>
        <JokesNavigator/>
        <JokesContainer/>
    </div>
);

export default Jokes;
