import React from 'react';
import Card from './Card';

import * as firebase from 'firebase';
import config from '../config';

class Content extends React.Component {
    constructor() {
        super()
        firebase.initializeApp(config)
        this.state = {
            loading: true
        }
    }

    componentWillMount() {
        const ref = firebase.database().ref('request');
        ref.on('value', snapshot => {
            this.setState({
                request: snapshot.val(),
                loading: false
            })
        })
    }
    
    render() {
        if (this.state.loading) {
            return <h1>Loading ...</h1>
        }
        
        if (this.state.request != null) {
             const reqs = Object.keys(this.state.request).sort().reverse().map(key => <Card key={[key]} details={this.state.request[key]}/>);

            return (
                <div className="container">
                    <div className="grid-x">
                    <div className="cell small-3"></div>
                        <div className="cell small-6">
                            {reqs} 
                        </div>
                    </div>
                </div>
            )
        } else {
            return 'pas de requeste'
        }

       
    }
}

export default Content;