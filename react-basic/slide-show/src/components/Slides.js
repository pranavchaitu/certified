import React, { useState } from 'react';

function Slides({slides}) {
    const [current,setCurrent] = useState(0)
    const [reset,setReset] = useState(true)
    const [prev,setPrev] = useState(true)
    const [next,setNext] = useState(false)

    function Reset() {
        setCurrent(0)
        setReset(true)
        setPrev(true)
        setNext(false)
    }

    function Prev() {
        if(current == 1) {
            setPrev(true)
            setReset(true)
            setCurrent(current-1)
        } else {
            setCurrent(current-1)
            setReset(false)
        }
        setNext(false)
    }

    function Next() {
        setPrev(false)
        setReset(false)
        if(current + 1 == slides.length-1) {
            setNext(true)
        }
        slides[current+1] ? setCurrent(current+1) : null
    }

    return (
        <div>
            <div id="navigation" className="text-center">
                <button onClick={Reset} disabled={reset} data-testid="button-restart" className="small outlined">Restart</button>
                <button onClick={Prev} disabled={prev} data-testid="button-prev" className="small">Prev</button>
                <button onClick={Next} disabled={next} data-testid="button-next" className="small">Next</button>
            </div>
            <div id="slide" className="card text-center">
                <h1 data-testid="title">{slides[current].title}</h1>
                <p data-testid="text">{slides[current].text}</p>
            </div>
        </div>
    );
}

export default Slides;
