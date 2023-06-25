import React, { Fragment ,useEffect, useState } from 'react';
import '../../assetsStaging/css/circle.css';
import { LeagueSimmer } from '../../simmer-loader/index';
import noDataImg from '../../assetsStaging/img/no_data_found.png';
import GoalKeeper from './GoalKeeper';
import Attacker from './Attacker';
import Middlefielder from './Middlefielder';
import Defender from './Defender';
import './advance.css';
import { isAuthenticate, getUserDetails } from '../../_helper/authentication';
import iconLoc from '../../assets/img/icon-lock-premium.png';

const AdvanceStats = (props) => {
    //console.log(props)
    const { playerInfo, advanceStatsDetails,loading } = props;
    console.log(advanceStatsDetails);
    return (
        <Fragment>
            {loading ?
                <LeagueSimmer />
                :

                <>
                    {Object.keys(advanceStatsDetails.Match_History).length === 0 ?
                        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                            <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                        </div>
                        :
                        <>

                        <div class="">
            
                            <div class="player-stats-detail block mt-1" >
                                <h3 class="m-0 p-1 bg-dark text-white text-center">Match History</h3>
                                <div class="block bg-white shadow">
                                    <div class="match-history table-responsive mb-0">
                                        <table class="table">
                                            <thead style={{backgroundColor:'#e1f7e5'}}>
                                                <tr class="text-black">
                                                    <td>Match</td>
                                                    <td>Playing Time</td>
                                                    <td>Rating</td>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {advanceStatsDetails.Match_History.map((history, key) => (

                                                <tr>
                                                    <td class="match">
                                                        <img src={history.home_team_logo} alt="Team"/>
                                                        <span className="teamSec">vs</span>
                                                        <img src={history.away_team_logo} alt="Team"/>
                                                    </td>
                                                    <td>{history.played_minute}'</td>
                                                    <td>{history.rating}</td>
                                                </tr>
                                                  
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                
                            {isAuthenticate() === true ?

                            <span>    
                            <div class="player-stats-detail block" >
                                <h3 class="m-0 p-1 bg-dark text-white text-center">Shots</h3>
                                <div class="block bg-white shadow">
                                    <ul>
                                        <li><span>Shot Total</span><span>{advanceStatsDetails.total.Shot_Total}</span></li>
                                        <li><span>Shot on Goal</span><span>{advanceStatsDetails.total.Shot_on_goal}</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="player-stats-detail block" >
                                <h3 class="m-0 p-1 bg-dark text-white text-center">Goals</h3>
                                <div class="block bg-white shadow">
                                    <ul>
                                        <li><span>Scored</span><span>{advanceStatsDetails.total.Goals}</span></li>
                                        <li><span>Assists</span><span>{advanceStatsDetails.total.Assist}</span></li>
                                        <li><span>Conceded</span><span>{advanceStatsDetails.total.Conceded}</span></li>
                                        <li><span>Own Goal</span><span>{advanceStatsDetails.total.Own_Goal}</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="player-stats-detail block" >
                                <h3 class="m-0 p-1 bg-dark text-white text-center">Fouls</h3>
                                <div class="block bg-white shadow">
                                    <ul>
                                        <li><span>Yellow Card</span><span>{advanceStatsDetails.total.Yellowcards}</span></li>
                                        <li><span>Red Card</span><span>{advanceStatsDetails.total.Redcards}</span></li>
                                        <li><span>Yellow Red Card</span><span>{advanceStatsDetails.total.Yellowred}</span></li>
                                        <li><span>Offsides</span><span>{advanceStatsDetails.total.Offside}</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="player-stats-detail block" >
                                <h3 class="m-0 p-1 bg-dark text-white text-center">Passing</h3>
                                <div class="block bg-white shadow">
                                    <ul>
                                        <li><span>Total Crosses</span><span>{advanceStatsDetails.total.Total_crosses}</span></li>
                                        <li><span>Crosses Accuracy</span><span>{advanceStatsDetails.total.Crosses_accuracy}</span></li>
                                        <li><span>Passes</span><span>{advanceStatsDetails.total.Passes}</span></li>
                                        <li><span>Accurate Passes</span><span>{advanceStatsDetails.total.Accurate_passes}</span></li>
                                        <li><span>Key Passes</span><span>{advanceStatsDetails.total.Key_passes}</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="player-stats-detail block" >
                                <h3 class="m-0 p-1 bg-dark text-white text-center">Dribbles</h3>
                                <div class="block bg-white shadow">
                                    <ul>
                                        <li><span>Attempts Dribbles</span><span>{advanceStatsDetails.total.Attempts_dribble}</span></li>
                                        <li><span>Success Dribbles</span><span>{advanceStatsDetails.total.Success_dribble}</span></li>
                                        <li><span>Dribbled Past</span><span>{advanceStatsDetails.total.Dribbled_past}</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="player-stats-detail block" >
                                <h3 class="m-0 p-1 bg-dark text-white text-center">Duels</h3>
                                <div class="block bg-white shadow">
                                    <ul>
                                        <li><span>Total Duels</span><span>{advanceStatsDetails.total.Dual_total}</span></li>
                                        <li><span>Duels Won</span><span>{advanceStatsDetails.total.Dual_own}</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="player-stats-detail block" >
                                <h3 class="m-0 p-1 bg-dark text-white text-center">Saves</h3>
                                <div class="block bg-white shadow">
                                    <ul>
                                        <li><span>Saves</span><span>{advanceStatsDetails.total.Saves}</span></li>
                                        <li><span>Inside Box Saves</span><span>{advanceStatsDetails.total.Inside_box_saves}</span></li>
                                        <li><span>Blocks</span><span>{advanceStatsDetails.total.Blocks}</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="player-stats-detail block" >
                                <h3 class="m-0 p-1 bg-dark text-white text-center">Others</h3>
                                <div class="block bg-white shadow">
                                    <ul>
                                        <li><span>Aerals Won</span><span>{advanceStatsDetails.total.Areals_won}</span></li>
                                        <li><span>Punches</span><span>{advanceStatsDetails.total.Punches}</span></li>
                                        <li><span>Penalty Scored</span><span>{advanceStatsDetails.total.Penalties_scores}</span></li>
                                        <li><span>Penalty Missed</span><span>{advanceStatsDetails.total.Penalties_missed}</span></li>
                                        <li><span>Penalty Commited</span><span>{advanceStatsDetails.total.Penalties_committed}</span></li>
                                        <li><span>Penalty Won</span><span>{advanceStatsDetails.total.Penalties_won}</span></li>
                                        <li><span>Hit Woodwork</span><span>{advanceStatsDetails.total.Hit_woodwork}</span></li>
                                        <li><span>Tackles</span><span>{advanceStatsDetails.total.Trackles}</span></li>
                                        <li><span>Interceptions</span><span>{advanceStatsDetails.total.Interception}</span></li>
                                        <li><span>Clearances</span><span>{advanceStatsDetails.total.Clearances}</span></li>
                                        <li><span>Dispossesed</span><span>{advanceStatsDetails.total.Dispossesed}</span></li>
                                    </ul>
                                </div>
                            </div>
                            </span>
                            :

                            <div class="premium-alert">
                                <img src={iconLoc} class="img-responsive mb-2" style={{marginLeft: 'auto', marginRight: 'auto', width:'30'}} alt="Lock" />
                                <h3>This Is a Part of Goaly Premium</h3>
                                <p class="mb-1">Get full access to all feature by subscribe Goaly</p>
                                <a href="" class="btn btn-lg btn-block btn-default my-1 bg-green text-white btn-subscribe">Subscribe</a>
                                <p>Already Subsribed? <a class="text-purple" href="#">Login</a></p>
                            </div>

                        }
                        </div>


                        </>
                    }

                </>
            }



        </Fragment>

    )
}
export default AdvanceStats;