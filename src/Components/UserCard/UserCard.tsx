import './UserCard.css';
import {props} from '../../App';

// props is defined in app.tsx and we are importing it here and
// declaring another interface which will be used for this component.
interface childProps extends props {
  Of: string;
  Twit: string;
  Url: string;
  Pin: string;
  isDark: boolean;
}

let UserCard = (props: childProps) => {
  // We check if dark mode is on and setting styles respectively.
  let darkener: string | null = null;
  {props.isDark ? darkener = "card-dark" : darkener = "card-light"}
  return(
    <div className={"card " + darkener}>
      <div className="card__image card__image-original">
        <img src={props.avatar_url} alt="user image" />
      </div>
      <div className="card__info">
        <div className="viewport800">   
          <div className="card__image card__image-viewport-change">
            <img src={props.avatar_url} alt="user image" />
          </div>
          <div className="card__info-head">
            <div className="card__info-head-name">
              <h1>{props.login}</h1>
              <span>@octocat</span>
            </div>
            <span id="join">Joined 25 Jan 2011</span>
          </div>
        </div>
        <div className="card__info-bio">
          <p>{props.bio == null ? "This profile has no bio" : props.bio}</p>
        </div>
        <div className="card__info-acc">
          <div className="card__info-acc-element">
            <h3 className='h3'>Repos</h3>
            <p>{props.public_repos}</p>
          </div>
          <div className="card__info-acc-element">
            <h3 className='h3'>Followers</h3>
            <p>{props.followers}</p>
          </div>
          <div className="card__info-acc-element">
            <h3 className='h3'>Following</h3>
            <p>{props.following}</p>
          </div>
        </div>
        <div className="card__info-about">
          <div className="elem" >
            <img src={props.Pin} alt="pin" />
            <p>{props.location == null ? 'Not Avaliable' : props.location}</p>
          </div>
          <div className="elem" >
            <img src={props.Twit} alt="twitter" />
            <p>{props.twitter_username == null ? "Not Avaliable" : props.twitter_username}</p>
          </div>
          <div className="elem" >
            <img src={props.Url} alt="url" />
            <a href={props.repos_url}>{props.repos_url}</a>
          </div>
          <div className="elem" >
            <img src={props.Of} alt="office" />
            <p>{props.company == null ? "@github" : props.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;