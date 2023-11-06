import React, { useState, useEffect } from 'react';
import '../Juego.css';
import data from './data.json';

function Juego({ nombreJugador, puntaje, setPuntaje, alTerminar, rondaActual,setRondaActual }) {
    const [animalObjetivo, setAnimalObjetivo] = useState('');
    const [opciones, setOpciones] = useState([]);
    const [esCorrecto, setEsCorrecto] = useState(null);
    const [rondasTotales, setRondasTotales] = useState(Math.floor(Math.random() * 6) + 5);
    const [puedeHacerClic, setPuedeHacerClic] = useState(true);


    /*const obtenerAnimalAleatorio = () => {
        const animales = ['cat', 'dog', 'cow', 'lion', 'giraffe', 'horse'];
        const indiceAleatorio = Math.floor(Math.random() * animales.length);
        return animales[indiceAleatorio];
    };*/
    /*cargar datos iniciales, se utiliza para que el efecto se ejecute una sola vez después de que el componente se monte.*/
    useEffect(() => {
        obtenerOpcionesAleatorias();
    }, []);

    const obtenerAnimalAleatorio = () => {
        // Obtiene un animal aleatorio de tu archivo JSON
        const indiceAleatorio = Math.floor(Math.random() * data.length);
        return data[indiceAleatorio];
    };

    /*const obtenerOpcionesAleatorias = () => {
        const animalCorrecto = obtenerAnimalAleatorio();
        let opcionesAleatorias = [animalCorrecto];

        while (opcionesAleatorias.length < 3) {
            const opcion = obtenerAnimalAleatorio();
            if (!opcionesAleatorias.includes(opcion)) {
                opcionesAleatorias.push(opcion);
            }
        }

        opcionesAleatorias = opcionesAleatorias.sort(() => Math.random() - 0.5);

        setOpciones(opcionesAleatorias);
        setAnimalObjetivo(animalCorrecto);
    };*/

    const obtenerOpcionesAleatorias = () => {
        const animalCorrecto = obtenerAnimalAleatorio();
        let opcionesAleatorias = [animalCorrecto];

        while (opcionesAleatorias.length < 3) {
            const opcion = obtenerAnimalAleatorio();
            if (!opcionesAleatorias.some((animal) => animal.id === opcion.id)) {
                opcionesAleatorias.push(opcion);
            }
        }

        opcionesAleatorias = opcionesAleatorias.sort(() => Math.random() - 0.5);

        setOpciones(opcionesAleatorias);
        setAnimalObjetivo(animalCorrecto);
    };

    const verificarRespuesta = (animalSeleccionado) => {
        if (animalSeleccionado === animalObjetivo.id) {
            setEsCorrecto(true);
            setPuntaje(puntaje + 1);
        } else {
            setEsCorrecto(false);
        }
        setPuedeHacerClic(false);
    };

    const siguienteRonda = () => {
        if (rondaActual < rondasTotales) {
            setRondaActual(rondaActual + 1);
            setEsCorrecto(null);
            setPuedeHacerClic(true);
            obtenerOpcionesAleatorias();
        } else {
            alTerminar(puntaje);
        }
    };

    const opcionesDeshabilitadas = esCorrecto !== null;

    useEffect(() => {
        obtenerOpcionesAleatorias();
    }, []);

    return (
        <div className="centrar-contenido">
            <h1>{nombreJugador}, ¿What is this animal?</h1>
            <p>Current round: {rondaActual}</p>
            <img src={animalObjetivo.url} alt={animalObjetivo.name} className="animal-img" />
            <div>
                {opciones.map((animal) => (
                    <button
                        key={animal.id}
                        onClick={() => verificarRespuesta(animal.id)}
                        disabled={!puedeHacerClic || opcionesDeshabilitadas}
                    >
                        {animal.name}
                    </button>
                ))}
            </div>
            {esCorrecto === true && <p>¡Correct!</p>}
            {esCorrecto === false && <p>¡Incorrect!</p>}
            <button onClick={siguienteRonda}>Next</button>
        </div>
    );
}

export default Juego;

