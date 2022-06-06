import React from 'react';
import styled from 'styled-components';
import {useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {setSignOutState} from '../store/UserSlice.js';
import {useNavigate} from 'react-router-dom';
import {setLoginUserDetails} from '../store/UserSlice.js';
import {setTracklistDetails} from '../store/TracklistSlice.js';
import {auth} from './Firebase.js';
import 'tachyons';
import Modal from './Modal.js';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
let m = 0;
const Home = () => {
    const [Dataofusers,setDataofusers] = useState([]);
    const [CardofUsers,setCardofUsers] = useState([]);
    const history = useNavigate();
    const dispatch = useDispatch();
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
    const setStatelist = (data) => {
        dispatch(
            setTracklistDetails(data)
        )
    }
    const username = useSelector(state => state.user.name);
    let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1 ,
    centerMode: true,
    autoplay: true
    };
    useEffect(async () => {
        auth.onAuthStateChanged(async (user) => {
            if(user){
                setUser(user);
                history('/home');
            }
        });
        if(m === 0){
          test();
          console.log(m);
          m++;
          setInterval(() => {test();},60*1000);
        }

    },[username]);
    const [show,setShow] = useState(false);
    const email = useSelector(state => state.user.email);
    const showPopUp = () => {
        setShow(prev=> !prev);
    }
    const signOut = () => {
        auth.signOut().then(() => {
            dispatch( setSignOutState() );
            history('/');
        });
    }
    const setCards = () => {
        console.log('setCard =>',Dataofusers);
        let card = [];
        let i = 0;
        Dataofusers.forEach(users => {
            card = [...card,<Card key={i}>
                <Upper>
                  <div id="image">
                    <a href={users[4]}>
                      <img
                        src={users[1]}
                        alt="image"
                      ></img>
                    </a>
                  </div>
                  <div id="desc">
                    <h1>
                      {users[2]}
                    </h1>
                  </div>
                </Upper>
                <Lower>
                  <div id="initial">
                    <h1>Initial Price : </h1>
                    <h1>{users[0]}</h1>
                  </div>
                  <div id="initial">
                    <h1>Final Price : </h1>
                    <h1>{users[3]}</h1>
                  </div>
                  <div id="initial">
                    <h1>Status : </h1>
                    {users[3] >= Number(users[0])?<><h1 id="Done">Done</h1></>:<><h1 id="run">Tracking</h1></>}
                  </div>
                </Lower>
              </Card>]
            i++;
            // console.log(i,Dataofusers.length);
            if(i === Dataofusers.length){
              setCardofUsers(card)
            }
        })
    }
    const waitFn = () => {
      fetch('https://items-price-tracker.herokuapp.com/frontend1',{
        method:'POST',
        headers: {'Content-type': 'application/json'},
      }).then(response => response.json()).then(data => {console.log(data); setStatelist(data); setDataofusers(data); setTimeout(() => { setCards(); },2000);})
    }
    const test = () => {
      //https://items-price-tracker.herokuapp.com
        console.log(email);
        if(email === null){
          setDataofusers([]);
          return ;
        }
        setTimeout(() => {waitFn()},60*1000);
        fetch('https://items-price-tracker.herokuapp.com/frontend',{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                email
            })
        }).then(response => response.json()).then(data => {console.log(data); }).catch(err => console.log('error => ' +err));
        // fetch('https://git.heroku.com/items-price-tracker.git',{ mode : "no-cors"}).then(response => response.json()).then(data => {console.log(data);});
      }
    return(
        <>
        {  show ?
        <Modal closeitbutton = {showPopUp}/>:
        <Entire>
            <Logo>
                <SignData>
                {email !== null ?
                <img src = {`https://i2.wp.com/ui-avatars.com/api//${email[0]}/128?ssl=1`} alt="img"></img>
                :<img src = {`https://i2.wp.com/ui-avatars.com/api//UN/128?ssl=1`} alt="img"></img>
                }
                <div className='sign-out' onClick={signOut}>SIGN OUT</div>
                </SignData>    
            </Logo>
            <AddItem className = ".shadow-3">
                <p>Add item to the track-list</p>
                <img  onClick = {showPopUp} src = "https://media.istockphoto.com/vectors/black-plus-sign-positive-symbol-vector-id688550958?k=20&m=688550958&s=612x612&w=0&h=wvzUqT3u3feYygOXg3GB9pYBbqIsyu_xpvfTX-6HOd0=" alt="img"></img>
            </AddItem>
            <div>Contents</div>
            <CardContainer>
            <Carousel {...settings}>
            {CardofUsers}
            </Carousel>
            </CardContainer>
        </Entire>
        }
        </>
    );
};
const Entire = styled.div`
    display:flex;
    flex-direction:column;
    height:100%;
    width:100%;
`;
const Logo = styled.div`
    width:100%;
    height:80px;
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    align-items:center;
    background-color:#030156;
 `;
const SignData = styled.div`
    height:100%;
    display:flex;
    flex-direction:column;
    img{
        align-self:flex-end;
        justify-self:center;
        margin-left:14px;
        margin-top:9px;
        cursor:pointer;
        margin-right:10px;
        height:50px;
        width:50px;
        border:black solid 2px;
        border-radius:40px;
    }
    &:hover{
        .sign-out{
            visibility:visible;
            background-color:red;
        }
    }
    .sign-out{
        border:2px solid black;
        border-radius:5px;
        visibility:hidden;
        color:wheat;
        padding:3px;
        margin-top:5px;
        margin-right:3px;
        cursor:pointer;
    }
`;
const AddItem = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    margin:30px;
    justify-content:center;
    p{
        margin-top:40px;
        display:block;
    }
    img{
        cursor:pointer;
        height:60px;
        width:60px;
        border:solid black 3px;
    }
`;
const Card = styled.div`
  width: 50%;
  border: 2px solid;
  transition: all 0.5s;
  border-radius: 15px;
  margin-left: 30px;
  &:hover {
    transform: scale(1.1);
  }
`;
const Upper = styled.div`
  height: 70%;
  display: flex;
  #image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40%;
  }
  a {
    width: 100%;
    height: 100%;
  }
  img {
    width: 20%;
    height: 100%;
    padding: 1vw;
    margin-left:auto;
    margin-right:auto;
  }
  #desc {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      font-size: 70%;
    }
  }
  margin-bottom:5vh;
`;
const Lower = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  h1 {
    font-size: 70%;
  }
  #Done {
    color: green;
  }
  #run{
    color:red;
  }
  margin-bottom:5vh;
`;
const Carousel = styled(Slider)`
  z-index: 1;
  width:100%;
  height:60vh;
  // background-color:blue;
  &:hover {
    & > button {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }
  & > button {
    opacity: 0;
    width: 5vw;
    height: 100%;
    z-index: 2;
  }
  ul li button {
    &:before {
      color: grey;
      font-size: 10px;
    }
  }
  li.slick-active button:before {
    color: white;
  }
  div.slick-active {
    margin-left: 10px;
    margin-right: 3px;
  }
  .slick-list {
    overflow-x: scroll;
    overflow-y:hidden;
    display:block;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const CardContainer = styled.div`
  width:100%;
  display:flex;
  flex-direction:row;
`;
export default Home;