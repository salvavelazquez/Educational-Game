import React from 'react';
import '../Congratulation.css';

function Felicitaciones({ nombreJugador, puntaje }) {
    return (
        <div className="center-content">
            <h1>¡Felicitaciones, {nombreJugador}!</h1>
            <p>Tu puntaje total es: {puntaje}</p>
        </div>
    );
}

export default Felicitaciones;
