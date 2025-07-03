import './SearchBar.css';
import { useState } from 'react';

// Function and it's props types defined prelimenarly
function SearchBar(props: {
  image: string;
  isDark: boolean;
  setUser: (value: any) => void;
  users: any}) 
  {
  // With userOn we check in nameChecker function if user
  // is set or not.
  let userOn: boolean | null = null;
  // Inpval stands for search bar input value.
  const [inpVal, setInpVal] = useState("");
  // bClass is used for button in search bar and changes button class
  // accordingly which will cause to show "No result" text on wrong name
  // search which does not exist in info taken from api call.
  const [bClass, setBClass] = useState("");
  // We check if dark mode is on or off and set styles respectively.
  let darkener: string | null = null;
  {props.isDark ? darkener = "search-dark" : darkener = "search-light"}
  // onClick function for searchbar button which sets user state to 
  // user whom you search and if you spell the name correctly.
  let nameChecker = () => {
    // for loop checks every user we've got in props.users
    for(let i = 0; i < Object.keys(props.users).length; i++) {
      if(inpVal.match(props.users[i].login)) {
        props.setUser(props.users[i]);
        setBClass("button");
        userOn = true;
      } else {
        if(i == Object.keys(props.users).length - 1 && !userOn) {
          setBClass("button-before");
        } else if(i == Object.keys(props.users).length - 1 && userOn == null) {
          userOn = false;
        }
      }
    }
  }
  return (
    <div className={"search " + darkener}>
      <div className="search__input">
        <label htmlFor='input'>
          <img src={props.image} alt="search bar icon" />
        </label>
        <input type="text" id="input" placeholder='Search GitHub Username...' value={inpVal} onChange={(e) => {setInpVal(e.target.value)}} />
      </div>
      <div className={bClass}>
        <button onClick={nameChecker} type="button">Search</button>
      </div>
    </div>
  );
}

export default SearchBar;