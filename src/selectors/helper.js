import {createSelector} from 'reselect';

export function createPropSelector(propName, processingFunction = data => data) {
    return createSelector(
        state => propName.split('.').reduce((obj, currentInclude) => obj[currentInclude], state),
        processingFunction
    );
}