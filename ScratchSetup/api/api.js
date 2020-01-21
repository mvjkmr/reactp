const id = 'b89aed4502ce528a0ce0';
const secret = '2d9d8b909fe7d386024d88a764f777d5140f4bcd';

const params = `?client_id=${id}&client_secret=${secret}`;

function getErrorMessage(message,username){
    if(message === 'Not Found')
        return `${username} profile does not exist`;

    return message;
}

function getProfile(username){
    return fetch(`https://api.github.com/users/${username}${params}`)
    .then(res => res.json())
    .then(profile => {
        if(profile.message){
            throw new Error(getErrorMessage(profile.message,username));
        }
       return profile;
    })
}

function getRepos(username){
    return fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
    .then(res => res.json())
    .then(repos => {
        if(repos.message){
            throw new Error(getErrorMessage(repos.message,username))
        }
        return repos;
    })
}

function calculateScore(followers,repos){
    return repos.reduce((count,{stargazers_count}) => count+stargazers_count ,0)
}

function getUserData(player){
    return Promise.all([getProfile(player),getRepos(player)])
    .then(([profile,repos])=>({
        profile,
        score:calculateScore(profile.followers,repos)
    }))
}

function sortPlayers(results){
    return results.sort((a,b) => b.score - a.score);
}

export function battle(players){
    const [playerOne,playerTwo] = players;
    return Promise.all([
        getUserData(playerOne),
        getUserData(playerTwo)
    ])
    .then((results) => {
        return sortPlayers(results);
    })
}

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