import './App.css';
import { Moon, OfficeDark, OfficeLight, PinDark, PinLight, SearchIcon, Sun, Twitter, UrlDark, UrlLight, TestImage } from './Design/export';
import SearchBar from './Components/Searchbar/SearchBar';
import UserCard from './Components/UserCard/UserCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

//Interface for app.tsx and child component usercard.tsx
export interface props {
  login: string,
  bio: string | null,
  avatar_url: string;
  followers: number | null;
  following: number | null;
  public_repos: number | null;
  twitter_username: string | null;
  company: string | null;
  repos_url: string;
  location: string | null;
}
function App() {
  // Declaring states for different uses in child components
  let [user, setUser] = useState<any>(null);
  let [users, setUsers] = useState<any>(null);
  // Api response state
  let [apiInfo, setApiInfo] = useState<props>({
    login: "The Octocat",
    bio: "",
    avatar_url: TestImage,
    followers: 0,
    following: 0,
    public_repos: 5,
    twitter_username: null,
    company: null,
    repos_url: "https://github.blog",
    location: null
  });
  // Calling api to gather info about users, then after users state is filled with users from api
  // we get user from searchbar call which will be set to specific user ( whom you search )
  // but initially the octocat page is loaded.
  // This useffect is being triggered after every change of user state.
  useEffect(() => {
    axios.get("https://api.github.com/users").then((response) => setUsers(response.data));
    if(users != null) {
      axios.get(`https://api.github.com/users/${user.login}`)
      .then((response) => {
        let tempObj: props = {
          login: response.data.login,
          bio: response.data.bio,
          avatar_url: response.data.avatar_url,
          followers: response.data.followers,
          following: response.data.following,
          public_repos: response.data.public_repos,
          twitter_username: response.data.twitter_username,
          company: response.data.company,
          repos_url: response.data.repos_url,
          location: response.data.location
        }
        setApiInfo(tempObj);
      })
    }
  }, [user]);
  // This is for test purposes. when you open console you can see test user names which will work on search.
  // Due to multiple renders after state changes, this will be loged many times so firstly we clear console
  // and then log our test users again.
  if(users != null) {
    console.clear();
    console.log("Test Users:");
    for(let i = 0; i < Object.keys(users).length; i++) {
      console.log(users[i].login);
    }
  }
  // Declaring every variable which will be used in child components via props.
  // Variable values are assigned from api info.
  let [login, bio, avatar_url, followers, following, public_repos,
  twitter_username, company, repos_url, location] = [apiInfo.login, apiInfo.bio, apiInfo.avatar_url,
  apiInfo.followers, apiInfo.following, apiInfo.public_repos, apiInfo.twitter_username,
  apiInfo.company, apiInfo.repos_url, apiInfo.location]; 
  // State for dark mode
  const [isDark, setIsDark] = useState(false);
  // Setting styles respectively of dark mode
  let darkener: string | null = null;
  let spanText: string | null = null;
  let icon: string | null = null;
  let office: string | null = null;
  let pin: string | null = null;
  let url: string | null = null;
  if(isDark) {
    darkener = "app-dark";
    spanText = "LIGHT"
    icon = Sun;
    office = OfficeLight;
    pin = PinLight;
    url = UrlLight;
  } else {
    darkener = "app-light";
    spanText = "DARK";
    icon = Moon;
    office = OfficeDark;
    pin = PinDark;
    url = UrlDark;
  }
  return (
    <div className={"app " + darkener}>
      <div className='app__container'>
        <div className='container__header'>
          <h1>devfinder</h1>
          <div onClick={() => {setIsDark(!isDark)}} id="icon">
            <span>{spanText}</span>
            <img src={icon} alt="icon" />
          </div>
        </div>
        <div className="container__search">
          <SearchBar
            isDark={isDark} image={SearchIcon}
            setUser={setUser} users={users}
          />
        </div>
        <div className="container__user">
          <UserCard
            Of={office}
            Twit={Twitter} Url={url}
            Pin={pin} isDark={isDark}
            login={login} avatar_url={avatar_url}
            followers={followers} following={following}
            public_repos={public_repos}
            twitter_username={twitter_username}
            company={company} repos_url={repos_url}
            location={location} bio={bio}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
