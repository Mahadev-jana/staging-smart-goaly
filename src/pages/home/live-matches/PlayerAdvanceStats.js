import React, { Fragment, useEffect, useState } from 'react';
import field from '../../../assets/img/detail-match/field.png';
import './advance.css';
import axios from '../../../_config/axios';
import { LeagueSimmer } from '../../../simmer-loader/index';
import defaultImg from '../../../assetsStaging/img/default-player.png';

const PlayerAdvanceStats = (props) => {

    const { matchId, homeTeamName, awayTeamName, homeTeamId, awayTeamId } = props;
    const [team, teamTab] = useState(false);
    const [position, positionList] = useState(false);
    const [advanceStatss, setAdvanceStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noDataFound, setnoDataFound] = useState(false);
    const [positions, setPositions] = useState('');
    const [teamid, setTeamid] = useState('');

    useEffect(() => {
        const payload = new FormData();
        payload.append('match_id', matchId);
        payload.append('team_id', teamid);
        payload.append('position', positions);

        axios.post('/StageGoalyApi/matchPlayerDetails', payload)
            .then(res => {

                if (res.data && res.data.success && res.data.error === 0) {
                    setAdvanceStats(res.data);
                    setLoading(false);
                }
                if (res.data && res.data.success === 0 && res.data.error === 1) {
                    setAdvanceStats(false);
                    setnoDataFound(true)
                    setLoading(false);
                }

            })
            .catch(err => {
                console.log(err);
            })

    }, [matchId, positions, teamid])






    return (

        <>
            <div class="py-2 px-2">
                <div class="row">
                    <div class="col-xs-6">
                        <label for="">Team</label>
                        <select name="" id="" class="form-control" name="teamid" onChange={e => setTeamid(e.target.value)} value={teamid}>
                            <option value="">All</option>
                            <option value={homeTeamId}>{homeTeamName}</option>
                            <option value={awayTeamId}>{awayTeamName}</option>
                        </select>
                    </div>
                    <div class="col-xs-6">
                        <label for="">Position</label>
                        <select name="" id="" class="form-control" name="positions" onChange={e => setPositions(e.target.value)} value={positions}>
                            <option value="">All</option>
                            <option value="A">Attacker</option>
                            <option value="M">Midfielder</option>
                            <option value="G">Defender</option>
                            <option value="D">Goalkeeper</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>

                {advanceStatss.match_playerdetails?.map((history, key) => (
                    <div class="detail-match-player">
                        <div class="detail-match-player-head">
                            <div class="row d-flex ais-center">
                                <div class="col-xs-6" style={{ width:"60%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                    <img class="player-club" src={history.team_logo} alt="Img" style={{ width: "20%"}} /> 
                                    <strong style={{ width: "60%"}} >{history.player_name}</strong>
                                    <img class="player-club" style={{ width: "20%"}} src={history.players_logo === "" ? defaultImg : history.players_logo} alt="Img"/>
                                </div>
                                <div class="col-xs-6 text-right">
                                    <span class="mr-2"><i class="icon-time-left"></i>{history.minutes_played}</span> <i class="icon-star"></i>{history.rating}
                                </div>
                            </div>
                        </div>
                        <div class="detail-match-player-body">
                            <div class="row row-no-gutters">
                                <div class="col-xs-6">
                                    <div class="box-item d-flex j-between">
                                        <div class="box-item-point">Goals</div>
                                        <div class="box-item-val">{history.goal}</div>
                                    </div>
                                    <div class="box-item d-flex j-between">
                                        <div class="box-item-point">Assists</div>
                                        <div class="box-item-val">{history.assists}</div>
                                    </div>
                                    <div class="box-item d-flex j-between">
                                        <div class="box-item-point">Dribbles</div>
                                        <div class="box-item-val">{history.dribbles}</div>
                                    </div>
                                    <div class="box-item d-flex j-between">
                                        <div class="box-item-point">Crossess</div>
                                        <div class="box-item-val">{history.crossess}</div>
                                    </div>
                                    <div class="box-item d-flex j-between">
                                        <div class="box-item-point">Goal Save</div>
                                        <div class="box-item-val">{history.goal_save}</div>
                                    </div>
                                </div>
                                <div class="col-xs-6">
                                    <div class="box-item d-flex j-between">
                                        <div class="box-item-point">Fouls</div>
                                        <div class="box-item-val">{history.fouls}</div>
                                    </div>
                                    <div class="box-item d-flex j-between">
                                        <div class="box-item-point">Tackles</div>
                                        <div class="box-item-val">{history.tackles}</div>
                                    </div>
                                    <div class="box-item d-flex j-between">
                                        <div class="box-item-point">Red Card</div>
                                        <div class="box-item-val">{history.red_card}</div>
                                    </div>
                                    <div class="box-item d-flex j-between">
                                        <div class="box-item-point">Yellow Card</div>
                                        <div class="box-item-val">{history.yellow_card}</div>
                                    </div>
                                    <div class="box-item d-flex j-between">
                                        <div class="box-item-point">Duels Won</div>
                                        <div class="box-item-val">{history.duels_won}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}



            </div>
        </>


    )


}
export default PlayerAdvanceStats;