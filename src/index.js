import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Engine from 'noa-engine'
import { initRegistration } from './gameSource/registration'
import { initWorldGen } from './gameSource/worldgen'
import { setupPlayerEntity } from './gameSource/entities'
import { setupInteractions } from './gameSource/actions'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


/* 
 *
 *
 *      Testbed.
 *
 * 
 */

// create engine
var noa = new Engine({
    debug: true,
    showFPS: true,
    inverseY: false,
    inverseX: false,
    chunkSize: 32,
    chunkAddDistance: 3.5,
    chunkRemoveDistance: 3.0,
    blockTestDistance: 50,
    texturePath: 'textures/',
    playerStart: [0.5, 5, 0.5],
    playerHeight: 1.4,
    playerWidth: 0.6,
    playerAutoStep: true,
    useAO: true,
    AOmultipliers: [0.92, 0.8, 0.5],
    reverseAOmultiplier: 1.0,
})


// this registers all the blocks and materials
var blockIDs = initRegistration(noa)

// this sets up worldgen
initWorldGen(noa, blockIDs)

// adds a mesh to player
setupPlayerEntity(noa)

// does stuff on button presses
setupInteractions(noa)


/**
 * 
 * Non-noa
 * 
 */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
