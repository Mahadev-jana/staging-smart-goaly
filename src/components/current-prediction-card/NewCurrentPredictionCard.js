import React, { Fragment, useState, Suspense } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import Modal from 'react-responsive-modal';
import { isNull } from 'lodash';
import { getUserDetails } from '../../_helper/authentication';
// import UserPlayContest from '../../pages/matches/UserPlayContest';
import Swal from 'sweetalert2';
import Spinner from '../../components/loders/loder-spinner';
import './currentPrediction.css';
import * as moment from 'moment';
import Countdown from 'react-countdown';
import stadiumImg from '../../assetsStaging/img/stadium.png';
import { BASE_URL } from '../../_config/axios'

const UserPlayContest = React.lazy(() => import('../../pages/matches/UserPlayContest'));
import { LazyLoadImage } from "react-lazy-load-image-component";


const NewCurrentPredictionCard = React.memo(({ venue_image, isLoading, awayteam, awayteamid, awayteamlogo, hometeam, hometeamid, hometeamlogo, id,
    match_id, league_id, competition_id, league_logo, match_start, players, pred_end, pred_start, venue, history, currentDate, score_home, score_away, status, winPoint, type, news, urlToImage, content, publishedAt, matchList }) => {
    const url = `${BASE_URL}${league_logo}`;
    function awayDetails() {

        // history.push(`team/${awayteamid}`);


    }
    function homeDetails() {

        // history.push(`team/${hometeamid}`);


    }

    function playContest() {
        console.log(getUserDetails())
        if (getUserDetails() == null) {
            console.log('user not logged in');
            Swal.fire({
                title: 'You need to login to predict',
                type: 'info',
                showCancelButton: true,
                confirmButtonText: 'OKAY',
                cancelButtonText: 'CANCEL'
            }).then((result) => {
                if (result.value) {
                    history.push('/login')
                }
            })

        }
        else {
            history.push(`contest/${id}`)
        }

    }

    const [{ open, predictionId }, setModal] = useState({ open: false, predictionId: null });
    //console.log(currentDate)
    var now = utcToLocal(currentDate);
    var then = utcToLocal(match_start);
    var ms = moment(then, "YYYY/MM/DD HH:mm:ss").diff(moment(now, "YYYY/MM/DD HH:mm:ss"));

    const Completionist = () => <span>You are good to go!</span>;

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            return <p class="text-center text-white mb-1">
                Closed at: <br />
                <strong>{days}d:{hours}h:{minutes}m:{seconds}s</strong>
            </p>

        }
    };
    var dynamicBackground = {
        backgroundImage: 'url(' + venue_image + ')'
    }
    var staticBackground = {
        backgroundImage: 'url(' + stadiumImg + ')'
    }
    return (
        <React.Fragment>
            <Modal open={open} onClose={() => setModal({ open: false, tab: '' })} center
                styles={{
                    modal: {
                        borderRadius: '5px'
                    }
                }}
                showCloseIcon={false}
                focusTrapped={false}
                onEntered={() => { document.getElementsByTagName('html')[0].style.width = '100%'; }}
            >
                {!isNull(id) && <UserPlayContest predictionId={predictionId} closeModal={() => setModal({ open: false, predictionId: null })} />}
            </Modal>
            {!isLoading &&

                (type == 'news') ?

                <div class="timeline-group">
                    <div className={
                        news === 'transfer'
                            ? "timeline-group-header header-transfer clearfix"
                            : "timeline-group-header clearfix"
                    }
                    >
                        <span class="float-left" style={{ textTransform: 'capitalize' }}>
                            <span class="icon-group mr-1"></span> <strong>{news} News</strong>
                        </span>
                        <span class="float-right text-right"><Link to="/news">See All</Link></span>
                    </div>
                    <div class="timeline-group-content media">
                        <div class="media-left p-0">
                            <div class="thumbail-news">
                                {/* <img src={urlToImage} alt="Images" /> */}
                                <LazyLoadImage src={urlToImage} alt="Images"/>
                            </div>
                        </div>
                        <div class="media-body">
                            <h4 class="media-heading">{content}</h4>
                            <small class="text-muted"><Moment format="MMM Do YYYY">{publishedAt}</Moment></small>
                        </div>
                    </div>
                </div>
                :

                <div class="timeline-group timeline-match removeMargin" style={{ backgroundImage: 'url(' + stadiumImg + ')' }}>
                    <div class="timeline-match-header row min-gutter d-flex ais-center">
                        <div class="col-xs-4 text-left">
                            <span><Moment format="ddd, DD/MM/YY">{match_start}</Moment></span>
                        </div>

                        <div class="col-xs-4 text-center timeline-header-logo">
                            <Link
                                to={{
                                    pathname: `/league/${league_id}`,
                                    state: { leagueId: league_id, compId: competition_id }
                                }}>
                                {/* <img src={url} alt="EPL"/> */}
                                <LazyLoadImage src={url} alt="EPL" />
                            </Link>
                        </div>

                        {(currentDate >= pred_start) && (currentDate <= pred_end) &&
                            <div class="col-xs-4">
                                <span class="timeline-match-label blue">Ongoing Prediction</span>
                            </div>
                        }
                        {(currentDate < pred_start) && (currentDate < pred_end) &&
                            <div class="col-xs-4">
                                <span class="timeline-match-label blue">Upcoming Match</span>
                            </div>
                        }
                        {(currentDate > pred_start) && (currentDate > pred_end) &&
                            <div class="col-xs-4">
                                <span class="timeline-match-label red">End Match</span>
                            </div>
                        }
                    </div>
                    <ul class="timeline-match-team">
                        <li>
                            <span class="team-img" onClick={() => history.push(`/club-info/${hometeamid}`)}> <LazyLoadImage src={hometeamlogo} alt="Team" /></span>
                            <span class="notranslate">{hometeam}</span>
                            {(currentDate > match_start) ?
                                <span class="team-score notranslate">{score_home}</span>
                                :
                                <span class="team-score">-</span>
                            }
                        </li>
                        <li>
                            <span class="team-img" onClick={() => history.push(`/club-info/${awayteamid}`)}><LazyLoadImage src={awayteamlogo} alt="Team" /></span>
                            <span class="notranslate">{awayteam}</span>
                            {(currentDate > match_start) ?
                                <span class="team-score notranslate">{score_away}</span>
                                :
                                <span class="team-score">-</span>
                            }
                        </li>
                    </ul>
                    {(currentDate >= pred_start) && (currentDate <= pred_end) &&
                        <div class="text-center" onClick={playContest}>
                            <div class="btn bg-green p-1 w-50 my-1 text-white mx-auto">Join</div>
                        </div>
                    }
                    {(currentDate > pred_start) && (currentDate > pred_end) &&
                        <div class="text-center">
                            <div class="btn btn-purple p-1 w-50 my-1 text-white mx-auto" onClick={() => history.push(`match/details/${match_id}`)} style={{ padding: '5px' }}>Result</div>

                        </div>
                    }
                </div>



            }

        </React.Fragment>

    )
});

export default withRouter(NewCurrentPredictionCard);

const utcToLocal = dateTime => {
    const stillUtc = moment.utc(dateTime).toDate();
    return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
}

const styles = {

    title: {
        background: <LazyLoadImage src={stadiumImg}

        />
    }
}