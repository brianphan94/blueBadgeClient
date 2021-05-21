import {useState, useEffect} from 'react';

const Twitch = (props) => {

    const [games, getGames] = useState([])

    let TwitchAPI = () => {
        fetch('https://api.igdb.com/v4/games', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Client-ID': 'mq1b195cgzt0h1iwlnjtz1eto64p09',
                'Authorization': 'Bearer zpwv4gs9qqfiexn3ph1yy8fttbi2tq'
            })
        }) .then(res => res.json())
        .then(data => {
            getGames(data.review)
            console.log(data)
        })
    }

    useEffect(() => {
        TwitchAPI()
    }, [])

}

export default Twitch