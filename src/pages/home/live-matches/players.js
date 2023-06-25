import React, { Fragment ,useEffect, useState } from 'react';
import field from '../../../assets/img/detail-match/field.png';
import PlayerBasicStats from "./PlayerBasicStats";
import PlayerAdvanceStats from "./PlayerAdvanceStats";

const Players = React.memo(({homeTeamId, awayTeamId,homeTeamName, awayTeamName,playersStats,matchId,loadingPlayerStat }) => {
    //console.log("players");
     console.log('=================='+homeTeamName);
    const [stats, statsTab] = useState('basic');
    const handleTab2 = () => {
    
        statsTab('advance');
    };

    const handleTab1 = () => {
        statsTab('basic');
    };

    return (

        <div className="timeline">
            {playersStats.length==0 && !loadingPlayerStat && <tbody>
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
                        <img src={field} style={{ height: 100, padding: 11 }} />

                        <div><span style={{ fontWeight: 800 }}>NO DATA</span></div>
                            <div>YET FOR THIS MATCH</div>
                    </td>
                </tr>
            </tbody>}
            {loadingPlayerStat &&
            <div>loading....</div>
            }

            <div className="block row">
              <div className="d-flex">
                <a
                  className={
                    stats === "basic"
                      ? "btn btn-lg border btn-purple text-white w-50 mr-1 ml-1"
                      : "btn btn-lg border btn-white w-50 mr-1 ml-1"
                  }
                  onClick={handleTab1}
                >
                  Basic Stats
                </a>
                <a
                  className={
                    stats === "advance"
                      ? "btn btn-lg border btn-purple text-white w-50 mr-1"
                      : "btn btn-lg border btn-white w-50 mr-1"
                  }
                  onClick={handleTab2}
                  
                >
                  Advance Stats
                </a>
              </div>
            </div>


            {stats === "basic" && (

                <PlayerBasicStats playersStats={playersStats} />

            )}

            {stats === "advance" && (

                <PlayerAdvanceStats homeTeamName={homeTeamName} homeTeamId={homeTeamId} awayTeamId={awayTeamId} awayTeamName={awayTeamName} 
                matchId={matchId}/>

            )}
            
        </div>
    )
});

export default Players;