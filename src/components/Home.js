import React from 'react';
import styled from 'styled-components';
const Home = () => {
    return(
        <Entire>
            <Logo>
                <img src = "https://robohash.org/xyz@gmail.com"></img>
            </Logo>
            <AddItem>
                <p>Add item to the track-list</p>
                <img src = "https://media.istockphoto.com/vectors/black-plus-sign-positive-symbol-vector-id688550958?k=20&m=688550958&s=612x612&w=0&h=wvzUqT3u3feYygOXg3GB9pYBbqIsyu_xpvfTX-6HOd0="></img>
            </AddItem>
            <Items>

            </Items>
        </Entire>
    );
};
const Entire = styled.div`
    display:flex;
    flex-direction:column;
`;
const Logo = styled.div`
    width:100%;
    display:flex;
    margin-top:10px;
    flex-direction:row;
    justify-content:flex-end;
    align-items:center;
    img{
        cursor:pointer;
        margin-right:10px;
        height:50px;
        width:50px;
        border:black solid 2px;
        border-radius:40px;
    }
`;
const AddItem = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
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
const Items = styled.div`
`;
export default Home;