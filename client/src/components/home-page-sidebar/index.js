import { Nav, NavItem, Button, Container, NavbarToggler, Collapse, Col } from 'reactstrap'
import { useEffect, useState } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Profile from '../../pages/Profile/index'
import Home from '../../pages/home-page/index'
import Twitch from '../../pages/Games/twitch'
import GameCard from '../GameCard/gameReview'
import Review from '../../pages/review'
import APIURL from '../../../src/helpers/environment'

import './sidebar.scss'

const Sidebar = (props) => {

    const [gameName, setGameName] = useState('')
    const [gamePic, setGamePic] = useState()
    const [collapsed, setCollapsed] = useState(true)
    const [gameReviews, setGameReviews] = useState([])
    const [gamePicArray, setGamePicArray] = useState([])

    useEffect(() => {
        if (localStorage.getItem('Game Pic', 'Game Name', 'Game Reviews', 'Game Pic Array')) {
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

    const toggleNavbar = () => setCollapsed(!collapsed)

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

    useEffect(() => {
        everyPost()
    }, [])


    return (
        <div className="header">
            <Container fluid='lg' className="sideBarDiv">
                <NavbarToggler onClick={toggleNavbar} className="mr-12 toggler">Btn.Mash</NavbarToggler>
                <Col md={12}>
                    <Collapse isOpen={!collapsed}>
                        <Nav>
                            <NavItem>
                                <Link to="/">Home</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/profile">Profile</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/games">Games</Link>
                            </NavItem>

                            <NavItem>
                                <Link to="/review">Reviews</Link>
                            </NavItem>

                            <Button className="logout" onClick={props.clickLogout}>Logout</Button>
                        </Nav>
                    </Collapse>
                </Col>

            </Container>

            <div className="Route">
                <Switch>
                    <Route exact path="/">
                        <Home setGameReviews={setGameReviews} userTitle={props.userTitle} token={props.token} gamePic={gamePic} />
                    </Route>

                    <Route exact path="/profile" >
                        <Profile token={props.token} gameReviews={gameReviews} />
                    </Route>
                    <Route exact path="/games">
                        <Twitch setGameName={setGameName} setGamePic={setGamePic} token={props.token} setGamePicArray={setGamePicArray} />
                    </Route>
                    <Route exact path="/games/:id">
                        <GameCard gameReviews={gameReviews} everyPost={everyPost} gameName={gameName} gamePic={gamePic} token={props.token} userTitle={props.userTitle} />
                    </Route>
                    <Route exact path="/review">
                        <Review token={props.token} />
                    </Route>
                </Switch>
            </div>
        </div>
    )

}

export default Sidebar
