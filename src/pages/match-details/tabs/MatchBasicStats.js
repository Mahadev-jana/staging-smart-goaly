import React, { Fragment ,useEffect, useState } from 'react';

const MatchBasicStats = (props) => {

	const { playersStats,homeTeamLogo,awayTeamLogo} = props;

	return (

		<div>
                {(Object.keys(props.playersStats).length)===0 && !props.loadingPlayerStat && <tbody>
                    <tr>
                        <td colspan="2"
                            style={{
                                fontSize: '25px',
                                color: 'rgb(183, 167, 167)',
                                letterSpacing: '1px',
                                fontWeight: 100,
                                padding: '50px 50px',
                                textAlign: 'center',
                                lineHeight: 1.3
                            }}
                        >
                            {/* <img src={field} style={{ height: 100, padding: 11 }} /> */}

                            <div><span style={{ fontWeight: 800 }}>NO DATA</span></div>
                            <div>YET FOR THIS MATCH</div>
                        </td>
                    </tr>
                </tbody>}
                
                {(Object.keys(props.playersStats).length)>0 && !props.loadingPlayerStat &&


                    <div role="tabpanel" className={props.scrolled ? "tab-pane scrolledHeight" : "tab-pane"} id="stats">
                        <div className="stats-header">
                            <img src={props.homeTeamLogo} alt="" />
                            <h4>TEAM STATS</h4>
                            <img src={props.awayTeamLogo} alt="" />
                        </div>
                        <div className="stats-body">
                            {/* <div class="stats-item">
                                <div class="point-left"
                                    style={{ width: `${((props.playersStats.final_shots[0].shots_goal / (props.playersStats.final_shots[0].shots_goal + props.playersStats.final_shots[1].shots_goal)) * 100)}%` }}
                                >
                                    {props.playersStats.final_shots[0].shots_goal}
                                </div>
                                <div class="point-name">Shots</div>
                                <div class="point-right"
                                    style={{ width: `${((props.playersStats.final_shots[1].shots_goal / (props.playersStats.final_shots[0].shots_goal + props.playersStats.final_shots[1].shots_goal)) * 100)}%` }}
                                >
                                    {props.playersStats.final_shots[1].shots_goal}
                                </div>
                            </div> */}
                            {props.advanceStat[0].shots_ongoal != 0 && props.advanceStat[1].shots_ongoal != 0 && <div className="stats-item">
                                <div className="point-left"
                                    style={{ width: `${((props.advanceStat[0].shots_ongoal / (props.advanceStat[0].shots_ongoal + props.advanceStat[1].shots_ongoal)) * 100)}%` }}
                                >
                                    {props.advanceStat[0].shots_ongoal}
                                </div>
                                <div className="point-name">Shot On Target</div>
                                <div className="point-right"
                                    style={{ width: `${((props.advanceStat[1].shots_ongoal / (props.advanceStat[0].shots_ongoal + props.advanceStat[1].shots_ongoal)) * 100)}%` }}
                                >
                                    {props.advanceStat[1].shots_ongoal}
                                </div>
                            </div>}
                            {props.advanceStat[0].shots_ongoal == 0 && props.advanceStat[1].shots_ongoal == 0 && <div className="stats-item">
                                <div className="point-left"
                                    style={{ width: `50%` }}
                                >
                                    {props.advanceStat[0].shots_ongoal}
                                </div>
                                <div className="point-name">Shot On Target</div>
                                <div className="point-right"
                                    style={{ width: `50%` }}
                                >
                                    {props.advanceStat[1].shots_ongoal}
                                </div>
                            </div>}
                            {props.advanceStat[0].pass_percentage != 0 && props.advanceStat[1].pass_percentage != 0 && <div className="stats-item">
                                <div className="point-left"
                                    style={{ width: `${((Math.round(props.advanceStat[0].pass_percentage) / (Math.round(props.advanceStat[0].pass_percentage) + Math.round(props.advanceStat[1].pass_percentage))) * 100)}%` }}
                                >
                                    {Math.round(props.advanceStat[0].pass_percentage)}%
                                </div>
                                <div className="point-name">Pass accuracy</div>
                                <div className="point-right"
                                    style={{ width: `${((Math.round(props.advanceStat[1].pass_percentage) / (Math.round(props.advanceStat[0].pass_percentage) + Math.round(props.advanceStat[1].pass_percentage))) * 100)}%` }}
                                >
                                    {Math.round(props.advanceStat[1].pass_percentage)}%
                                </div>
                            </div>}
                            {props.advanceStat[0].pass_total != 0 && props.advanceStat[1].pass_total != 0 && <div className="stats-item">
                                <div className="point-left"
                                    style={{ width: `${((props.advanceStat[0].pass_total / (props.advanceStat[0].pass_total + props.advanceStat[1].pass_total)) * 100)}%` }}
                                >
                                    {props.advanceStat[0].pass_total}
                                </div>
                                <div className="point-name">Passes</div>
                                <div className="point-right"
                                    style={{ width: `${((props.advanceStat[1].pass_total / (props.advanceStat[0].pass_total + props.advanceStat[1].pass_total)) * 100)}%` }}
                                >
                                    {props.advanceStat[1].pass_total}
                                </div>
                            </div>}
                            {props.advanceStat[0].possessiontime != 0 && props.advanceStat[1].possessiontime != 0 && <div className="stats-item">
                                <div className="point-left"
                                    style={{ width: `${((props.advanceStat[0].possessiontime / (props.advanceStat[0].possessiontime + props.advanceStat[1].possessiontime)) * 100)}%` }}
                                >
                                    {props.advanceStat[0].possessiontime}
                                </div>
                                <div className="point-name">Possession</div>
                                <div className="point-right"
                                    style={{ width: `${((props.advanceStat[1].possessiontime / (props.advanceStat[0].possessiontime + props.advanceStat[1].possessiontime)) * 100)}%` }}
                                >
                                    {props.advanceStat[1].possessiontime}
                                </div>
                            </div>}
                            {props.advanceStat[0].shots_total !== 0 && props.advanceStat[1].shots_total !== 0 && <div className="stats-item">
                                <div className="point-left"
                                    style={{ width: '50%' }}
                                >
                                    {props.advanceStat[0].shots_total}
                                </div>
                                <div className="point-name">Total Shots</div>
                                <div className="point-right"
                                    style={{ width: '50%' }}
                                >
                                    {props.advanceStat[1].shots_total}
                                </div>
                            </div>}
                            {props.advanceStat[0].shots_total == 0 && props.advanceStat[1].shots_total == 0 && <div className="stats-item">
                                <div className="point-left"
                                    style={{ width: '50%' }}
                                >
                                    {props.advanceStat[0].shots_total}
                                </div>
                                <div className="point-name">Pass accuracy</div>
                                <div className="point-right"
                                    style={{ width: '50%' }}
                                >
                                    {props.advanceStat[1].pass_accurate}
                                </div>
                            </div>}
                            {props.advanceStat[0].pass_total == 0 && props.advanceStat[1].pass_total == 0 && <div className="stats-item">
                                <div className="point-left"
                                    style={{ width: `50%` }}
                                >
                                    {props.advanceStat[0].pass_total}
                                </div>
                                <div className="point-name">Passes</div>
                                <div className="point-right"
                                    style={{ width: `50%` }}
                                >
                                    {props.advanceStat[1].pass_total}
                                </div>
                            </div>}
                            {/* <div className="stats-item">
                                <div className="point-left"
                                    style={{ width: `${((props.playersStats.final_crosses[0].crosses_total / (props.playersStats.final_crosses[0].crosses_total + props.playersStats.final_crosses[1].crosses_total)) * 100)}%` }}
                                >
                                    {props.playersStats.final_crosses[0].crosses_total}
                                </div>
                                <div className="point-name">Crosses</div>
                                <div className="point-right"
                                    style={{ width: `${((props.playersStats.final_crosses[1].crosses_total / (props.playersStats.final_crosses[0].crosses_total + props.playersStats.final_crosses[1].crosses_total)) * 100)}%` }}
                                >
                                    {props.playersStats.final_crosses[1].crosses_total}
                                </div>
                            </div> */}
                            {/* {props.playersStats.final_shots[0].fouls_committed!=0 && props.playersStats.final_shots[1].fouls_committed !=0 &&<div class="stats-item">
                                <div className="point-left" style={{ width: `${((props.playersStats.final_shots[0].fouls_committed / (props.playersStats.final_shots[0].fouls_committed + props.playersStats.final_shots[1].fouls_committed)) * 100)}%` }}>
                                    {props.advanceStat[0].fouls}
                                    </div>
                                <div className="point-name">Fouls</div>
                                <div className="point-right" style={{ width: `${((props.playersStats.final_shots[1].fouls_committed / (props.playersStats.final_shots[0].fouls_committed + props.playersStats.final_shots[1].fouls_committed)) * 100)}%` }}>
                                    {props.advanceStat[1].fouls}
                                    </div>
                            </div>} */}
                            {/* {props.playersStats.final_shots[0].fouls_committed==0 && props.playersStats.final_shots[1].fouls_committed ==0 &&
                            <div className="stats-item">
                                <div className="point-left" style={{ width: '50%' }}>
                                    {props.advanceStat[0].fouls}
                                    </div>
                                <div className="point-name">Fouls</div>
                                <div className="point-right" style={{ width: '50%' }}>
                                    {props.advanceStat[1].fouls}
                                    </div>
                            </div>} */}
                            {/* <div class="stats-item">
                                <div class="point-left"
                                    style={{ width: `${Math.round(((props.stats[0].shots.ongoal / (props.stats[0].shots.ongoal + props.stats[1].shots.ongoal)) * 100))}%` }}
                                >
                                    {props.stats[0].shots.ongoal}</div>
                                <div class="point-name">Shot On Target</div>
                                <div class="point-right"
                                    style={{ width: `${Math.round(((props.stats[1].shots.ongoal / (props.stats[0].shots.ongoal + props.stats[1].shots.ongoal)) * 100))}%` }}
                                >
                                    {props.stats[1].shots.ongoal}</div>
                            </div>
                            <div class="stats-item">
                                <div class="point-left" style={{ width: `${((props.stats[0].possessiontime / (props.stats[0].possessiontime + props.stats[1].possessiontime)) * 100)}%` }}>{props.stats[0].possessiontime}</div>
                                <div class="point-name">Possession</div>
                                <div class="point-right" style={{ width: `${((props.stats[1].possessiontime / (props.stats[0].possessiontime + props.stats[1].possessiontime)) * 100)}%` }}>{props.stats[1].possessiontime}</div>
                            </div>
                            <div class="stats-item">
                                <div class="point-left" style={{ width: `${((props.stats[0].passes.total / (props.stats[0].passes.total + props.stats[1].passes.total)) * 100)}%` }}>{props.stats[0].passes.total}</div>
                                <div class="point-name">Passes</div>
                                <div class="point-right" style={{ width: `${((props.stats[1].passes.total / (props.stats[0].passes.total + props.stats[1].passes.total)) * 100)}%` }}>{props.stats[1].passes.total}</div>
                            </div>
                            <div class="stats-item">
                                <div class="point-left" style={{ width: `${Math.round(((props.stats[0].passes.accurate) / (props.stats[0].passes.total) * 100) / (((props.stats[0].passes.accurate) / (props.stats[0].passes.total) * 100) + ((props.stats[1].passes.accurate) / (props.stats[1].passes.total) * 100)) * 100)}%` }}>{Math.round((props.stats[0].passes.accurate) / (props.stats[0].passes.total) * 100)}</div>
                                <div class="point-name">Pass accuracy</div>
                                <div class="point-right" style={{
                                    width: `${Math.round(
                                        ((props.stats[1].passes.accurate) / (props.stats[1].passes.total) * 100) / (((props.stats[0].passes.accurate) / (props.stats[0].passes.total) * 100) + ((props.stats[1].passes.accurate) / (props.stats[1].passes.total) * 100)) * 100)}%`
                                }}>{Math.round((props.stats[1].passes.accurate) / (props.stats[1].passes.total) * 100)}</div>
                            </div>
                            <div class="stats-item">
                                <div class="point-left" style={{ width: `${((props.stats[0].fouls / (props.stats[0].fouls + props.stats[1].fouls)) * 100)}%` }}>{props.stats[0].fouls}</div>
                                <div class="point-name">Fouls</div>
                                <div class="point-right" style={{ width: `${((props.stats[1].fouls / (props.stats[0].fouls + props.stats[1].fouls)) * 100)}%` }}>{props.stats[1].fouls}</div>
                            </div> */}
                        </div>
                    </div>}
            </div>
	)

}
export default MatchBasicStats;

const homeTeamPercentage = (homeStat, awayStat) => {
    let totalStat = homeStat + awayStat ;
    let percentStat = homeStat/totalStat * 100 ;
    return Math.round(percentStat);
}

const awayTeamPercentage = (homeStat, awayStat) => {
    let totalStat = homeStat + awayStat ;
    let percentStat = awayStat/totalStat * 100 ;
    return Math.round(percentStat);
}