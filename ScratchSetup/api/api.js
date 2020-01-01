export default function fetchRepos(language){
    let endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

    return fetch(endpoint)
    .then(res =>res.json())
    .then(data => {
        if(!data.items){
            throw new Error("Error fetching repos!!")
        }
        return data.items

    })
}