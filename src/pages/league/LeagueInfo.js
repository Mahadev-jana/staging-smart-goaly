import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import * as moment from 'moment';
import { PlayersSimmer, MatchesSimmer, MatchesHeadingSimmer } from '../../simmer-loader/index';
import noDataImg from '../../assetsStaging/img/no_data_found.png';
// import Face1 from '../../assetsStaging/img/face.png';
// import Face2 from '../../assetsStaging/img/face2.png';
// import Face3 from '../../assetsStaging/img/face3.png';
// import Albion from '../../assetsStaging/img/ic-albion.png';
// import Chelsea from '../../assetsStaging/img/ic-chelsea.png';
// import Manchester from '../../assetsStaging/img/ic-mancity.png';
import './Leageinfo.css';
import { PlaybackRateMenuButton } from 'video-react';

const LeagueInfo = (props) => {
    //console.log(props)
    const [lastMatchLimit, setLastMatchLimit] = useState(2);
    const [nextMatchLimit, setNextMatchLimit] = useState(2);


    const [matches, setMatches] = useState([]);
    const [loadingMatches, setLoadingMatches] = useState(true);

    const [isReadMore, setIsReadMore] = useState(false);
    const [isReadMoreM, setIsReadMoreM] = useState(false);
    

    const seeAllLastMatches = (arrayLength) => {
        // console.log(arrayLength);
        // setIsReadMore(!isReadMore)
        setLastMatchLimit(arrayLength);
        setIsReadMore(!isReadMore)
     


    }

    const seeAllNextMatches = (arrayLength) => {
        // console.log(arrayLength);
        setNextMatchLimit(arrayLength);
    }

    const { turnament,compId, topPlayers, loadingplayers, lastGame, nextGame, loadinginfoMatches, season, seasonName, seasonLoading } = props;
    // console.log(topPlayers)
    // console.log(lastGame)
    // console.log(nextGame)
    // console.log(loadinginfoMatches)
    
    return (
        <div className="tab-content">
            {seasonLoading ?
                <PlayersSimmer />


                :
                
                <div className="league-highlight block bg-grey">
                   {!turnament && <h5>Season {seasonName}</h5>}
                    {/* {console.log(seasonName)} */}
                    {Object.keys(season).length >=1 ?
                        <ul>
                        <li>
                            <span>{season.Matched_played}</span>
                            <span>Matches Played</span>
                        </li>
                        <li>
                            <span>{season.Goals}</span>
                            <span>Goals</span>
                        </li>
                        <li>
                            <span>{season.Yellow_Cards}</span>
                            <span>Yellow Card</span>
                        </li>
                        <li>
                            <span>{season.red_cards === "" ? 0 : season.redcards}</span>
                            <span>Red Card</span>
                        </li>
                        <li>
                            <span>{season.assists === "" ? 0 : season.assists}</span>
                            <span>Assists</span>
                        </li>
                    </ul>
                    :
                    <>
                    {!turnament ?
                        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90px' }}>
                        <img style={{ height: '80px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
            </div>
            :
            null
                    }
                    </>
                    
                }
                    
                    
                </div>

            }
            {loadingplayers ?
                <PlayersSimmer />
                :
                <div className="pleague-top-player-box">
                    <div className="tag bg-dark d-flex text-white">
                        <span className="mr-auto">Top Player</span>
                        <span>Season {seasonName}</span>
                    </div>
                   {topPlayers.length>=1 ? 
                   <div className="bg-white">
                        <ul>
                            {topPlayers && topPlayers.map((player, key) => {

                                return <li className="m-0"  style={{ width: '100%' }} key={key}>
                                        {(player.data.image_path=="" && player.data.name=="" && player.data.length==0) ? null:<Link to={{
                                            pathname: `/player-info/${player.data.player_id}`,
                                            state: { playerId: player.data.player_id, compId: compId }
                                            }}>
                                        {player.data.length==0? 
                                         <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px'}}>
                                         <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                                     </div>
                                     :
                                     <div className="ptop-player-box">
                                     <div className="ptop-player-box-glass"></div>
                                     <span className="ptop-player-box-position">FW</span>
                                     <div className="ptop-player-box-team">
                                         <img src={player.data.team_logo} alt=""/> 
                                     </div>
                                     <img src={player.data.image_path} className="ptop-player-box-pic" alt="" />
                                     <p className="m-0">{player.data.name.split(" ")[0]}</p>
                                     <p className="m-0">{player.data.name.split(" ")[1]}</p>
                                     <p className="m-0"><strong style={{fontSize:"14px"}}>
                                         {player.title!=='Yellow cards'? player.title:"Ylw cards"} 
                                     </strong></p>
                                     <div className="ptop-player-box-score">Score<br/><strong>{player.data.scores}</strong></div>
                                 </div>}
                                               
                                            {/* <div style={{
                                                background:'rgb(193,77,137)',                                    
                                                padding: '0px',
                                                position: 'relative',
                                                width: '135px',
                                                }} >
                                            <span>FW</span>
                                            <img src={player.data.image_path}  alt="" 
                                                style={{width: '65px',
                                                height: '65px',
                                                borderRadius: '50%',
                                                border: '1px solid white',
                                                color:'white',
                                                background:'white'}}
                                            /> 
                                                <p className="m-0">{player.data.name.split(" ")[0]}</p>
                                                <p className="m-0">{player.data.name.split(' ')[1]}</p>
                                                <p className="m-0"><strong>
                                                {player.title!=='Yellow cards' && <span><strong>{player.title}</strong></span>}
                                                {player.title==='Yellow cards' && <span><strong>Ylw cards</strong></span>} 
                                                </strong></p>

                                                <div style={{
                                                    border: '2px solid white',
                                                    padding: '1.5rem',
                                                    height:'4rem',
                                                    width:'12rem',
                                                    borderRadius: '50px',
                                                    display: 'block',
                                                    margin: '1rem',
                                                    fontSize: '12px',
                                                    lineHeight: 1,
                                                    marginTop: '2rem',
                                                    paddingTop:'1rem',                                                              
                                                    color:'white'     
                                                }} >
                                                    Score<br/><strong>{player.data.scores}</strong></div>
                                            </div> */}
                                            </Link>
                                        }
                                    </li>









                                // return <li key={key}>
                                //     {(player.data.image_path=="" && player.data.name=="") ?
                                //             null
                                //             :
                                //             <Link to={{
                                //                 pathname: `/player-info/${player.data.player_id}`,
                                //                 state: { playerId: player.data.player_id, compId: compId }
                                //             }}>
                                                
                                //                 <div className="cover-img"><img src={player.data.image_path} alt="" style={{height:'100%',width:'100%'}}/></div>
                                //                 <h5 className="my-1" style={{ fontSize: '12px' }}>{player.data.name.split(" ")[0]}</h5>
                                //                 <h5 className="my-1" style={{ fontSize: '12px' }}>{player.data.name.split(' ')[1]}</h5>
                                //                 {player.title!=='Yellow cards' && <span><strong>{player.title}</strong></span>}
                                //                 {player.title==='Yellow cards' && <span><strong>Ylw cards</strong></span>}
                                //                 <span className="btn-pill">
                                //                     Score <br /> {player.data.scores}
                                //                 </span>
                                //             </Link>
                                //         }
                                    
                                    
                                // </li>


{/* <li key={key}>
{(player.data.image_path=="" && player.data.name=="") ?
        null
        :
        <Link to={{
            pathname: `/player-info/${player.data.player_id}`,
            state: { playerId: player.data.player_id, compId: compId }
        }}>
            
            <div className="cover-img"><img src={player.data.image_path} alt="" style={{height:'100%',width:'100%'}}/></div>
            <h5 className="my-1" style={{ fontSize: '12px' }}>{player.data.name.split(" ")[0]}</h5>
            <h5 className="my-1" style={{ fontSize: '12px' }}>{player.data.name.split(' ')[1]}</h5>
            {player.title!=='Yellow cards' && <span><strong>{player.title}</strong></span>}
            {player.title==='Yellow cards' && <span><strong>Ylw cards</strong></span>}
            <span className="btn-pill">
                Score <br /> {player.data.scores}
            </span>
        </Link>
    }


</li> */}




                            })}

                        </ul>
                    </div>
                    :
                    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180px' }}>
                                <img style={{ height: '100px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
            }
                </div>


            }
            {loadinginfoMatches ?
                <>
                    <MatchesHeadingSimmer />
                    <MatchesSimmer />
                    <MatchesSimmer />
                </>

                :

                <>
                    {lastGame.length > 0 ?
                        <>
                            <div className="tag bg-purple d-flex text-white">
                                <span className="mr-auto">Last Game</span>
                                {lastMatchLimit === lastGame.length && isReadMore===false ?
                                    null
                                    :
                                    <span className="bg-whitepurple" onClick={() => {setIsReadMore(!isReadMore); setLastMatchLimit(lastGame.length+2-lastMatchLimit);}}> {isReadMore ? "Less":"More" }</span>
                                    
                                
                                    // <span className="bg-whitepurple" onClick={() => seeAllLastMatches(lastGame.length)}> {isReadMore ? "less":"more"}</span>
                                }

                            </div>
                            
                            {/* {console.log(lastGame)} */}
                             
                               
                            {lastGame && lastGame.slice(0, lastMatchLimit).map((game, key) => {
                                
                                return  <div className="container-matches" key={key}>
                                    <div className="matches">
                                        <div className="d-flex j-center">
                                            <div className="club-left mx-1 text-center" style={{ textAlign: '-webkit-center', width: 'min-content' }}>
                                                <div className="logo" style={{ maxWidth: "65px" }} onClick={() => props.history.push(`/club-info/${game.homeTeam_id}`)}><img src={game.home_logo} alt="" style={{ maxWidth: "50px" }} /></div>
                                                <h5 className="mb-0" style={{fontSize: '11px'}}>{game.homeTeam_name}</h5>
                                            </div>
                                            <div className="mid mx-2 d-flex flex-column my-auto">
                                                <div className="d-flex j-center h-max-c border radius-1 px-2 py-1" style={{ fontSize: "16pt" }}>
                                                    <span>{game.homeTeam_score}</span>
                                                    <span className="mx-2 border-right"></span>
                                                    <span>{game.awayTeam_score}</span>
                                                </div>
                                                <span className="my-1">{utcToLocal(game.date_time).split(' ')[0]}</span>
                                                <span className="btn-pill bg-red" onClick={() => props.history.push(`/match/details/${game.match_id}`)}>Finished</span>
                                            </div>
                                            <div className="club-right mx-1 text-center" style={{ textAlign: '-webkit-center', width: 'min-content' }}>
                                                <div className="logo" style={{ maxWidth: "65px" }} onClick={() => props.history.push(`/club-info/${game.awayTeam_id}`)}><img src={game.away_logo} alt="" style={{ maxWidth: "50px" }} /></div>
                                                <h5 className="mb-0"  style={{fontSize: '11px'}}>{game.awayTeam_name}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            })}


                         
                          


                        </>
                        :

                        <>
                            <div className="tag bg-purple d-flex text-white">
                                <span className="mr-auto">Last Game</span>
                            </div>
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        </>


                    }

                </>
            }


            {loadinginfoMatches ?
                <>
                    <MatchesHeadingSimmer />
                    <MatchesSimmer />
                    <MatchesSimmer />
                </>

                :
                <>
                    {nextGame.length > 0 ?
                        <>
                            <div className="tag bg-purple d-flex text-white">
                                <span className="mr-auto">Next Game</span>
                                {nextMatchLimit === nextGame.length  && isReadMoreM===false ?
                                    null
                                    :
                                    <span className="bg-whitepurple" onClick={() => {setIsReadMoreM(!isReadMoreM); setNextMatchLimit(nextGame.length+2-nextMatchLimit);}}> {isReadMoreM ? "Less":"More" }</span>
                                    // <span className="bg-whitepurple" onClick={() => seeAllNextMatches(nextGame.length)}>More</span>
                                }

                            </div>
                            {console.log(nextGame)}
                            {nextGame && nextGame.slice(0, nextMatchLimit).map((game, key) => {
                                return <div className="container-matches" key={key}>
                                    <div className="matches">
                                        <div className="d-flex j-center">
                                            <div className="club-left mx-1 text-center" style={{ textAlign: '-webkit-center', width: 'min-content' }}>
                                                <div className="logo" style={{ maxWidth: "65px" }} onClick={() => props.history.push(`/club-info/${game.homeTeam_id}`)}><img src={game.home_logo} alt="" style={{ maxWidth: "50px" }} /></div>
                                                <h5 className="mb-0" style={{ width: '60px',fontSize: '11px' }}>{game.homeTeam_name}</h5>
                                            </div>
                                            <div className="mid mx-2 d-flex flex-column my-auto">
                                                <div className="d-flex j-center h-max-c border radius-1 px-2 py-1" style={{ fontSize: "16pt" }}>
                                                    <span>--</span>
                                                    <span className="mx-2 border-right"></span>
                                                    <span>--</span>
                                                </div>
                                                <span className="my-1">{utcToLocal(game.date_time)}</span>
                                                {/* <Link to={`match/details/${game.match_id}`}></Link> */}
                                                <span className="btn-pill bg-green" onClick={() => props.history.push({
                                                    pathname: `/match/details/${game.match_id}`,
                                                    state: { id:game.match_id }
                                                })}>
                                                    
                                                    
                                                    Coming Soon
                                                    
                                                    </span>
                                                    {/* </Link> */}
                                            </div>
                                            <div className="club-right mx-1 text-center" style={{ textAlign: '-webkit-center', width: 'min-content' }}>
                                                <div className="logo" style={{ maxWidth: "65px" }} onClick={() => props.history.push(`/club-info/${game.awayTeam_id}`)}><img src={game.away_logo} alt="" style={{ maxWidth: "50px" }} /></div>
                                                <h5 className="mb-0" style={{ width: '60px',fontSize: '11px' }}>{game.awayTeam_name}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            })}
                        </>
                        :
                        <>
                            <div className="tag bg-purple d-flex text-white">
                                <span className="mr-auto">Next Game</span>
                            </div>
                            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                                <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                            </div>
                        </>
                    }

                </>
            }






        </div>
    )
}
export default withRouter(LeagueInfo);

const utcToLocal = dateTime => {
    const stillUtc = moment.utc(dateTime).toDate();
    return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
}

