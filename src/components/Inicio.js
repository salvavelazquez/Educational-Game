import React, { useState } from 'react';
import Juego from './Juego';
//import '../Navegacion.css';
import '../Inicio.css';
import Felicitaciones from './Felicitaciones';

function Inicio() {
    const [nombreJugador, setNombreJugador] = useState('');
    const [mostrarJuego, setMostrarJuego] = useState(false);
    const [puntaje, setPuntaje] = useState(0);
    const [mostrarFelicitaciones, setMostrarFelicitaciones] = useState(false);
    const [rondaActual, setRondaActual] = useState(1);

    const manejarClickJugar = (nombre) => {
        setNombreJugador(nombre);
        setMostrarJuego(true);
        setPuntaje(0);
        setMostrarFelicitaciones(false);
    };

    const alTerminar = (puntaje) => {
        setPuntaje(puntaje);
        setMostrarJuego(false);
        setMostrarFelicitaciones(true);
    };

    if (!mostrarJuego && !mostrarFelicitaciones) {
        return (
            <div className="centrar-contenido1">
                <h1 className="title1">Enter your Name</h1>
                <input
                    type="text"
                    placeholder="The child's name"
                    onChange={(e) => setNombreJugador(e.target.value)}
                />
                <button className="button-init" onClick={() => manejarClickJugar(nombreJugador)}>Play</button>
            </div>
        );
    } else if (mostrarJuego) {
        return (
            <div>
            <section className='Animacion'>
            <div className='Decoracion'></div>
            <div className='Decoracion'></div>
            <div className='Decoracion'></div>
            <div className='Decoracion'></div>
            <div className='Decoracion'></div>
            <div className='Decoracion'></div>
            <div className='Decoracion'></div>
            <div className='Decoracion'></div>
            <div className='Decoracion'></div>
            <div className='Decoracion'></div>
            <div className='Decoracion'></div>
        </section>
                <Juego
                    nombreJugador={nombreJugador}
                    puntaje={puntaje}
                    setPuntaje={setPuntaje}
                    alTerminar={alTerminar}
                    rondaActual={rondaActual}
                    setRondaActual={setRondaActual}

                />
                
            </div>
        );
    } else if (mostrarFelicitaciones) {
        return (
            <div>
                <Felicitaciones nombreJugador={nombreJugador} puntaje={puntaje} />
            </div>
        );
    }
}

export default Inicio;
