import { useState, useEffect } from 'react';
import { Container, Card, CardBody, CardTitle, CardSubtitle, Col, CardFooter, CardImg, Input, InputGroupAddon, InputGroup, Button } from 'reactstrap';
import './twitch.scss'

const Twitch = (props) => {

    const [games, getGames] = useState([])
    const [prevUrl, setPrevUrl] = useState('')
    const [nextUrl, setNextUrl] = useState('')


    let TwitchAPI = async () => {
        let url = "https://api.rawg.io/api/games?key=6f82131966574246ad0c430c352e9788&page=1&page_size=12&ordering=-released,rating"

        const res = await fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        const json = await res.json()
        getGames(json.results)
        setNextUrl(json.next)
        setPrevUrl(json.previous)
    }

    useEffect(() => {
        TwitchAPI()

    }, [])

    const nextPage = async () => {
        if (nextUrl) {
            const res = await fetch(nextUrl, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            const json = await res.json()
            getGames(json.results)
            setNextUrl(json.next)
            setPrevUrl(json.previous)
        }
    }

    const prevPage = async () => {
        if (prevUrl) {
            const res = await fetch(prevUrl, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            const json = await res.json()
            getGames(json.results)
            setPrevUrl(json.previous)
        }
    }

    return (
        <div>
            <Container fluid="md" className="homeContent">
            <h1>Welcome</h1>
                <Button color="warning" className="next" onClick={nextPage} >Next</Button>
                {prevUrl === null ? null : <Button color="warning" className="prev" onClick={prevPage}>Previous</Button>}
                <InputGroup className="inputGroup">
                    <Input />
                    <InputGroupAddon addonType="append">
                        <Button color="warning">Search</Button>
                    </InputGroupAddon>
                </InputGroup>




                {games.length > 0 ? (
                    games.map(game => (

                        <div>
                            <Col className="games" sm="4">
                                <Card>
                                    <CardBody>
                                        <CardTitle>{game.name}</CardTitle>
                                        <CardSubtitle className="mb-2 text-muted">Released: {game.released}</CardSubtitle>
                                        <CardImg width='250px' height="250px" src={game.background_image} alt="game Image"></CardImg>
                                        <CardFooter className="text-muted">Rating: {game.rating} out of {game.rating_top}</CardFooter>
                                    </CardBody>
                                </Card>
                            </Col>
                        </div>




                    ))
                ) : null}


            </Container>
        </div>

    )
}

export default Twitch