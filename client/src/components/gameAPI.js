import {useState, useEffect} from 'react';

const Game = (props) => {

    const [games, getGames] = useState([])

    const Key = '8986c0d5d62b4e528711aecfb970e601'

    let gameAPI = () => {
        fetch(`https://api.rawg.io/api/games?key=${Key}`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json'
            })
        }) .then(res => res.json())
        .then(data => {
            getGames(data.review)
            console.log(data)
        })
    }

    useEffect(() => {
        gameAPI()
    }, [])

}

export default Game