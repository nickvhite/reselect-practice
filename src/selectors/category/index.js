import {createPropSelector} from '../helper';

const categorySelectors = {};

categorySelectors.getCategoriesList = createPropSelector('category.available');
categorySelectors.getCurrentCategory = createPropSelector('category.currentCategory');
categorySelectors.getCategoryListName = createPropSelector('category.currentList');
categorySelectors.getCategory = createPropSelector('category');

export default categorySelectors;

