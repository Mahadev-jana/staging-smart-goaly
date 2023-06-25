import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import * as moment from 'moment';
import { LeagueSimmer, PlayerSeasonSimmer } from '../../simmer-loader/index';
import noDataImg from '../../assetsStaging/img/no_data_found.png';
import defaultImg from '../../assetsStaging/img/default-player.png';
import Trophy from '../../assetsStaging/img/Group169.png';
import './Clubinfo.css';
const ClubInfo = (props) => {
    const [limitNext, setLimitNext] = useState(1);
    const [limitPrev, setLimitPrev] = useState(1);
    const [moreNextButton, setMoreNextButton] = useState(true);
    const [morePrevButton, setMorePrevButton] = useState(true);

    const showAllNextGame = () => {
        setLimitNext(nextGame.length);
        setMoreNextButton(false);
    }
    const showAllPrevtGame = () => {
        setLimitPrev(prevGame.length);
        setMorePrevButton(false);
    }
     //console.log(props)
    const { nextGame, prevGame, loading, season, loadingSeason, trophy, loadingTrophy, topGoal, topYellowcard, topRedcard, topAssists, loadingTopPlayers,seasonName,compId } = props;
    return (
        <div className="tab-content row">
            {loadingSeason ?
                <PlayerSeasonSimmer />
                :
                <>

                    <div className="club-highlight block bg-grey">
                        <h5>Season {seasonName}</h5>
                        {Object.keys(season).length !== 0 ?
                            <ul>
                                <li>
                                    <span>{season.Matched_played === '' ? 0 : season.Matched_played}</span>
                                    <span>Matches Played</span>
                                </li>
                                <li>
                                    <span>{season.Goals === '' ? 0 : season.Goals}</span>
                                    <span>Goal</span>
                                </li>
                                <li>
                                    <span>{season.Yellow_Cards === '' ? 0 : season.Yellow_Cards}</span>
                                    <span>Yellow Card</span>
                                </li>
                                {/* <li>
                                    <span>{season.Others === '' ? 0 : season.Others}</span>
                                    <span>Others</span>
                                </li> */}
                            </ul>
                            :
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                                <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        }
                    </div>


                </>
            }


          
            <div className="pleague-top-player-box">
                <div className="tag bg-dark d-flex text-white">
                    <span className="mr-auto">Top Player</span>
                    <span>{seasonName}</span>
                </div>
                {loadingTopPlayers ?
                    <PlayerSeasonSimmer />
                    :
                    
                    <>
                    {(!loadingTopPlayers&& topGoal.length>0 && topAssists.length>0 && topRedcard.length>0 && topYellowcard.length>0 )
                        ?
                        <div  className="bg-white">
                        <ul>
                            {topGoal && topGoal.sort((a, b) => b.goals - a.goals).slice(0, 1).map((goal, key) => {
                                return <li  className="m-0" key={key}>
                                   {/* { console.log(compId)} */}
                                    <Link to={{
                                        pathname: `/player-info/${goal.player_id}`,
                                        state: { playerId: goal.player_id,
                                            compId: compId
                                        }
                                    }}>
                                         <div className="ptop-player-box">
                                         <div className="ptop-player-box-glass"></div>
                                         <span className="ptop-player-box-position">FW</span>
                                        
                                         <div className="ptop-player-box-team">
                                                        <img src={goal.team_logo} alt=""/> 
                                                    </div>
                                         <img src={goal.player_image == '' ? defaultImg : goal.player_image} alt="" />
                                         
                                         {/* <img src={player.data.image_path} className="ptop-player-box-pic" alt="" /> */}
                                         <p className="m-0">{goal.player_name.split(" ")[0]}</p>
                                        <p className="m-0">{goal.player_name.split(' ')[1]}</p>
                                        <p className="m-0"><strong style={{fontSize:"14px"}}>Goals
                                                       
                                                    </strong></p>

                                        <div className="ptop-player-box-score">Score<br/><strong>{goal.goals}</strong></div>

                                         </div>


                                       
                                    </Link>
                                </li>
                            })}
                            {topYellowcard && topYellowcard.sort((a, b) => b.yellowcards - a.yellowcards).slice(0, 1).map((yellowcard, key) => {
                                return <li key={key}>
                                    <Link to={{
                                        pathname: `/player-info/${yellowcard.player_id}`,
                                        state: { playerId: yellowcard.player_id,
                                            compId: compId }
                                    }}>
                                          <div className="ptop-player-box">
                                         <div className="ptop-player-box-glass"></div>
                                         <span className="ptop-player-box-position">FW</span>
                                         <div className="ptop-player-box-team">
                                         <img src={yellowcard.team_logo} alt=""/>
                                         </div>
                                         <img src={yellowcard.player_image == '' ? defaultImg : yellowcard.player_image} alt="" />
                                         
                                         {/* <img src={player.data.image_path} className="ptop-player-box-pic" alt="" /> */}
                                         <p className="m-0">{yellowcard.player_name.split(" ")[0]}</p>
                                        <p className="m-0">{yellowcard.player_name.split(' ')[1]}</p>
                                        <p className="m-0"><strong style={{fontSize:"14px"}}>Yellowcards
                                                       
                                                    </strong></p>

                                        <div className="ptop-player-box-score">Score<br/><strong>{yellowcard.yellowcards}</strong></div>
                                        </div>


                                    
                                    </Link>
                                </li>
                            })}
                            {topRedcard && topRedcard.sort((a, b) => b.redcards - a.redcards).slice(0, 1).map((redcard, key) => {
                                return <li className="m-0" key={key}>
                                    <Link to={{
                                        pathname: `/player-info/${redcard.player_id}`,
                                        state: { playerId: redcard.player_id,
                                            compId: compId }
                                    }}>
                                         <div className="ptop-player-box">
                                         <div className="ptop-player-box-glass"></div>
                                         <span className="ptop-player-box-position">FW</span>
                                         <div className="ptop-player-box-team">
                                         <img src={redcard.team_logo} alt=""/>
                                         </div>
                                         <img src={redcard.player_image == '' ? defaultImg : redcard.player_image} alt="" />
                                       
                                         {/* <img src={player.data.image_path} className="ptop-player-box-pic" alt="" /> */}
                                         <p className="m-0">{redcard.player_name.split(" ")[0]}</p>
                                        <p className="m-0">{redcard.player_name.split(' ')[1]}</p>
                                        <p className="m-0"><strong style={{fontSize:"14px"}}>Redcards
                                                       
                                                    </strong></p>

                                        <div className="ptop-player-box-score">Score<br/><strong>{redcard.redcards}</strong></div>

                                         </div>

                                    
                                         


                                   
                                    </Link>
                                </li>
                            })}
                            {topAssists && topAssists.sort((a, b) => b.assists - a.assists).slice(0, 1).map((assist, key) => {
                                return <li key={key}>
                                    <Link to={{
                                        pathname: `/player-info/${assist.player_id}`,
                                        state: { playerId: assist.player_id,
                                            compId: compId }
                                    }}>
                                          <div className="ptop-player-box">
                                         <div className="ptop-player-box-glass"></div>
                                         <span className="ptop-player-box-position">FW</span>
                                         <div className="ptop-player-box-team">
                                         <img src={assist.team_logo} alt=""/>
                                             </div>
                                         <img src={assist.player_image == '' ? defaultImg : assist.player_image} alt="" />
                                         
                                         {/* <img src={player.data.image_path} className="ptop-player-box-pic" alt="" /> */}
                                         <p className="m-0">{assist.player_name.split(" ")[0]}</p>
                                        <p className="m-0">{assist.player_name.split(' ')[1]}</p>
                                        <p className="m-0"><strong style={{fontSize:"14px"}}>Assists
                                                       
                                                    </strong></p>

                                        <div className="ptop-player-box-score">Score<br/><strong>{assist.assists}</strong></div>
                                        </div>


                                   
                                    </Link>
                                </li>
                            })}

                        </ul>
                    </div>

                        :
                        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                        <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                    </div>
                    }
                    </>
                }
            </div>
           









            <div className="tag bg-purple d-flex text-white">
                <span className="mr-auto">Next Game</span>
                {moreNextButton && !loading && limitNext <= nextGame.length &&
                    <span className="bg-whitepurple" onClick={showAllNextGame}>More</span>
                }

            </div>
            <div className="container-matches">
                {loading ?
                    <>
                        <PlayerSeasonSimmer />
                    </>
                    :

                    <>
                        {nextGame.length >= 1 ?
                            <>
                                {nextGame && nextGame.slice(0, limitNext).map((game, key) => {
                                    return <div className="matches" key={key}>
                                        <div className="d-flex j-center">
                                            <div className="club-left mx-1 text-center">
                                                <div className="logo" style={{maxWidth: '75px'}}
                                                 onClick={() => props.clubIdChange(game.homeTeam_id)}><img src={game.homeTeam_logo} alt="" style={{
                                                width: '60px',
                                                maxWidth: '60px',
                                                height: '60px',
                                                maxHeight: '60px'
                                            }} /></div>
                                                <h5 className="mb-0">{game.homeTeam_name}</h5>
                                            </div>
                                            <div className="mid mx-2 d-flex flex-column my-auto">
                                                <div className="d-flex j-center h-max-c border radius-1 px-2 py-1" style={{ fontSize: "16pt" }}>
                                                    <span>--</span>
                                                    <span className="mx-2 border-right"></span>
                                                    <span>--</span>
                                                </div>
                                                <span className="my-1">{utcToLocal(game.date_time)}</span>
                                                <span className="btn-pill bg-green" onClick={() => props.history.push({
                                                    pathname: `/match/details/${game.match_id}`,
                                                    state: { id:game.match_id }
                                                })}>Coming Soon</span>
                                            </div>
                                            <div className="club-right mx-1 text-center">
                                                <div className="logo" style={{maxWidth: '75px'}}
                                                onClick={() => props.clubIdChange(game.awayTeam_id)}><img src={game.awayTeam_logo} alt=""  style={{
                                                width: '60px',
                                                maxWidth: '60px',
                                                height: '60px',
                                                maxHeight: '60px'
                                            }}/></div>
                                                <h5 className="mb-0">{game.awayTeam_name}</h5>
                                            </div>
                                        </div>
                                    </div>

                                })}
                            </>
                            :
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                                <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        }

                    </>
                }

            </div>
            <div className="tag bg-purple d-flex text-white">
                <span className="mr-auto">Previous Game</span>
                {morePrevButton && !loading && limitPrev <= prevGame.length &&
                    <span className="bg-whitepurple" onClick={showAllPrevtGame}>More</span>
                }

            </div>
            <div className="container-matches">
                {loading ?
                    <>
                        <PlayerSeasonSimmer />
                    </>
                    :

                    <>
                        {prevGame.length >= 1 ?
                            <>
                                {prevGame && prevGame.slice(0, limitPrev).map((game, key) => {
                                    return <div className="matches" key={key}>
                                        <div className="d-flex j-center">
                                            <div className="club-left mx-1 text-center">
                                                <div className="logo" onClick={() => props.clubIdChange(game.homeTeam_id)}><img src={game.homeTeam_logo} alt="" /></div>
                                                <h5 className="mb-0">{game.homeTeam_name}</h5>
                                            </div>
                                            <div className="mid mx-2 d-flex flex-column my-auto">
                                                <div className="d-flex j-center h-max-c border radius-1 px-2 py-1" style={{ fontSize: "16pt" }}>
                                                    <span>{game.homeTeam_score}</span>
                                                    <span className="mx-2 border-right"></span>
                                                    <span>{game.awayTeam_score}</span>
                                                </div>
                                                <span className="my-1">{utcToLocal(game.date_time)}</span>
                                                <span className="btn-pill bg-red" onClick={() => props.history.push({
                                                    pathname: `/match/details/${game.match_id}`,
                                                    state: { id:game.match_id }
                                                })}>Finished</span>
                                            </div>
                                            <div className="club-right mx-1 text-center">
                                                <div className="logo" onClick={() => props.clubIdChange(game.awayTeam_id)}><img src={game.awayTeam_logo} alt="" /></div>
                                                <h5 className="mb-0">{game.awayTeam_name}</h5>
                                            </div>
                                        </div>
                                    </div>

                                })}
                            </>
                            :
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                                <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        }

                    </>
                }

            </div>
            <div className="tag bg-green d-flex text-white">
                <span className="mx-auto">Trophy</span>
            </div>
            {/* {console.log(loadingTrophy)} */}
            {loadingTrophy ?
                <LeagueSimmer />
                :
                <>
                    {trophy.length >= 1 ?
                        <div className="competion-hstr">
                            <ul>
                                {trophy && trophy.map((data, key) => {
                                    return <li key={key}>
                                        <div className="cover-img">
                                            <img src={data.league_logo === '' ? Trophy : data.league_logo} alt="" />
                                        </div>
                                        <h3><strong>{data.win_times}</strong></h3>
                                        <span>{data.league_name}</span>
                                    </li>
                                })}

                            </ul>
                        </div>
                        :
                        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                            <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                        </div>
                    }

                </>
            }

        </div>

    )
}
export default withRouter(ClubInfo);

const utcToLocal = dateTime => {
    const stillUtc = moment.utc(dateTime).toDate();
    return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
}
