import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import loginImg from '../images/login-img.svg';

const Login = () => {
  const {loginWithRedirect} = useAuth0();
  return <Wrapper>
    <div className="container">
      {/* <img src={loginImg} alt="github user" /> */}
      <img src="https://enacteservices.com/wp-content/themes/twentytwenty/images/hire-developer/animation_500_l4zc9j5g.gif" alt="github user" />
      <h2>Welcome to GitQuarix</h2>
      <h4>Please Login to search Github Users</h4>
      <button className="btns" onClick={loginWithRedirect}>Login / sign up</button>
    </div>
  </Wrapper>
};


const Wrapper = styled.section`
  min-height: 100vh;
  background-color: white;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
    width: 30vw;
    margin-left: 8vw;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
  .btns {
    background-color: #4287f5;
    color: white;
    padding: 1.5vh 2vw;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 0 2px gray;
    transition: 0.5s;
  }
  .btns:hover{
    // transform: scale(1.05);
    padding: 1.7vh 2.2vw;

  }
`;
export default Login;
