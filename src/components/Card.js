import React from 'react';
import OpenWeatherMapLogo from '../img/openweathermap-logo.png';
import WeatherClean from '../img/weather/day_clear.png';
import noProfil from '../img/no-profil.png';
import portalCake from '../img/portal-cake.jpg';

import * as firebase from 'firebase';
import SpotifyWebApi from 'spotify-web-api-node';

class Card extends React.Component {
    render() {
        if (this.props.details.type === 'meteo') {
            return (
                <div className="card animated zoomIn">
                    <div className="card-section">
                        Météo à {this.props.details.value.city}
				    </div>
                    <div className="grid-x">
                        <div className="cell small-4">
                            <img src={WeatherClean} alt="description" width="100%" />
                            <p>{this.props.details.value.description}</p>
				  	    </div>
                        <div className="cell small-4">
                            {this.props.details.value.temp.main}°C
				  	    </div>
                        <div className="cell small-4">
                            Details :
				  		    Température minimale : {this.props.details.value.temp.max}°C
                            Température maximale : {this.props.details.value.temp.min}°C
                            Wind : {this.props.details.value.wind} m/s
                            Humidity : {this.props.details.value.humidity} %
                            Pressure : {this.props.details.value.pressure} hPa
				  	    </div>
                    </div>
                    <div className="card-section">
                        Plus d'info sur<a href={'https://openweathermap.org/city/' + this.props.details.value.id}><img src={OpenWeatherMapLogo} alt="logo-openweathermap" /> OpenWeatherMap</a>
				    </div>
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
                console.log(window.location);
                
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
                <div className="cell small-6">
                    <img src={key.Poster} alt="Poster" />
                    <button className="button" type="button" onClick={(e) => getMovie(e, key.imdbID)}>{key.Title}</button>
                </div>  
            );
            
            return (
                <div className="card animated zoomIn">
                    <div className="card-section">
                        Quel film recherchez-vous ?
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
            
            
            return (
                <div className="card animated zoomIn">
                    <div className="grid-x">
                        <div className="cell small-6">
                            <img src={this.props.details.value.Poster} alt="Poster" />
                        </div>
                        <div className="cell small-6">
                            <h3>{this.props.details.value.Year}</h3>
                            <h2>{this.props.details.value.Title}</h2>
                            <span>{this.props.details.value.Genre}</span><span>{this.props.details.value.Runtime}</span>
                            
                            <span className={'fa fa-star ' + rating1}></span>
                            <span className={'fa fa-star ' + rating2}></span>
                            <span className={'fa fa-star ' + rating3}></span>
                            <span className={'fa fa-star ' + rating4}></span>
                            <span className={'fa fa-star ' + rating5}></span>
                            
                            ({parseInt(this.props.details.value.imdbRating, 10) / 2}/5)
                            <p>{this.props.details.value.Plot}</p>
                            <p>Stars : {this.props.details.value.Actors}</p>
                            <a href={'https://imdb.com/title/' + this.props.details.value.imdbID} className="button">Plus d'info</a>
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
                                        <h3>{this.props.details.value.name.charAt(0).toUpperCase() + this.props.details.value.name.substring(1).toLowerCase()}</h3>
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
                        <h1>{this.props.details.type}</h1>
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