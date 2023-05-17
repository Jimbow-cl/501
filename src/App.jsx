import { useState, useReducer, useEffect, useRef } from 'react';
import './App.css';

function App() {

  const initialState = { count: 0 };
  const [select, setSelect] = useState(1)
  const focus = useRef();
  const focus2 = useRef();
  const [life, setLife] = useState(3)

  // Switch des boutons
  function reducer(state, action) {

    switch (action.type) {
      case '1':
        return { count: state.count + (select * 1) };
      case '5':
        return { count: state.count + (select * 5) };
      case '20':
        return { count: state.count + (select * 20) };
      case '25':
        return { count: state.count + 25 };
      case '50':
        return { count: state.count + 50 };

      default:
        throw new Error();
    };
  };



  // If permettant un event sur certaines conditions
  function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);

    if (state.count === 0) {
      focus2.current.style.color = 'green';
    };

    if (state.count > 501) {
      state.count = state.count / 2;
      setLife(life - 1)
      state.count = Math.floor(state.count);

    };
    if (state.count === 501) {
      focus.current.style.display = 'none';
    };
    // Système de points de vie
    if (life <= 0) {
      focus.current.style.display = 'none';
      focus2.current.style.color = 'red';

    };
    if (life == 2) {
      focus2.current.style.color = 'orange';

    }
    // bouton Reset
    function Reset() {
      state.count = 0;
      focus.current.style.display = 'flex';
      setLife(3);

    };

    return (
      <>
        <h1 >{state.count} /501 points et <span ref={focus2}>{life}</span> vie(s)</h1 >
        <p>Attention, au dépassement de score, perte de la moitié du score et 1 point de vie!</p>
        <div >
          <button className='reset' onClick={Reset}>Reset</button>
        </div>
        <div ref={focus} className='button'>
          <button className='b1' id="1" value="1" onClick={() => dispatch({ type: '1' })}>1</button>
          <button className='b5' id="5" value="5" onClick={() => dispatch({ type: '5' })}>5</button>
          <button className='b20' id="20" value="20" onClick={() => dispatch({ type: '20' })}>20</button>
          <button className='b25' id="25" value="25" onClick={() => dispatch({ type: '25' })}>Center</button>
          <button className='b50' id="50" value="50" onClick={() => dispatch({ type: '50' })}>Bull's eye</button>
          <select className='selection' onChange={e => setSelect(e.target.value)}>
            <option id="1" value="1">Zone Simple x1</option>
            <option id="2" value="2">Zone Interieur x2</option>
            <option id="3" value="3">Zone Extérieurx3</option>
          </select>
        </div >
      </>
    );
  }

  return (
    <div className='zone0'>
      <div className='zone'>
        <img src="src/fleche.jpg" />

      </div >
      {Counter()}

      <p>Les Règles:</p>
      <ul>
        <li> Les grands secteurs valent le nombre de points écrits en bord de cible (1, 5, 20, etc...)</li>

        <li> Si la fléchette est dans l'anneau extérieur, les points du lancé sont doublés</li>

        <li> Si la fléchette est dans l'anneau intérieur, les points du lancé sont triplés</li>

        <li>Si la fléchette touche le centre ou "Bull's eye", les points du secteur sont ignorés et le joueur gagne 50</li>

        <li> Si la fléchette touche l'anneau central, les points du secteur sont ignorés et le joueur gagne 25</li></ul>



    </div >
  )
}

export default App
