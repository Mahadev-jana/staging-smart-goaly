import React, { useState, useEffect } from 'react';
import axios from '../../_config/axios';
import { LeagueSimmer } from '../../simmer-loader/index';
import noDataImg from '../../assetsStaging/img/no_data_found.png';
import Albion from '../../assetsStaging/img/ic-albion.png';
import Chelsea from '../../assetsStaging/img/ic-chelsea.png';
import Manchester from '../../assetsStaging/img/ic-mancity.png';
import iconLoc from '../../assets/img/icon-lock-premium.png';
import { isAuthenticate, getUserDetails } from '../../_helper/authentication';
const ClubStats = (props) => {
    //console.log(props)
    
    const { stats, loadingStats } = props;
    return (
        <div className="tab-content row">


            {loadingStats ?
                <>
                    <LeagueSimmer />
                    <LeagueSimmer />
                </>

                :
                <>
                    {stats ?
                        <div>
                        <div class="club-stats table-responsive">
                            <table class="table">
                                <thead>
                                    <tr class="text-black">
                                        <td class="text-left club-stats-title"><span class="icon icon-writing"></span> Record</td>
                                        <td>Home</td>
                                        <td>Away</td>
                                        <td>Total</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-left club-stats-title">Win</td>
                                        <td>{stats.win.home}</td>
                                        <td>{stats.win.away}</td>
                                        <td>{stats.win.total}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left club-stats-title">Draw</td>
                                        <td>{stats.draw.home}</td>
                                        <td>{stats.draw.away}</td>
                                        <td>{stats.draw.total}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left club-stats-title">Lose</td>
                                        <td>{stats.lost.home}</td>
                                        <td>{stats.lost.away}</td>
                                        <td>{stats.lost.total}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="club-stats table-responsive">
                            <table class="table">
                                <thead>
                                    <tr class="text-black">
                                        <td class="text-left club-stats-title"><span class="icon icon-ball"></span> Goal & No Goal</td>
                                        <td>Home</td>
                                        <td>Away</td>
                                        <td>Total</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-left club-stats-title">Goals for</td>
                                        <td>{stats.goals_for.home}</td>
                                        <td>{stats.goals_for.away}</td>
                                        <td>{stats.goals_for.total}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left club-stats-title">Goals Against</td>
                                        <td>{stats.goals_against.home}</td>
                                        <td>{stats.goals_against.away}</td>
                                        <td>{stats.goals_against.total}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left club-stats-title">Clean Sheets</td>
                                        <td>{stats.clean_sheet.home}</td>
                                        <td>{stats.clean_sheet.away}</td>
                                        <td>{stats.clean_sheet.total}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left club-stats-title">Failed to Score</td>
                                         <td>{stats.failed_to_score.home}</td>
                                         <td>{stats.failed_to_score.away}</td>
                                         <td>{stats.failed_to_score.total}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                       
                        
                        {isAuthenticate() === true ?
                        
                        <span>    
                            <div class="club-stats table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr class="text-black">
                                            <td class="text-left club-stats-title"><span class="icon icon-average"></span> Average Goals</td>
                                            <td>Home</td>
                                            <td>Away</td>
                                            <td>Total</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="text-left club-stats-title">Avg. Goals per Game Scored</td>
                                            <td>{stats.avg_goals_per_game_scored.home}</td>
                                            <td>{stats.avg_goals_per_game_scored.away}</td>
                                            <td>{stats.avg_goals_per_game_scored.total}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left club-stats-title">Avg. Goals per Game Conceded</td>
                                            <td>{stats.avg_goals_per_game_conceded.home}</td>
                                            <td>{stats.avg_goals_per_game_conceded.away}</td>
                                            <td>{stats.avg_goals_per_game_conceded.total}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left club-stats-title">Avg. First Goal Scored</td>
                                            <td>{stats.avg_first_goal_scored.home}</td>
                                            <td>{stats.avg_first_goal_scored.away}</td>
                                            <td>{stats.avg_first_goal_scored.total}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left club-stats-title">Avg. First Goal Conceded</td>
                                            <td>{stats.avg_first_goal_conceded.home}</td>
                                            <td>{stats.avg_first_goal_conceded.away}</td>
                                            <td>{stats.avg_first_goal_conceded.total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="club-stats table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr class="text-black">
                                            <td class="text-left club-stats-title"><span class="icon icon-time-left"></span> Scoring Minutes</td>
                                            <td class="text-right">Count</td>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {stats.scoring_minutes.map((score, index) => (  
                                              <tr data-index={index}>  
                                                <td class="text-left">{score.minute}</td>
                                                <td class="text-right"><strong>{score.count}</strong>&nbsp;/{score.percentage}%</td> 
                                              </tr>  
                                        ))}  

                                    </tbody>
                                </table>
                            </div>

                            <div class="club-stats table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr class="text-black">
                                            <td class="text-left club-stats-title"><span class="icon icon-time-left"></span> Goals Conceded Minutes</td>
                                            <td class="text-right">Count</td>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {stats.goals_conceded_minutes.map((goals, index) => (  
                                              <tr data-index={index}>  
                                                <td class="text-left">{goals.minute}</td>
                                                <td class="text-right"><strong>{goals.count}</strong>&nbsp;/{goals.percentage}%</td> 
                                              </tr>  
                                        ))}  

                                        
                                    </tbody>
                                </table>
                            </div>

                            <div class="club-stats table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr class="text-black">
                                            <td class="text-left club-stats-title"><span class="icon icon-play"></span> Game Play</td>
                                            <td class="text-right">&nbsp;</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="text-left">Attacks</td>
                                            <td class="text-right">{stats.attacks}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">Dangerous Attacks</td>
                                            <td class="text-right">{stats.dangerous_attacks}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">Shot Blocked</td>
                                            <td class="text-right">{stats.shots_blocked}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">Shot of Target</td>
                                            <td class="text-right">{stats.shots_off_target}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">Avg. Shots off Target per Game</td>
                                            <td class="text-right">{stats.avg_shots_off_target_per_game}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">Shot on Target</td>
                                            <td class="text-right">{stats.shots_on_target}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">Avg. Shots on Target per Game</td>
                                            <td class="text-right">{stats.avg_shots_on_target_per_game}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">Avg. Corners</td>
                                            <td class="text-right">{stats.avg_corners}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">Total Corners</td>
                                            <td class="text-right">{stats.total_corners}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">BTTS</td>
                                            <td class="text-right">{stats.btts}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">Avg. Player Ratings</td>
                                            <td class="text-right">{stats.avg_player_rating}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">Avg. Player Ratings per Match</td>
                                            <td class="text-right">{stats.avg_player_rating_per_match}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">Tackles</td>
                                            <td class="text-right">{stats.tackles}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="club-stats table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr class="text-black">
                                            <td class="text-left club-stats-title"><span class="icon icon-flag"></span> Dicipline</td>
                                            <td class="text-right">&nbsp;</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="text-left">Red Cards</td>
                                            <td class="text-right">{stats.redcards}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">Yellow Cards</td>
                                            <td class="text-right">{stats.yellowcards}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">Fouls</td>
                                            <td class="text-right">{stats.fouls}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">Offsides</td>
                                            <td class="text-right">{stats.offsides}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </span>
                        :

                            <div class="premium-alert">
                                <img src={iconLoc} class="img-responsive mb-2" style={{marginLeft: 'auto', marginRight: 'auto', width:'30'}} alt="Lock" />
                                <h3>This Is a Part of Goaly Premium</h3>
                                <p class="mb-1">Get full access to all feature by subscribe Goaly</p>
                                <a href="#" class="btn btn-lg btn-block btn-default my-1 bg-green text-white btn-subscribe">Subscribe</a>
                                <p>Already Subsribed? <a class="text-purple" href="#">Login</a></p>
                            </div>

                        }
                        

                        </div>

                        

                        :
                        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                            <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                        </div>

                    }
                </>
            }
        </div>
    )
}
export default ClubStats;