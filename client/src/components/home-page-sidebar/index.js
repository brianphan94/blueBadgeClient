import { Button, NavbarBrand } from 'reactstrap'
import { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'

import Twitch from '../../pages/Games/twitch'
import GameCard from '../GameCard/gameReview'
import APIURL from '../../../src/helpers/environment'
import Logo from '../header/Logo.png'
import Logout from './door-open.svg'

import './sidebar.scss'

const Sidebar = (props) => {

    const [gameName, setGameName] = useState('')
    const [gamePic, setGamePic] = useState()
    const [gameReviews, setGameReviews] = useState([])

    useEffect(() => {
        if (localStorage.getItem('Game Pic', 'Game Name', 'Game Reviews')) {
            setGamePic(localStorage.getItem('Game Pic'))
            setGameName(localStorage.getItem('Game Name'))
            let retrieved = localStorage.getItem('Game Reviews')
            setGameReviews(JSON.parse(retrieved))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('Game Pic', gamePic)
        localStorage.setItem('Game Name', gameName)
        localStorage.setItem('Game Reviews', JSON.stringify(gameReviews))
    }, [gamePic, gameName, gameReviews])

    const everyPost = () => {
        fetch(`${APIURL}/review/all`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
            .then((data) => {
                setGameReviews(data.review)

            }).catch(err => {
                console.log("hit: ", err)
            })
    }

    const deleteReview = (review) => {
        fetch(`${APIURL}/review/delete/${review.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
            .then(() => everyPost())
    }

    useEffect(() => {
        everyPost()
    }, [])

    return (
        <div>
            <div className="logout">
                <Button className='logoutBtn'>
                    <img src={Logout} onClick={props.clickLogout} />
                </Button>
            </div>
            <div className="sideBarDiv">
                <NavbarBrand className='siteLogo'>
                    <img src={Logo} alt='Site Logo' />
                    <h4 className="toggler">Btn.Mash</h4>
                </NavbarBrand>
            </div>
            <div className="Route">
                <Switch>
                    <Route exact path="/">
                        <Twitch setGameName={setGameName} setGamePic={setGamePic} token={props.token} />
                    </Route>
                    <Route exact path="/games/:id">
                        <GameCard
                            deleteReview={deleteReview}
                            gameReviews={gameReviews}
                            everyPost={everyPost}
                            gameName={gameName}
                            gamePic={gamePic}
                            token={props.token}
                            userTitle={props.userTitle} />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default Sidebar