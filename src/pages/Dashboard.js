import React from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { GithubContext } from "../context/context";
import styled from "styled-components";

const Dashboard = () => {
    const { isLoading } = React.useContext(GithubContext);
    const currentDate = new Date();

    if (isLoading) {
        return (
            <main>
                <Navbar />
                <Search />
                <img
                    src={loadingImage}
                    className="loading-img"
                    alt="loading..."
                />
            </main>
        );
    }
    return (
        <main>
            <Wrapper>
                <Navbar></Navbar>
                <p className="search-now">
                    Search github profile of awesome developers
                </p>
                <p className="search">(Up to 60 available requests per hour)</p>
                <Search />
                <Info />
                <User />
                <Repos />
                <div className="footer">All Rights Reserved (Developer-Kingz) {currentDate.toDateString()}</div>
            </Wrapper>
        </main>
    );
};

const Wrapper = styled.div`
// background-color: #d3dff2;
    .search-now {
        margin-left: 35vw;
        font-size: 1.5vw;
        color: #8f030c;
    }
    .search{
      margin-left: 40vw;
      color: #8f030c;
      font-size: 1vw;
    }
    .footer{
      // 
      margin-top: 10vh;
      margin-left: 36vw;
      // height: 10vh;
    }
`;

export default Dashboard;
