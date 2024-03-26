import React, { useState, useEffect } from 'react'
import axios from '../axios'
import './Row.scss'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original/"

const Row = ({ title, fetchUrl, isLargeRow, rowSelected, setRowSelected }) => {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState(null)
    const [movieSelected, setMovieSelected] = useState(null)

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

    useEffect(() => {
        if (rowSelected !== title) {
            setTrailerUrl(null)
        }
    }, [rowSelected])

    const handleClick = async (movie) => {
        setRowSelected(title)
        if (movieSelected === movie.id) {
            setTrailerUrl(null)
            setMovieSelected(null)
        }
        else {
            setMovieSelected(movie.id)
            const result = await movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search)
                    return urlParams.get('v')
                })
                .catch(error => {
                    return ""
                })
            setTrailerUrl(result)
        }
    }
    
// next trailer or error should pop up w/ one click if another movie is active
    // if the same movie is clicked, reset its state
    // if a diff movie is clicked, update its state & make sure other state is falsey

    // const handleClick = (movie) => {   
    //     setMovieClick(movie.id)
    //     console.log(movieClick)
    //     if (movieClick === movie.id) {
    //         setTrailerUrl("")
    //         setMovieClick("")
    //         setError("")
    //     }
    //     else {
    //         movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
    //             .then(url => {
    //                 const urlParams = new URLSearchParams(new URL(url).search)
    //                 setTrailerUrl(urlParams.get('v'))
    //                 setError("")
    //             })
    //             .catch(error => {
    //                 setError(error)
    //                 setTrailerUrl("")
    //             })
    //     }
    // }

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
            {trailerUrl !== null && (trailerUrl !== ""
                ? <YouTube videoId={trailerUrl} opts={opts} />
                : <div className="error__message">
                    {'Trailer not available :('}
                </div>)}
        </div>
    )
}

export default Row