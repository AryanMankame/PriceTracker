import React from 'react';
import styled from 'styled-components';
import {useState} from 'react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {auth,provider} from './Firebase.js';
import {setLoginUserDetails} from '../store/UserSlice.js';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const Signup = (props) => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector(state => state.user.name);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if(user){
                setUser(user);
                console.log(username);
                history('/home');
            }
        })
    },[username]
    );
    const googleAuth = () => {
        signInWithPopup(auth,provider).then(result => {
            setUser(result.user);
        }).catch(err => {console.log("An error is faced : " + err)});
    }
    const setUser = (user) => {
        dispatch(
            setLoginUserDetails({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }
            )
        )
    }
    const verifyUser = () => {
        fetch('https://items-price-tracker.herokuapp.com/signup',{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                email:email,
                password:password
            })
        }).then((response) => response.json()).then(user => {
            if(user === "not found"){
                setError("login_error"); 
            }
            else{
                setUser({name:'xyz',email:email,photoURL:''});
                history('/home');
            }
            console.log(user,typeof(user));
            
        })
    }
    return(
        <Entire>
            <Bottom>
                <Left>
                    <img src="https://cdn-icons-png.flaticon.com/512/1611/1611261.png"></img>
                </Left>
                <Right>
                <Top>
                <h1>Signup</h1>
                </Top>
                    {(error === "login_error")?<div className="error-msg">*The entered email or password doesn't exist</div>:<></>}
                    <input type="email" placeholder='Email' onInput={(event) => {setEmail(event.target.value)}}></input>
                    <input type="password" placeholder='Password' onInput={(event) => {setPassword(event.target.value)}}></input>
                    <button className='login-button' onClick={verifyUser}>Login</button>
                    <button className='google-login' onClick={googleAuth}><img src="https://image.similarpng.com/very-thumbnail/2020/12/Illustration-of-Google-icon-on-transparent-background-PNG.png"></img><p>Google</p></button>
                    <p className='register-direct'>Already a user? <a href="/register">Register</a></p>
                </Right>
            </Bottom>
        </Entire>
    );
}
const Entire = styled.div`
    display:flex;
    flex-direction:column;
    width:100vw;
    height:100vh;
    font-family:'monaco';
`;
const Top = styled.div`
    align-self:center;
    background: rgba(42, 84, 234, 0.35);
    width:100%;
    color:red;
    font-family:'monaco';
`;
const Bottom = styled.div`
    display:flex;
    flex-direction:row;
    height:100%; 
`;
const Left = styled.div`
    width:100vw;
    display:flex;
    flex-direction:column;
    background: #0A083E;
    align-items: center;
    justify-content:center;
    img{
        width:50%;
        padding-bottom:20%;
        // padding-left:30px;
    }
    @media (max-width:500px){
        display:none;
    }
`;
const Right = styled.div`
    background: linear-gradient(145.43deg, #2D3DCD 58.36%, #3444CF 69.56%, rgba(45, 61, 205, 0.490463) 82.05%, rgba(45, 61, 205, 0) 82.45%);
    display:flex;
    flex-direction:column;
    width:100%;
    padding-top:6%;
    align-items:center;
    .error-msg{
        color:red;
    }
    input{
        font-size:large;
        border-radius:5px;
        padding-left:10px;
        margin:20px;
        height:6%;
        width:70%;
    }
    button{
        margin:20px;
    }
    .login-button{
        align-self:center;
        width:20%;
        border-radius:50px;
        font-size:large;
        height: 50px;
        cursor:pointer;
    }
    .google-login{
        padding-right:20%;
        cursor:pointer;
        padding-top:5px;
        padding-bottom:5px;
        display:flex;
        flex-direction:row;
        justify-self:center;
        font-size:large;
        border-radius:10px;
        background-color: #4285f4;
        border: 1px solid #287ae6;
        color: #fff;
        &:hover{
            background-color: #287ae6;
            border: 1px solid #287ae6;
        }
        img{
            height:40px;
            width:40px;
            padding-top:10px;
            margin-right:10px;
            margin-left:10px;
        }
        @media (max-width:400px){
            font-size:xx-small;
        }
    }
    .register-direct{
        color:white;
    }
    a{
        cursor:pointer;
        text-decoration:underline;
        color:white;
    }
`;
export default Signup;