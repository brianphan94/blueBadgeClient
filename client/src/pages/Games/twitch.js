import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
 
 
import { Container, Card, CardBody, CardTitle, CardSubtitle, Col, CardFooter, CardImg, Input, InputGroupAddon, InputGroup, Button } from 'reactstrap';
 
 
import './twitch.scss'
 
const Twitch = ({setGameName, setGamePic}) => {
 
    const history = useHistory()
 
    const [games, getGames] = useState([])
    const [prevUrl, setPrevUrl] = useState('')
    const [nextUrl, setNextUrl] = useState('')
    const [search, setSearch] = useState('')
    
 
 
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
        console.log(json.results)
        
    } 
 
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
    
    const searchInput = async () => {
        let searchUrl = `https://api.rawg.io/api/games?key=6f82131966574246ad0c430c352e9788&page=1&ordering=-released,rating&search=${search}&search_exact`
        const res = await fetch(searchUrl, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        const json = await res.json()
        getGames(json.results)
        setNextUrl(json.next)
    }
    
    useEffect(() => {
        TwitchAPI()
 
    }, [])
 
 
    return (
        <div>
            <Container fluid="md" className="homeContent">
                <h1>Search and Review Games!</h1>
                {nextUrl === null ? <Button color="warning" className="next" onClick={TwitchAPI}>Back</Button> : <Button color="warning" className="next" onClick={nextPage} >Next</Button>}
                {prevUrl === null || !prevUrl ? null : <Button color="warning" className="prev" onClick={prevPage}>Previous</Button>}
                <InputGroup className="inputGroup">
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} />
                    <InputGroupAddon addonType="append">
                        <Button type='text' color="warning" onClick={searchInput}>Search</Button>
                    </InputGroupAddon>
                </InputGroup>
 
 
 
 
                {games.length > 0 ? (
                    games.map(game => (
                        <div  key={game.id}>
                            {game.background_image ? <Col className="games" sm="4">
                                <Card className="gameCard" onClick={() => {history.push(`/games/${game.name}`); setGameName(game.name); setGamePic(game.background_image)}}>
                                    <CardBody>
                                        <CardTitle>{game.name}</CardTitle>
                                        <CardSubtitle className="mb-2 text-muted">Released: {game.released}</CardSubtitle>
                                        <CardImg width='250px' height="250px" src={game.background_image} alt="game Image"></CardImg>
                                        <CardFooter className="text-muted">Rating: {game.rating} out of {game.rating_top}</CardFooter>
                                    </CardBody>
                                </Card>
                            </Col> : null}
                        </div>
                    ))
                ) : null}
 
            </Container>
        </div>
 
    )
}
 
export default Twitch