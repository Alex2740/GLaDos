import React from 'react';

import * as firebase from 'firebase';
import SpotifyWebApi from 'spotify-web-api-node';
import Pokedex from 'pokedex-promise-v2';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value.toLowerCase() });
    }

    handleSubmit(event) {
        event.preventDefault();

        const myRegex = /(meteo) ([a-z ]+)|meteo|(film) ([a-z ]+)|(artist) ([a-z ]+)|(pokedex) ([a-z ]+)|faim|joke/;
        const today = new Date();
        const ref = today.getFullYear().toString() + ((today.getMonth() + 1).toString().length < 2 ? '0' + (today.getMonth() + 1).toString() : (today.getMonth() + 1).toString()) + (today.getDate().toString().length < 2 ? '0' + today.getDate().toString() : today.getDate().toString()) + (today.getHours().toString().length < 2 ? '0' + today.getHours().toString() : today.getHours().toString()) + (today.getMinutes().toString().length < 2 ? '0' + today.getMinutes().toString() : today.getMinutes().toString()) + (today.getSeconds().toString().length < 2 ? '0' + today.getSeconds().toString() : today.getSeconds().toString());

        if (myRegex.test(this.state.value)) {
            var matches = this.state.value.match(myRegex);
            
            console.log(matches);

            if (matches[7] === 'pokedex' && matches[8].length > 0 && matches[8].replace(/ /g, "").length > 0) {
                var pokemon = matches[8];
                var options = {
                    protocol: 'https',
                    versionPath: '/api/v2/',
                    cacheLimit: 100 * 1000, // 100s
                }
                var pokedex = new Pokedex(options);

                pokedex.getPokemonByName(pokemon) // with Promise
                    .then(function (response) {
                        firebase.database().ref('request/' + ref).set({
                            type: 'pokemon',
                            value: response
                        });
                    })
                    .catch(function (error) {
                        console.log('There was an ERROR: ', error);
                    });
            } else if (matches[5] === 'artist' && matches[6].length > 0 && matches[6].replace(/ /g, "").length > 0) {
                var artist = matches[6];
                var spotifyApi = new SpotifyWebApi({
                    clientId: 'c30151145c1c4994a24d528d00ba40fe',
                    clientSecret: '98331a2dd8154f6692b1d098b780e5b8',
                    redirectUri: 'http://www.example.com/callback'
                });
                spotifyApi.setAccessToken('BQCaW5U2yoyFeRFDKFPjGFAAlctTjCUweqRfo2pDLw4GiTRtJT-cdBYXYZwa2vhhiIU8NDWboKxh5bSAUmcbQ8wxqpf8jlFMbMcPdq7uX5uxUoZ8VjO_RpyFYxf_yhv79uKWkv_kTA');
                spotifyApi.searchArtists(artist, { limit: 6, offset: 0 }, function (err, data) {
                    if (err) {
                        console.error('Something went wrong!');
                    } else {                       
                        firebase.database().ref('request/' + ref).set({
                            type: 'music-artist-search',
                            value: data.body.artists.items
                        });
                    }
                });

            } else if (matches[3] === 'film' && matches[4].length > 0 && matches[4].replace(/ /g, "").length > 0) {
                var search = matches[4];
                var omdbApiUrl = 'https://omdbapi.com/?apikey=4ac2ef70&s=' + search;

                var requestOmdb = new XMLHttpRequest();
                requestOmdb.open('GET', omdbApiUrl);
                requestOmdb.responseType = 'json';
                requestOmdb.send();
                requestOmdb.onload = function () {
                    var movieResult = requestOmdb.response.Search;
                    var array = []
                    for (let index = 0; index < movieResult.length; index++) {
                        array.push(movieResult[index]); 
                    }
                    
                    firebase.database().ref('request/' + ref).set({
                        type: 'movie-search',
                        value: array
                    });
                }
            } else if (matches[1] === 'meteo' && matches[2].length > 0 && matches[2].replace(/ /g, "").length > 0) {
                var city = matches[2];
                var openWeatherWapUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&lang=fr&appid=64eb78659aea712617898580e5ef45d8';

                var requestOpenWeatherMap = new XMLHttpRequest();
                requestOpenWeatherMap.open('GET', openWeatherWapUrl);
                requestOpenWeatherMap.responseType = 'json';
                requestOpenWeatherMap.send();
                requestOpenWeatherMap.onload = function () {
                    var weather = requestOpenWeatherMap.response;
                    firebase.database().ref('request/' + ref).set({
                        type: 'meteo',
                        value: {
                            id: weather.id,
                            city: weather.name,
                            description: weather.weather[0].description,
                            humidity: weather.main.humidity,
                            pressure: weather.main.pressure,
                            wind: weather.wind.speed,
                            temp: {
                                main: weather.main.temp,
                                min: weather.main.temp_min,
                                max: weather.main.temp_max
                            }
                        }
                    });
                }
            } else if (matches[0] === 'meteo') {
                console.log('meteo');
            } else if (matches[0] === 'bonjour') {
                console.log('bonjour');
            } else if (matches[0] === 'faim') {
                firebase.database().ref('request/' + ref).set({
                    type: 'faim',
                    value: 'The cake is a lie !'
                });
            } else if (matches[0] === 'joke') {
                const jokeUrl = 'https://icanhazdadjoke.com/slack';

                var requestJoke = new XMLHttpRequest();
                requestJoke.open('GET', jokeUrl);
                requestJoke.responseType = 'json';
                requestJoke.send();
                requestJoke.onload = function () {
                    var joke = requestJoke.response.attachments[0].text;
                    console.log(joke);
                    
                    firebase.database().ref('request/' + ref).set({
                        type: 'joke',
                        value: joke
                    });
                }
            }

        } else {
            firebase.database().ref('request/' + ref).set({
                type: 'error',
                value: 'Aucun matches n\'a été tourvé'
            });
        }
        this.setState({ value: '' });
    }

    render() {
        function resetDatabase(e) {
            e.preventDefault();
            firebase.database().ref('request/').remove();
        }
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="grid-x">
                        <div className="cell small-3"></div>
                        <div className="cell small-6"><input type="text" value={this.state.value} onChange={this.handleChange} required /></div>
                    </div>
                    <div className="grid-x">
                        <div className="cell auto"></div>
                        <div className="cell shrink">
                            <input className="success button" type="submit" value="Envoyer" />
                        </div>
                        <div className="cell shrink">
                            <button className="button warning" type="button" onClick={resetDatabase}>Reset</button>
                        </div>
                        <div className="cell auto"></div>     
                    </div>
                </form>
            </div>
        );
    }
}



export default Form;