import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import { Container, Card, CardBody, CardTitle, CardSubtitle, Col, CardFooter, CardImg, Input, InputGroupAddon, InputGroup, Button, Spinner } from 'reactstrap';

import './twitch.scss'

const Twitch = ({ setGameName, setGamePic}) => {

    const history = useHistory()
    const [games, setGames] = useState([])
    const [gameUrl, setGameUrl] = useState(`https://api.rawg.io/api/games?key=6f82131966574246ad0c430c352e9788&page=1&page_size=12&ordering=-released,rating`)
    const [prevUrl, setPrevUrl] = useState('')
    const [nextUrl, setNextUrl] = useState('')
    const [search, setSearch] = useState('')
    const [backUrl, setBackUrl] = useState('')
   

    let TwitchAPI = async () => {

        const res = await fetch(gameUrl, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        const json = await res.json()
        setGames(json.results)
        setNextUrl(json.next)
        setPrevUrl(json.previous)     
    }

    const searchInput = async () => {
        let searchUrl = `https://api.rawg.io/api/games?key=6f82131966574246ad0c430c352e9788&page=1&ordering=-released,rating&search=${search}&search_exact`
        const res = await fetch(searchUrl, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        const json = await res.json()
        setGames(json.results)
        setNextUrl(json.next) 
        setPrevUrl(json.previous)    
    }

    useEffect(() => {
        TwitchAPI()
        setBackUrl('https://api.rawg.io/api/games?key=6f82131966574246ad0c430c352e9788&page=1&page_size=12&ordering=-released,rating')
    }, [gameUrl, backUrl])

    return (
        <div>
            <Container fluid="md" className="gameContent">
                <h4>Search and Review Games!</h4>
                <hr />
                {nextUrl === null ? <Button color="warning" className="next" onClick={() => {setGameUrl(backUrl); setBackUrl(gameUrl); setSearch('')}}>Back</Button> : <Button color="warning" className="next" onClick={() => setGameUrl(nextUrl)} >Next</Button>}
                {prevUrl === null || !prevUrl ? null : <Button color="warning" className="prev" onClick={() => setGameUrl(prevUrl)}>Previous</Button>}
                <InputGroup className="inputGroup">
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} />
                    <InputGroupAddon addonType="append">
                        <Button className="searchButton" type='text' color="warning" onClick={searchInput}>Search</Button>
                    </InputGroupAddon>
                </InputGroup>

                {games?.length > 0 ? (
                    games?.map(game => (
                        <div key={game?.id}>
                            {game?.background_image ? <Col className="games" sm="3" xs="12">
                                <Card className="gameCard" onClick={() => { history.push(`/games/${game?.name}`); setGameName(game?.name); setGamePic(game?.background_image);}}>
                                    <CardBody>
                                        <CardTitle>{game?.name}</CardTitle>
                                        <CardSubtitle className="mb-2 text-muted">Released: {game?.released}</CardSubtitle>
                                        <CardImg width='250px' height="250px" src={game?.background_image} alt="game Image"></CardImg>
                                        <CardFooter className="text-muted">Rating: {game?.rating} out of {game?.rating_top}</CardFooter>
                                    </CardBody>
                                </Card>
                            </Col> : null}
                        </div>
                    ))
                ) : <Spinner color="warning">{' '}</Spinner> }

            </Container>
        </div>

    )
}

export default Twitch