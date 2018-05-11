import React from 'react';
/* import OpenWeatherMapLogo from '../img/openweathermap-logo.png'; */
import noProfil from '../img/no-profil.png';
import portalCake from '../img/portal-cake.jpg';
import mumbai from '../img/mumbai.jpg';

import * as firebase from 'firebase';
import SpotifyWebApi from 'spotify-web-api-node';

class Card extends React.Component {
    render() {
        if (this.props.details.type === 'meteo') {

            function getBeafort(kmh) {
                if (kmh < 1) {
                    return 0;
                } else if (kmh < 6) {
                    return 1;
                } else if (kmh < 12) {
                    return 2;
                } else if (kmh < 20) {
                    return 3;
                } else if (kmh < 29) {
                    return 4;
                } else if (kmh < 39) {
                    return 5;
                } else if (kmh < 50) {
                    return 6;
                } else if (kmh < 62) {
                    return 7;
                } else if (kmh < 75) {
                    return 8;
                } else if (kmh < 89) {
                    return 9;
                } else if (kmh < 103) {
                    return 10;
                } else if (kmh < 118) {
                    return 11;
                } else if (kmh >= 118) {
                    return 12;
                } else {
                    return 'error';
                }
            }     
            
            function getIcon(id) {
                var day = id.substring(2);
                var temps = id.substring(0, 2);
                if (day === 'n') {
                    if (temps === '01') {
                        return 'night-clear';
                    } else if (temps === '02') {
                        return 'night-cloudy';
                    } else if (temps === '03') {
                        return 'night-cloud';
                    } else if (temps === '04') {
                        return 'cloudy';
                    } else if (temps === '09') {
                        return 'showers';
                    } else if (temps === '10') {
                        return 'night-rain';
                    } else if (temps === '11') {
                        return 'night-thunderstorm';
                    } else if (temps === '13') {
                        return 'night-snow';
                    } else if (temps === '50') {
                        return 'night-fog';
                    } else {
                        return 'error';
                    }
                } else if (day === 'd') {
                    if (temps === '01') {
                        return 'day-sunny';
                    } else if (temps === '02') {
                        return 'day-cloudy';
                    } else if (temps === '03') {
                        return 'cloud';
                    } else if (temps === '04') {
                        return 'cloudy';
                    } else if (temps === '09') {
                        return 'showers';
                    } else if (temps === '10') {
                        return 'day-rain';
                    } else if (temps === '11') {
                        return 'day-thunderstorm';
                    } else if (temps === '13') {
                        return 'day-snow';
                    } else if (temps === '50') {
                        return 'day-fog';
                    } else {
                        return 'error';
                    }
                } else {
                    return 'error';
                }
            }
            
            function getTime(time) {
                time = time.substring(11, 13);
                if (time > 12) {
                    return time - 12;
                } else if (time <= 12 && time < 10) {
                    if (time === 0) {
                        return 12;
                    } else {
                        return time.substring(1);
                    }
                } else if (time <= 12 && time >= 10) {
                    return time;
                } else {
                    return 'error';
                }
            }

            return (
                <div className="app-meteo animated zoomIn">
                    <div className="header">
                        <img src={mumbai} alt="" />
                        <span className="city">
                            {this.props.details.value.city.name}, {this.props.details.value.city.country}
                            <i className="fa fa-map-marker"></i>
                            <span className="today">Today</span>
                        </span>
                        <span className="weather">
                            <span className="temp">
                                {this.props.details.value.list[0].main.temp}<sup>&deg;</sup>
                                <span className="unit">c</span>
                            </span>
                            <span className="wind-scale">
                                <table>
                                    <tr>
                                        <td>Wind Direction</td>
                                        <td>
                                            <i className={'wi wi-wind towards-' + this.props.details.value.list[0].wind.deg + '-deg'}></i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Wind Scale</td>
                                        <td>
                                            <i className={'wi wi-wind-beaufort-' + getBeafort(this.props.details.value.list[0].wind.speed * 3.6)}></i>
                                        </td>
                                    </tr>
                                </table>
                            </span>
                            <i className={'wi wi-' + getIcon(this.props.details.value.list[0].weather[0].icon)}></i>
                            <span className="time">
                                <i className={'wi wi-time-' + getTime(this.props.details.value.list[0].dt_txt)}></i>
                            </span>
                            <span className="day">Monday</span>
                        </span>
                    </div>
                    <div className="body">
                        <span className="title">Weather Stats</span>
                        <div className="graph">
                            <ul>
                                <li className={'today graph-knob-mt-' + Math.round(this.props.details.value.list[0].main.temp)}>
                                    <span className="graph-temp">
                                        <i className={'wi wi-' + getIcon(this.props.details.value.list[0].weather[0].icon)}></i>
                                        {Math.round(this.props.details.value.list[0].main.temp)}<sup>&deg;</sup>
                                    </span>
                                    <i className={'wi wi-time-' + getTime(this.props.details.value.list[0].dt_txt)}></i>
                                </li>
                                <li className={'graph-knob-mt-' + Math.round(this.props.details.value.list[1].main.temp)}>
                                    <span className="graph-temp">
                                        <i className={'wi wi-' + getIcon(this.props.details.value.list[1].weather[0].icon)}></i>
                                        {Math.round(this.props.details.value.list[1].main.temp)}<sup>&deg;</sup>
                                    </span>
                                    <i className={'wi wi-time-' + getTime(this.props.details.value.list[1].dt_txt)}></i>
                                </li>
                                <li className={'graph-knob-mt-' + Math.round(this.props.details.value.list[2].main.temp)}>
                                    <span className="graph-temp">
                                        <i className={'wi wi-' + getIcon(this.props.details.value.list[2].weather[0].icon)}></i>
                                        {Math.round(this.props.details.value.list[2].main.temp)}<sup>&deg;</sup>
                                    </span>
                                    <i className={'wi wi-time-' + getTime(this.props.details.value.list[2].dt_txt)}></i>
                                </li>
                                <li className={'graph-knob-mt-' + Math.round(this.props.details.value.list[3].main.temp)}>
                                    <span className="graph-temp">
                                        <i className={'wi wi-' + getIcon(this.props.details.value.list[3].weather[0].icon)}></i>
                                        {Math.round(this.props.details.value.list[3].main.temp)}<sup>&deg;</sup>
                                    </span>
                                    <i className={'wi wi-time-' + getTime(this.props.details.value.list[3].dt_txt)}></i>
                                </li>
                                <li className={'graph-knob-mt-' + Math.round(this.props.details.value.list[4].main.temp)}>
                                    <span className="graph-temp">
                                        <i className={'wi wi-' + getIcon(this.props.details.value.list[4].weather[0].icon)}></i>
                                        {Math.round(this.props.details.value.list[4].main.temp)}<sup>&deg;</sup>
                                    </span>
                                    <i className={'wi wi-time-' + getTime(this.props.details.value.list[4].dt_txt)}></i>
                                </li>
                                <li className={'graph-knob-mt-' + Math.round(this.props.details.value.list[5].main.temp)}>
                                    <span className="graph-temp">
                                        <i className={'wi wi-' + getIcon(this.props.details.value.list[5].weather[0].icon)}></i>
                                        {Math.round(this.props.details.value.list[5].main.temp)}<sup>&deg;</sup>
                                    </span>
                                    <i className={'wi wi-time-' + getTime(this.props.details.value.list[5].dt_txt)}></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <div className="footer">
                        <span className="title">Friends</span>
                        <ul className="friends">
                            <li>
                                <img src="imgs/hardik.jpg" alt="" />
                                <span className="friends-city-weather">
                                    <i className="wi wi-night-sprinkle"></i>
                                    <span className="temp">25<sup>&deg;</sup></span>
                                </span>
                                <span className="detail">
                                    Hardik
                                    <span className="city">
                                        Surat
                                    </span>
                                    <span className="country">
                                        India
                                    </span>
                                </span>
                            </li>
                            <li>
                                <img src="imgs/virat.jpg" alt="" />
                                <span className="friends-city-weather">
                                    <i className="wi wi-night-cloudy-high"></i>
                                    <span className="temp">21<sup>&deg;</sup></span>
                                </span>
                                <span className="detail">
                                    Virat
                                    <span className="city">
                                        Delhi
                                    </span>
                                    <span className="country">
                                        India
                                    </span>
                                </span>
                            </li>
                            <li>
                                <img src="imgs/dhoni.jpg" alt="" />
                                <span className="friends-city-weather">
                                    <i className="wi wi-night-cloudy-windy"></i>
                                    <span className="temp">29<sup>&deg;</sup></span>
                                </span>
                                <span className="detail">
                                    Dhoni
                                <span className="city">
                                        Ranchi
                                </span>
                                    <span className="country">
                                        India
                                </span>
                                </span>
                            </li>
                            <li>
                                <img src="imgs/sachin.jpg" alt="" />>
                                <span className="friends-city-weather">
                                    <i className="wi wi-night-sleet"></i>
                                    <span className="temp">22<sup>&deg;</sup></span>
                                </span>
                                <span className="detail">
                                    Sachin
                                    <span className="city">
                                            Mumbai
                                    </span>
                                    <span className="country">
                                        India
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div> */}
                </div>
            )
        } else if (this.props.details.type === 'movie-search') {
            function getMovie(e, id) {
                e.preventDefault();
                var movieUrl = 'https://www.omdbapi.com/?apikey=4ac2ef70&i=' + id;
                
                var request = new XMLHttpRequest();
                request.open('GET', movieUrl);
                request.responseType = 'json';
                request.send();
                
                request.onload = function () {
                    var movie = request.response;
                    const ref = firebase.database().ref('/');
                    ref.on('value', snapshot => {
                        var lastID = Object.keys(snapshot.val().request).sort()[Object.keys(snapshot.val().request).length - 1]
                        firebase.database().ref('request/' + lastID).set({
                            type: 'movie',
                            value: movie
                        }).then(window.location.replace(window.location));
                    })
                }
            }
            
            const result = this.props.details.value.map(key => 
                <div key={key.imdbID.substring(2)} className="cell small-6">
                    <div className="card search-item">
                        <img src={key.Poster} alt="Poster" />
                        <button className="search-item-info" onClick={(e) => getMovie(e, key.imdbID)}>
                            <span className="search-item-title">{key.Title}<br /><span className="search-item-year">({key.Year})</span></span>
                        </button>
                    </div>
                </div>
            );
                     
            return (
                <div className="card animated zoomIn">
                    <div className="card-section">
                        <h3 className="search-movie-title">Quel film recherchez-vous ?</h3>
                    </div>
                    <div className="card-section">
                        <div className="grid-x">
                            {result}
                        </div>
                    </div>
                </div>
            )
            
        } else if (this.props.details.type === 'movie') {

            var rating1 = '';
            var rating2 = '';
            var rating3 = '';
            var rating4 = '';
            var rating5 = '';

            var rating = Math.round(parseInt(this.props.details.value.imdbRating, 10) / 2);
            if (rating === 1) {
                rating1 = 'checked';
                rating2 = '';
                rating3 = '';
                rating4 = '';
                rating5 = '';
            } else if (rating === 0) {
                rating1 = '';
                rating2 = '';
                rating3 = '';
                rating4 = '';
                rating5 = '';
            } else if (rating === 2) {
                rating1 = 'checked';
                rating2 = 'checked';
                rating3 = '';
                rating4 = '';
                rating5 = '';
            } else if (rating === 3) {
                rating1 = 'checked';
                rating2 = 'checked';
                rating3 = 'checked';
                rating4 = '';
                rating5 = '';
            } else if (rating === 4) {
                rating1 = 'checked';
                rating2 = 'checked';
                rating3 = 'checked';
                rating4 = 'checked';
                rating5 = '';
            } else if (rating === 5) {
                rating1 = 'checked';
                rating2 = 'checked';
                rating3 = 'checked';
                rating4 = 'checked';
                rating5 = 'checked';
            }
            
            function setSizeMoviePoster() {
                var arrayMoviePoster = document.querySelectorAll("a[data-type = movie-poster]");
                arrayMoviePoster.forEach(element => {
                    var moviePoster = element;
                    var imgUrl = moviePoster.firstElementChild.currentSrc;
                
                    var cell = moviePoster.parentElement;

                    var width = cell.offsetWidth;
                    
                    var height = cell.parentElement.lastElementChild.firstElementChild.offsetHeight;

                    var span = document.createElement('span');
                    span.className = 'movie-poster-background';
                    span.style.height = height + 'px';
                    span.style.backgroundImage = 'url(' + imgUrl + ')';               

                    if (cell.childElementCount >= 2) {
                        var elementToRomve = cell.children[0];                   
                        elementToRomve.remove()
                    }
                    
                    moviePoster.parentNode.insertBefore(span, moviePoster);
                    moviePoster.style.height = height + 'px';
                    moviePoster.style.width = width + 'px';
                    moviePoster.style.width = width + 'px';
                }); 
            }

            window.onresize = setSizeMoviePoster;

            return (
                <div className="card animated zoomIn">
                    <div className="grid-x">
                        <div className="cell small-6">
                            <a data-type="movie-poster" className="movie-poster" href={'https://imdb.com/title/' + this.props.details.value.imdbID}><img onLoad={setSizeMoviePoster} src={this.props.details.value.Poster} alt="Poster" /></a >
                        </div>
                        <div className="cell small-6">
                            <div className="grid-y grid-padding-x">
                                <div className="cell">
                                    <h5 className="movie-year">{this.props.details.value.Year}</h5>
                                </div>
                                <div className="cell">
                                    <h3 className="movie-title">{this.props.details.value.Title}</h3>
                                </div>
                                <div className="cell">
                                    <div className="grid-x">
                                        <div className="cell auto">
                                            <span className="movie-genre">{this.props.details.value.Genre}</span>
                                        </div>
                                        <div className="cell  shrink">
                                            <span className="movie-runtime">{this.props.details.value.Runtime}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cell">
                                    <span className={'fa fa-star ' + rating1}></span>
                                    <span className={'fa fa-star ' + rating2}></span>
                                    <span className={'fa fa-star ' + rating3}></span>
                                    <span className={'fa fa-star ' + rating4}></span>
                                    <span className={'fa fa-star ' + rating5}></span>
                                    {parseFloat(this.props.details.value.imdbRating, 10) / 2}/5
                                </div>
                                <div className="cell">
                                    <p>{this.props.details.value.Plot}</p>
                                </div>
                                <div className="cell">
                                    <span><b>Stars :</b> {this.props.details.value.Actors}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) 
        } else if (this.props.details.type === 'music-artist-search') {
            function getArtist(e, id) {
                e.preventDefault();
                var spotifyApi = new SpotifyWebApi({
                    clientId: 'c30151145c1c4994a24d528d00ba40fe',
                    clientSecret: '98331a2dd8154f6692b1d098b780e5b8',
                    redirectUri: 'https://www.example.com/callback'
                });
                spotifyApi.setAccessToken('BQCaW5U2yoyFeRFDKFPjGFAAlctTjCUweqRfo2pDLw4GiTRtJT-cdBYXYZwa2vhhiIU8NDWboKxh5bSAUmcbQ8wxqpf8jlFMbMcPdq7uX5uxUoZ8VjO_RpyFYxf_yhv79uKWkv_kTA');
                spotifyApi.getArtist(id)
                    .then(function (data) {
                        console.log('Artists information', data.body);
                        const ArtistInfo = data.body;

                        spotifyApi.getArtistAlbums(id)
                            .then(function (data) {
                                console.log('Artist albums', data);
                                const ArtistAlbum = data.body.items;
                                const ref = firebase.database().ref('/');
                                ref.on('value', snapshot => {
                                    var lastID = Object.keys(snapshot.val().request).sort()[Object.keys(snapshot.val().request).length - 1]
                                    firebase.database().ref('request/' + lastID).set({
                                        type: 'music-artist',
                                        value: {
                                            info: ArtistInfo,
                                            albums: ArtistAlbum
                                        }
                                    })
                                });
                            }, function (err) {
                                console.error(err);
                            });
                    }, function (err) {
                        console.error(err);
                    });
            }

            const result = this.props.details.value.map(key => 
                <div className="cell small-6">
                    <img src={(key.images ? key.images[0].url : noProfil)} alt="Poster" />
                    <button className="button" type="button" onClick={(e) => getArtist(e, key.id)}>{key.name}</button>
                </div>
            );

            return (
                <div className="card animated zoomIn">
                    <div className="card-section">
                        Quel artiste recherchez-vous ?
                    </div>
                    <div className="card-section">
                        <div className="grid-x">
                            {result}
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.details.type === 'music-artist') {

            console.log(parseInt(this.props.details.value.albums[0].id, 36));
            
            
            
            const albums = this.props.details.value.albums.map(key =>
                <div key={parseInt(key.id, 36)} className="cell small-3">
                    <a href={key.external_urls.spotify}><img src={(key.images ? key.images[0].url : noProfil)} alt="Poster" /></a>
                </div> 
            );
            
            return (
                <div className="card animated zoomIn">
                    <div className="grid-x">
                        <div className="cell small-6">
                            <img src={this.props.details.value.info.images[0].url} alt="Poster" />
                        </div>
                        <div className="cell small-6">
                            <h2><a href={this.props.details.value.info.external_urls.spotify}>{this.props.details.value.info.name}</a></h2>
                        </div>
                            {albums}
                    </div>
                    <div className="grid-x">

                    </div>
                </div>
            )
        } else if (this.props.details.type === 'pokemon') {
            
            const widthProgressBar = {
                "0": {
                    "width": this.props.details.value.stats[0].base_stat * 100 / 255 + '%'
                },
                "1": {
                    "width": this.props.details.value.stats[1].base_stat * 100 / 255 + '%'
                },
                "2": {
                    "width": this.props.details.value.stats[2].base_stat * 100 / 255 + '%'
                },

                "3": {
                    "width": this.props.details.value.stats[3].base_stat * 100 / 255 + '%'
                },

                "4": {
                    "width": this.props.details.value.stats[4].base_stat * 100 / 255 + '%'
                },

                "5": {
                    "width": this.props.details.value.stats[5].base_stat * 100 / 255 + '%'
                }
            }
            
            function swapShiny(e, id) {
                e.preventDefault();
                const imgNormal = document.getElementById('imgNormal-' + id);
                const imgShiny = document.getElementById('imgShiny-' + id);
                const isNormal = imgNormal.attributes[1].value;
                const button = document.getElementById('shinySwap-' + id);

                if (isNormal === 'true') {
                    imgNormal.setAttribute('visible', false);
                    imgShiny.setAttribute('visible', true);
                    button.setAttribute('value', 'Afficher Normal');
                } else if (isNormal === 'false') {
                    imgNormal.setAttribute('visible', true);
                    imgShiny.setAttribute('visible', false);
                    button.setAttribute('value', 'Afficher Shiny');
                }
                
            }
            
            const idPokemon = this.props.details.value.id;

            return (
                <div className="card animated zoomIn">
                    <div className="grid-x">
                        <div className="cell small-5">
                            <div className="grid-x">
                                <div className="cell small-12">
                                    <div className="grid-x">
                                        <div className="cell small-12">
                                            <center>
                                                <span id={'imgNormal-' + idPokemon} visible="true" >
                                                    <img width="96px" alt="img-pokemon" src={this.props.details.value.sprites.front_default} />
                                                    <img width="96px" alt="img-pokemon" src={this.props.details.value.sprites.back_default} />
                                                </span>
                                                <span id={'imgShiny-' + idPokemon} visible="false">
                                                    <img width="96px" alt="img-pokemon" src={this.props.details.value.sprites.front_shiny} />
                                                    <img width="96px" alt="img-pokemon" src={this.props.details.value.sprites.back_shiny} />
                                                </span>
                                            </center>
                                        </div>
                                        <div className="cell small-12">
                                            <center>
                                                <input className="button" type="button" name="shinySwap" id={'shinySwap-' + idPokemon} value="Afficher Shiny" onClick={(e) => swapShiny(e, idPokemon)} />
                                            </center>
                                        </div>
                                    </div>   
                                </div>
                                <div className="cell small-12">
                                    <center>
                                        <h3 className="pokemon-name">{this.props.details.value.name.charAt(0).toUpperCase() + this.props.details.value.name.substring(1).toLowerCase()}</h3>
                                    </center>
                                </div>
                                <div className="cell small-12">
                                    <center>
                                        {this.props.details.value.types[1] &&
                                            <span className={'pill type ' + this.props.details.value.types[1].type.name}>{this.props.details.value.types[1].type.name}</span>
                                        } 
                                        <span className={'pill type ' + this.props.details.value.types[0].type.name}>{this.props.details.value.types[0].type.name}</span>
                                    </center>
                                </div>
                            </div>
                        </div>
                        <div className="cell small-7">
                            <div className="grid-x grid-padding-x">
                                <div className="cell small-6">
                                    <b>Poid :</b> {this.props.details.value.weight / 10} kg
                                </div>
                                <div className="cell small-6">
                                    <b>Taille :</b> {this.props.details.value.height / 10} m
                                </div>
                            </div>
                            <div className="grid-x grid-padding-x">
                                <div className="cell small-6">
                                    PV :
                                    <div className="progress">
                                        <span className="progress-meter" style={widthProgressBar[5]}>
                                            <p className="progress-meter-text">{this.props.details.value.stats[5].base_stat}</p>
                                        </span>
                                    </div>
                                </div>
                                <div className="cell small-6">
                                    Vitesse :
                                    <div className="warning progress">
                                        <span className="progress-meter" style={widthProgressBar[0]}>
                                            <p className="progress-meter-text">{this.props.details.value.stats[0].base_stat}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid-x grid-padding-x">
                                <div className="cell small-6">
                                    Attaque :
                                    <div className="alert progress">
                                        <span className="progress-meter" style={widthProgressBar[4]}>
                                            <p className="progress-meter-text">{this.props.details.value.stats[4].base_stat}</p>
                                        </span>
                                    </div>
                                </div>
                                <div className="cell small-6">
                                    Attaque Spé. :
                                    <div className="alert progress">
                                        <span className="progress-meter" style={widthProgressBar[2]}>
                                            <p className="progress-meter-text">{this.props.details.value.stats[2].base_stat}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid-x grid-padding-x">
                                <div className="cell small-6">
                                    Défense :
                                    <div className="success progress">
                                        <span className="progress-meter" style={widthProgressBar[3]}>
                                            <p className="progress-meter-text">{this.props.details.value.stats[3].base_stat}</p>
                                        </span>
                                    </div>
                                </div>
                                <div className="cell small-6">
                                    Défense Spé. :
                                    <div className="success progress">
                                        <span className="progress-meter" style={widthProgressBar[1]}>
                                            <p className="progress-meter-text">{this.props.details.value.stats[1].base_stat}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )  
        } else if (this.props.details.type === 'error') {
            return (
                <div className="callout alert animated zoomIn">
                    <h1>Erreur</h1>
                    <p>{this.props.details.value}</p>
                </div>
            ) 
        } else if (this.props.details.type === 'faim') {
            return (
                <div className="card animated zoomIn">
                    <div className="card-section">
                        <h1>Attention</h1>
                        <p>
                            <img className="portal-cake" alt="Portal Cake" src={portalCake} /> {this.props.details.value}
                        </p>
                    </div>
                </div>
            )
        } else if (this.props.details.type === 'joke') {
            return (
                <div className="card animated zoomIn">
                    <div className="card-section">
                        <h1><important>{this.props.details.type}</important></h1>
                        <p>{this.props.details.value}</p>
                    </div>
                </div>
            ) 
        } else {
            return (
                <div className="card animated zoomIn">
                    <div className="card-section">
                        <h1>{this.props.details.type}</h1>
                        <p>valeur</p>
                    </div>
                </div>  
            )  
        }
    }
}

export default Card;