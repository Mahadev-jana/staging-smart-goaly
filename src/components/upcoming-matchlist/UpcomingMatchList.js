import React from 'react'
import stadiumImg from '../../assetsStaging/img/stadium.png';
import { Row, Col } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import Modal from 'react-responsive-modal';
import { isNull } from 'lodash';
import { getUserDetails } from '../../_helper/authentication';
// import UserPlayContest from '../../pages/matches/UserPlayContest';
import Swal from 'sweetalert2';
import Spinner from '../../components/loders/loder-spinner';
import '../current-prediction-card/CurrentPrediction.css';
import * as moment from 'moment';
import Countdown from 'react-countdown';
import {BASE_URL} from '../../_config/axios'

const UserPlayContest = React.lazy(() => import('../../pages/matches/UserPlayContest'));
import { LazyLoadImage } from "react-lazy-load-image-component";


const UpcomingMatchList = (props) => {
  const url = `${BASE_URL}${props.league_logo}`;
  return (
    <>
    { !props.isLoading &&

       
           <div class="timeline-group timeline-match removeMargin" style={{backgroundImage:'url(' + stadiumImg + ')', minHeight: "274.5px"}}>
            <div class="timeline-match-header row min-gutter d-flex ais-center">
                <div class="col-xs-4 text-left">
                    <span><Moment format="ddd, DD/MM/YY">{props.date}</Moment></span>
                </div>
                 
                <div class="col-xs-4 text-center timeline-header-logo">
                <Link
                    to={{
                        pathname: `/league/${props.league}`,
                        state: { leagueId: props.league,compId:props.competition_id }
                      }}>
                    {/* <img src={url} alt="EPL"/> */}
                    <LazyLoadImage src={url} alt="EPL" />
                    </Link>
                </div>
                
                {/* {(props.currentDate >= props.date) && (props.currentDate <= pred_end) &&
                    <div class="col-xs-4">
                        <span class="timeline-match-label blue">Ongoing Prediction</span>
                    </div>
                } */}
                {/* {(props.currentDate < props.date) && (props.currentDate < pred_end) && */}
                    <div class="col-xs-4">
                        <span class="timeline-match-label blue" onClick={()=>props.history.push(`match/details/${props.match_id}`)}>Upcoming Match</span>
                    </div>
                {/* } */}
                {/* {(props.currentDate > props.date) && (props.currentDate > pred_end) &&
                    <div class="col-xs-4">
                        <span class="timeline-match-label red">End Match</span>
                    </div>
                } */}
            </div>
            <ul class="timeline-match-team">
                <li>
                    <span class="team-img" onClick={() => props.history.push(`/club-info/${props.hometeamlogo}`)}> <LazyLoadImage src={props.hometeamlogo} alt="Team" /> </span>
                    <span class="notranslate">{props.hometeam}</span>
                        <span class="team-score">-</span>
                </li>
                <li>
                    <span class="team-img" onClick={() => props.history.push(`/club-info/${props.awayteamlogo}`)}><LazyLoadImage src={props.awayteamlogo} alt="Team" />  </span>
                    <span class="notranslate">{props.awayteam}</span>
                        <span class="team-score">-</span>
                </li>
            </ul>
            {/* {(props.currentDate >= props.date) && (props.currentDate <= pred_end) &&
                <div class="text-center" onClick={playContest}>
                    <div class="btn bg-green p-1 w-50 my-1 text-white mx-auto">Join</div>
                </div>
            }
            {(props.currentDate > props.date) && (props.currentDate > pred_end) &&
                <div class="text-center">
                    <div class="btn btn-purple p-1 w-50 my-1 text-white mx-auto" onClick={()=>props.history.push(`match/details/${match_id}`)} style={{padding:'5px'}}>Result</div>
                </div>
            } */}
        </div>
    }

</>
  )
}

export default withRouter(UpcomingMatchList)

const utcToLocal = dateTime => {
    const stillUtc = moment.utc(dateTime).toDate();
    return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
}

const styles = {

    title: {
        background:<LazyLoadImage src={stadiumImg}
       
      />
    }
}