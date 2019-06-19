export default class JokesService {
    static getFromApi(route, query = undefined) {
        return new Promise((resolve, reject) => {
            let url = new URL(`https://api.chucknorris.io/jokes/${route}`);
            if (query) {
                url.search = new URLSearchParams(query);
            }
            fetch(url)
                .then(async response => {
                    const json = await response.json();
                    if (response.status === 200) {
                        resolve(json)
                    } else {
                        reject(json);
                    }
                })
        })
    }

    static getCategories() {
        return JokesService.getFromApi('categories');
    }

    static getJoke(category = undefined) {
        return category ? JokesService.getFromApi('random', {category}) : JokesService.getFromApi('random');
    }
}

// const jokesService = new JokesService();
//
// export default jokesService;