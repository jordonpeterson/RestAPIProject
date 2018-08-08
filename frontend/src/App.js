import React, {Component, Fragment} from 'react';


class App extends Component {
    state = {
       one: "1",
       two: "2"
}


    render() {
        fetch('http://localhost:4000/',{mode: "cors"}).then(response => {
            return response.json();
        })
            .then(data => {
                this.setState({one: data})
                console.log(data);
            });
        return (

            <Fragment>
                <h1>{this.state.one}</h1>
            </Fragment>
        );
    }
}

export default App;
