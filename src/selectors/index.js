import jokesSelectors from './jokes';
import categorySelectors from './category';

export default {
    ...jokesSelectors,
    ...categorySelectors
}