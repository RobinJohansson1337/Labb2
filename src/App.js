import React, { useContext, useReducer, useCallback, useMemo, useState } from "react";
import "./styles.css";
import styled from 'styled-components';

// StyledComponents
const Button = styled.button`
  font-family: sans-serif;
  font-size: 1.3rem;
  border: none;
  border-radius: 5px;
  padding: 7px 10px;
  color: red;
  &:hover {
    color: blue;
  }
`

const Header = styled.h1`
  font-family: sans-serif;
  font-size: 2rem;
  color: black;
  &:hover {
    color: orange;
  }
`

const initialStateValue = 50;
const init = (initialValue) => initialValue;

const reducer = (state, action) => {
  switch (action.type){
    case "increase":
      return state + 10;
    case "reset":
      return init(initialStateValue);
    default:
      return state;
  }
};

const theme = {
  light: { background: "#fff" },
  dark: { background: "#000" }
};

const ThemeContext = React.createContext(theme.light);

export default function App() {  
  const [height, setHeight] = useState(0);
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  const [width, dispatch] = useReducer(reducer, initialStateValue, init);
  const inCreaseWith = () => dispatch({ type: "increase" });
  const handleReset = () => dispatch({ type: "reset" });

  // useMemo
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);
  const doubleNumber = useMemo(() => {
    return slowFunction(number)
  }, [number])
  const themeStyles = {
    backgroundColor: dark ? 'black' : 'white',
    color: dark ? 'white' : 'black'
  }

  return (    
    <div>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    
      <div>
        <h1>Click the button below to see it grow:</h1>
        <button style={{ width }} onClick={inCreaseWith}>
          I grow
        </button>
        <br />
        <br />
        <br />
        <br />
        <button onClick={handleReset}>reset</button>
      </div>

      <ThemeContext.Provider value={theme.dark}>
        <Body />
      </ThemeContext.Provider>

      <CallData />

      <h1>useMemo</h1>
      <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))}></input>
      <button onClick={() => setDark(prevDark => !prevDark)}>Change Theme</button>
      <div style={themeStyles}>{doubleNumber}</div>

      <UseStyledComponentsHeader />
      <UseStyledComponentsButton />
    </div>
  );
}

// styledComponents
function UseStyledComponentsHeader(){
  return (
    <div>
      <Header>Header</Header>
    </div>
  )
}

// styledComponents
function UseStyledComponentsButton(){
  return (
    <div>
      <Button>StyledComponents Button</Button>
    </div>
  )
}

// useMemo
function slowFunction(num) {
  console.log('Calling Slow Function')
  for (let i = 0; i <= 1000000000; i++) {}
  return num * 2
}

function CallData(){
  fetch('https://jsonplaceholder.typicode.com/todos/')
  .then(response => response.json())
  .then(json => console.log(json))

  return null;
}

function Body() {
  const theme = useContext(ThemeContext);
  return (
    <main
      style={{ background: theme.background, height: "50vh", color: "#fff" }}
    >
      I am the main display styled by context!
    </main>
  );
}