import React from 'react';
import styled from 'styled-components';
import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {setTracklistDetails} from '../store/TracklistSlice.js';
const Modal = (props) => {
    const dispatch = useDispatch();
    const [url,setUrl] = useState("");
    const [price,setPrice] = useState(0);
    const [phone,setPhone] = useState("");
    const [initialPrice,setinitialPrice] = useState(0);
    const email = useSelector(state => state.user.email);
    const splitData = (str) => {
        let ans = [];
        let a = '';
        for(let i=0 ; i < str.length; i++) {
            if(str[i] === '\r'){
                ans = [...ans,a]
                a = ''
            }
            else if(str[i] === '[' || str[i] === ']' || str[i] === '\n') continue;
            else a += str[i];
            // console.log(str[i]);
        }
        console.log('string => ',str);
        return ans;
    }
    const setStatelist = (data) => {
        dispatch(
            setTracklistDetails(data)
        )
    }
    const onAddButtonClick = () => {
        fetch('https://items-price-tracker.herokuapp.com/trackinbackend',{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                email,
                url,
                phone,
                price
            })
        }).then(response => response.json()).then(data => {console.log(data); setStatelist(data);}).catch(err => console.log('error => ' +err));
    }
    const fetchdata = () => {
        fetch('https://items-price-tracker.herokuapp.com/frontend',{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                url:url,
                price:price
            })
        }).then(response => response.json()).then(data => {const info = data.split()[0]; console.log(splitData(info));}).catch(err => console.log('error => ' +err));
    }
    return(
        <Entire>
            <div id = "close">
                <img onClick = {props.closeitbutton} src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVcZ2wDEqRAazP6m1aG_BtxBby8vKvTEYjyZt3MM-hOQw0h1KOpH6tlSm1qNNJChW_EEA&usqp=CAU"></img>
            </div>
            <div>
                <h1>Enter the info about the product</h1>
            </div>
            <div id = "url">
                <input onInput={(event) => {setUrl(event.target.value)}} placeholder="Enter the url"></input>
            </div>
            <div id = "price">
                <input onInput={(event) => {setPrice(Number(event.target.value))}} placeholder="Enter the final price"></input>
            </div>
            <div id = "phone">
            <input onInput={(event) => {setPhone((event.target.value))}} placeholder="Enter your phone number"></input>
            </div>
            <button onClick = {()=>{onAddButtonClick(); props.closeitbutton();}}>Done</button>
        </Entire>
    );
}
const Entire = styled.div`
    margin-left:auto;
    margin-right:auto;
    margin-top:10%;
    display:flex;
    flex-direction:column;
    width:50%;
    border:3px solid black;
    height:60%;
    @media (max-width:500px){
        width:100%;
    }
    background: linear-gradient(135.6deg, #39CBEB 16.55%, rgba(60, 203, 235, 0.982901) 16.55%, rgba(80, 207, 235, 0.880208) 43.89%, #6A359F 102.61%, rgba(248, 239, 239, 0) 102.61%);
    #close {
        margin-left:auto;
        img{
            border-radius:100px;
            cursor:pointer;
            height:50px;
            width:50px;
        }
    }
    #url {
        width:100%;
        margin-left:auto;
        margin-right:auto;
        font-size:large;
        input{
            width:70%;
            height:40px;
            border:2px solid black;
        }
        margin-bottom:20px;
    }
    #price,#phone {
        width:100%;
        margin-left:auto;
        margin-right:auto;
        font-size:large;
        input{
            width:70%;
            height:40px;
            border:2px solid black;
        }
        margin-bottom:20px;
    }
    button{
        width:56px;
        height:30px;
        margin-left:auto;
        margin-right:30px;
        margin-top:10px;
        margin-bottom:20px;
        background-color:#5DFF59;
        color:black;
        &:hover{
            transform:scale(1.2);
        }
    }
`;
export default Modal;