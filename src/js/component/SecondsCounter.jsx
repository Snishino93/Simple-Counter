//Importa dependencias
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

//Variables globales
let seconds = '000000';
let interval = null;
let targetTime = 0;


//Funcion para establecer el tiempo objetivo para la alerta
function setTargetTime(event) {
    targetTime = parseInt(event.target.value);
}

//Funcion para iniciar el contador
function startInterval() {
    interval = setInterval(() => {
        
        //Incrementa los segundos y actualiza el contador
        seconds = (parseInt(seconds) + 1).toString().padStart(6, "0");
        document.querySelector("#seconds-counter").innerText = `${seconds}`;
        
        //Comprueba si se alcanza el tiempo objetivo y detiene el contador
        if (parseInt(seconds) === targetTime) {
            alert('Se ha alcanzado el tiempo especificado');
            clearInterval(interval);
        }
    }, 1000);
}

//Funcion para detener el contador
function stopInterval() {
    clearInterval(interval);
}

//Funcion para reiniciar y parar el contador
function resetInterval() {
    seconds = '000000';
    document.querySelector('#seconds-counter').innerText = `${seconds}`;
    stopInterval();
}

//Funcion para la cuenta atras
function countdown() {
    if (parseInt(seconds) > 0) {
        seconds = (parseInt(seconds) - 1).toString().padStart(6, "0");
        document.querySelector("#seconds-counter").innerText = `${seconds}`;
        setTimeout(countdown, 1000);
    } else {
        alert('La cuenta regresiva ha terminado');
    }
}

//Funcion para establecer el valor del contador al valor del input de la cuenta atras
function setCountdownValue() {
    const input = document.getElementById("countdown-input");
    seconds = input.value.toString().padStart(6, '0');
    document.querySelector('#seconds-counter').innerText = `${seconds}`;
}

//Componente de SecondsCounter
function SecondsCounter() {
    return (
        <div className="container">
            <div className="seconds-counter-container">
                <FontAwesomeIcon icon={faClock}
                    className="clock-icon"/>
                <span id="seconds-counter" className="counter">
                    {seconds}</span>
            </div>
            <div className="buttons-container">
                <div className='inputsYBoton'>
                    <p className='mb-2'>Cuenta atras</p>
                    <input id="countdown-input" type="number" placeholder="Introduce un número"
                        onChange={setCountdownValue}/>
                    <p className='my-2'>Alerta</p>   
                    <input className='mb-2' id="target-time-input" type="number" placeholder="Introduce un número"
                        onChange={setTargetTime}/>
                    <button className="btn btn-dark"
                        onClick={countdown}>Iniciar cuenta regresiva</button>
                </div>
                <div className='botones'>
                    <button className="btn btn-success me-2"
                        onClick={startInterval}>Iniciar</button>
                    <button className="btn btn-primary me-2"
                        onClick={stopInterval}>Parar</button>
                    <button className='btn btn-danger'
                        onClick={resetInterval}>Reiniciar</button>
                </div>
            </div>
        </div>
    );
}

export default SecondsCounter;
