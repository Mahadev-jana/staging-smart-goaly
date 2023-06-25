import React, { Fragment ,useEffect, useState } from 'react';
import './MatchAdvanceStats.css';

const MatchAdvanceStats = (props) => {

	const { advanceStat,homeTeamLogo,awayTeamLogo} = props;

	console.log('----------'+JSON.stringify(advanceStat));

	return (
        
        <div>
            {(Object.keys(advanceStat).length)===0 && !props.loadingPlayerStat && <tbody>
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

           {(Object.keys(advanceStat).length)>0 && !props.loadingPlayerStat &&      
		<div class="" id="stats">
            <div className="stats-header">
                <img src={props.homeTeamLogo} alt="" />
                <h4>TEAM ADVANCE STATS</h4>
                <img src={props.awayTeamLogo} alt="" />
            </div>
            <div class="detail-match bg-whitesmoke">
            <div class="detail-match-stats container-fluid">
                    <div class="detail-match-stats-group">
                        <div>
                            <h3><span>Shots</span></h3>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].shots_total}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Total Shots
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {advanceStat[1].shots_total}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].shots_total / (advanceStat[0].shots_total + advanceStat[1].shots_total)) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].shots_ongoal}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Shot on Goals
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {advanceStat[1].shots_ongoal}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].shots_ongoal / (advanceStat[0].shots_ongoal + advanceStat[1].shots_ongoal)) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].shots_blocked}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Blocked Shots
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {advanceStat[1].shots_blocked}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].shots_blocked / (advanceStat[0].shots_blocked + advanceStat[1].shots_blocked)) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].shots_ofgoal}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Shot of Goal
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {advanceStat[1].shots_ofgoal}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].shots_ofgoal / (advanceStat[0].shots_ofgoal + advanceStat[1].shots_ofgoal)) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].shots_insidebox}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Shot Inside Box
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {advanceStat[1].shots_insidebox}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].shots_insidebox / (advanceStat[0].shots_insidebox + advanceStat[1].shots_insidebox)) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].shots_outsidebox}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Shot Outside Box
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {advanceStat[1].shots_outsidebox}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].shots_outsidebox / (advanceStat[0].shots_outsidebox + advanceStat[1].shots_outsidebox)) * 100)}%` }}></div>
                            </div>
                        </div>
                    </div>
    
                    <div class="detail-match-stats-group">
                        <div>
                            <h3><span>Passes</span></h3>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].pass_total}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Total Passess
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {advanceStat[1].pass_total}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].pass_total / (advanceStat[0].pass_total + advanceStat[1].pass_total)) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {Math.round(advanceStat[0].pass_percentage)}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Passess Accurate
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {Math.round(advanceStat[1].pass_percentage)}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${(( Math.round(advanceStat[0].pass_percentage) / ( Math.round(advanceStat[0].pass_percentage) + Math.round(advanceStat[1].pass_percentage))) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].pass_percentage}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Passess Precentage
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {advanceStat[1].pass_percentage}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].pass_percentage / (advanceStat[0].pass_percentage + advanceStat[1].pass_percentage)) * 100)}%` }}></div>
                            </div>
                        </div>
                    </div>
    
                    <div class="detail-match-stats-group">
                        <div>
                            <h3><span>Attacks</span></h3>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].attacks}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Attacks
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {advanceStat[1].attacks}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].attacks / (advanceStat[0].attacks + advanceStat[1].attacks)) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                       {advanceStat[0].attacks_dangerous_attacks} 
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Dangerous Attacks
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {advanceStat[1].attacks_dangerous_attacks}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].attacks_dangerous_attacks / (advanceStat[0].attacks_dangerous_attacks + advanceStat[1].attacks_dangerous_attacks)) * 100)}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div class="detail-match-stats-group">
                        <div>
                            <h3><span>Cards</span></h3>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].redcards}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Red Cards
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {advanceStat[1].redcards}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].redcards / (advanceStat[0].redcards + advanceStat[1].redcards)) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].yellowcards}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Yellow Cards
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {advanceStat[1].yellowcards}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].yellowcards / (advanceStat[0].yellowcards + advanceStat[1].yellowcards)) * 100)}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div class="detail-match-stats-group">
                        <div>
                            <h3><span>Others</span></h3>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].fouls}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Fouls
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {advanceStat[1].fouls}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].fouls / (advanceStat[0].fouls + advanceStat[1].fouls)) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].offsides}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Offsides
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {advanceStat[1].offsides}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].offsides / (advanceStat[0].offsides + advanceStat[1].offsides)) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].possessiontime}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Possession on Time
                                    </div>
                                    <div class="col-xs-3 point-right">
                                         {advanceStat[1].possessiontime}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].possessiontime / (advanceStat[0].possessiontime + advanceStat[1].possessiontime)) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].saves}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Saves
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {advanceStat[1].saves}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].saves / (advanceStat[0].saves + advanceStat[1].saves)) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].substitutions}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Substitution
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {advanceStat[1].substitutions}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].substitutions / (advanceStat[0].substitutions + advanceStat[1].substitutions)) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].goal_kick}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Goal Kicks
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {advanceStat[1].goal_kick}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].goal_kick / (advanceStat[0].goal_kick + advanceStat[1].goal_kick)) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].goal_attempts}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Goal Attemps
                                    </div>
                                    <div class="col-xs-3 point-right">
                                         {advanceStat[1].goal_attempts}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].goal_attempts / (advanceStat[0].goal_attempts + advanceStat[1].goal_attempts)) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].free_kick}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Free Kicks
                                    </div>
                                    <div class="col-xs-3 point-right">
                                         {advanceStat[1].free_kick}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].free_kick / (advanceStat[0].free_kick + advanceStat[1].free_kick)) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].throw_in}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Throw In
                                    </div>
                                    <div class="col-xs-3 point-right">
                                       {advanceStat[1].throw_in}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].throw_in / (advanceStat[0].throw_in + advanceStat[1].throw_in)) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].ball_safe}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Ball Safe
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {advanceStat[1].ball_safe}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].ball_safe / (advanceStat[0].ball_safe + advanceStat[1].ball_safe)) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].penalties}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Penalties
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {advanceStat[1].penalties}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].penalties / (advanceStat[0].penalties + advanceStat[1].penalties)) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div class="detail-match-stats-item">
                            <div class="detail-match-stats-item-point">
                                <div class="row">
                                    <div class="col-xs-3 point-left">
                                        {advanceStat[0].injuries}
                                    </div>
                                    <div class="col-xs-6 point-center">
                                        Injuries
                                    </div>
                                    <div class="col-xs-3 point-right">
                                        {advanceStat[1].injuries}
                                    </div>
                                </div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" style={{ width: `${((advanceStat[0].injuries / (advanceStat[0].injuries + advanceStat[1].injuries)) * 100)}%` }}></div>
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
}
        </div>
           

	)


}
export default MatchAdvanceStats;