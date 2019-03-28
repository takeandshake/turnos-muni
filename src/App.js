import React, { Component } from 'react';
import Time from 'react-time-format'

import './App.css';
import 'materialize-css/dist/css/materialize.min.css'



class App extends Component {

  state = {
    nombreDistrito:'Centro',
    time:'',
    error: null
  }

    getTurnoFromDistrito = async e =>{
      const API_URL = 'https://datos.rosario.gob.ar/api/action/datastore/search.json?resource_id=57660ecf-b1bd-4eee-b545-c715f6a37673&limit=5';
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(data);
        return data;
    }

     componentDidMount(e) {
      this.interval = setInterval(() => {
        this.setState({ time: Date.now() });
        let data = this.getTurnoFromDistrito(e);
        data.then(e =>{console.log(e.result.records[0])});
      }, 60000);
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    } 

  render() {
    return (
      <div className="container">
        <div className="row">
        <div className="col s12 m4 offset-m4">
          <div className="card large distrito-background">
           
            <div className="card-content white-text ">
              <span className="card-title">Distrito: {this.state.nombreDistrito}</span>
              <h3><Time value={this.state.time} format="DD/MM/YYYY HH:mm:ss" /></h3>
            </div>
            <div className="card-action">
              <button className="btn" onClick={this.getTurnoFromDistrito}>Actualizar Turno</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
