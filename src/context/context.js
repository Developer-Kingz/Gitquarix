import React, { useState, useEffect, useTransition } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import mockFollowers2 from "./myMockData.js/mockFollowers2";
import mockRepos2 from "./myMockData.js/mockRepos2";
import mockUsers2 from "./myMockData.js/mockUsers2";
import axios from "axios";

const rootUrl = "https://api.github.com";
const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
    const [githubUser, setGithubUser] = useState(mockUsers2);
    const [repos, setRepos] = useState(mockRepos2);
    const [followers, setFollowers] = useState(mockFollowers2);
    //request
    const [requests, setRequests] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ show: false, msg: "" });

    const searchGithubUser = async (user) => {
        toggleError();
        setIsLoading(true);
        const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
            console.log(err)
        );
        console.log(response);

        if (response) {
            setGithubUser(response.data);
            const { login, followers_url } = response.data;
            //repos

            await Promise.allSettled([
                axios(`${rootUrl}/users/${login}/repos?per_page=100`),
                axios(`${followers_url}?per_page=100`),
            ]). then((results)=> {
                const [repos, followers] = results;
                const status = 'fulfilled';
                if(repos.status === status){
                    setRepos(repos.value.data)
                }
                if(followers.status === status){
                    setFollowers(followers.value.data)
                }
            }).catch(err => console.log(err))

        } else {
            toggleError(true, "There is no user with that username");
        }
        checkRequests();
        setIsLoading(false);
    };

    const checkRequests = () => {
        axios(`${rootUrl}/rate_limit`)
            .then(({data}) => {
                // console.log(data)
                let {
                    rate: { remaining },
                } = data;
                // console.log(remaining);
                // remaining = 0
                setRequests(remaining);
                if (remaining === 0) {
                    toggleError(
                        true,
                        "Sorry you have exceeded your hourly rate!"
                    );
                }
            })
            .catch((err) => console.log(err));
    };
    function toggleError(show = false, msg = "") {
        setError({ show, msg });
    }
    useEffect(checkRequests, []);

    return (
        <GithubContext.Provider
            value={{
                githubUser,
                repos,
                followers,
                requests,
                error,
                searchGithubUser,
                isLoading,
            }}
        >
            {children}
        </GithubContext.Provider>
    );
};

export { GithubProvider, GithubContext };
