import React, { useState, useEffect } from 'react'
import axios from '../axios'
import './Row.scss'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original/"

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")
    const [error, setError] = useState("")
    const [movieClick, setMovieClick] = useState("")

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request
        }
        fetchData()
    }, [fetchUrl])

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            // "https://developers.google.com/youtube/player_parameters"
            autoplay: 1,
        }
    }

    const handleClick = (movie) => {   
        setMovieClick(movie)
        if (error) {
            setError("")
        }
        else if (trailerUrl) {
            setTrailerUrl("")
        }
        else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search)
                    setTrailerUrl(urlParams.get('v'))
                })
                .catch(error => {
                    setError(error)
                })
        }
    }

    // next trailer or error should pop up w/ one click if another movie is clicked
    // two trailers play when in diff rows

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__poster--large"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            <div className="error__message">
                {error && 'Trailer not available :('}
            </div>
        </div>
    )
}

export default Row