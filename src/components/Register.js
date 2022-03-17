import React from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
const Register = () => {
  const history = useNavigate();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const addUser = () => {
    fetch('https://items-price-tracker.herokuapp.com/register',{
        mode:'no-cors',
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            email:email,
            password:password,
            name:name
        })
    }).then((response) => response.json()).then(user => {
      console.log(user);
        if(user === 'the user already exists'){
          setError("*User already exists");console.log(user,'=>>',typeof(user));
        }
        else if(user === 'Invalid input'){
          setError("*Invalid Input");console.log(user,'=>>',typeof(user));
        }
        else if(user === 'Successful'){
          history('/home');
        }
    })
  }
  return (
    <Entire>
      <h1>Register</h1>
      {(error !== '')?<div className="error-msg">{error}</div>:<></>}
      <input onInput={(event)=>setName(event.target.value)}className="userName" placeholder="User Name" required></input>
      <input onInput={(event)=>setEmail(event.target.value)} type="email" className="userEmail" placeholder="Email" required></input>
      <input onInput={(event)=>setPassword(event.target.value)} type="password" className="userPassword" placeholder="Password" required></input>
      <button onClick={addUser} type="submit" className="register">Register</button>
    </Entire>
  );
};
const Entire = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color:white;
  width:100vw;
  height:100vh;
  background: linear-gradient(145.43deg, #2D3DCD 58.36%, #3444CF 69.56%, rgba(45, 61, 205, 0.490463) 82.05%, rgba(45, 61, 205, 0) 82.45%);
  .error-msg{
    color:red;
  }
  .userName,
  .userEmail,
  .userPassword {
    margin-bottom: 4vh;
    cursor:pointer;
    width: 40%;
    height: 6%;
    font-family:'monaco';
    font-size:large;
  }
  .register{
    border-radius:10px;
    width:10%;
    height:7%;
    cursor:pointer;
    color:white;
    font-family:'monaco';
    font-size:large;
    background-color:palevioletred;
  }
`;
export default Register;
