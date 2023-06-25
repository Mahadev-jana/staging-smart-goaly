import React, { Fragment ,useEffect, useState } from 'react';
import '../../assetsStaging/css/circle.css';
import { LeagueSimmer } from '../../simmer-loader/index';
import noDataImg from '../../assetsStaging/img/no_data_found.png';
import GoalKeeper from './GoalKeeper';
import Attacker from './Attacker';
import Middlefielder from './Middlefielder';
import Defender from './Defender';
import BasicStats from "./BasicStats"
import AdvanceStats from "./AdvanceStats"
const PlayerStats = (props) => {
    //console.log(props)
    const [stats, statsTab] = useState('basic');
    const [openlist, openList] = useState(false);
    const { playerInfo, advanceStats, loading } = props;



    const handleTab2 = () => {
    
        statsTab('advance');
    };

    const handleTab1 = () => {
        statsTab('basic');
    };
    return (
        <Fragment>
            {loading ?
                <LeagueSimmer />
                :

                <>
                    {Object.keys(playerInfo).length === 0 ?
                        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px' }}>
                            <img style={{ height: '200px' }} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1" />
                        </div>
                        :
                        <>

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

                                <BasicStats playerInfo={playerInfo} />

                            )}

                            {stats === "advance" && (

                                <AdvanceStats advanceStatsDetails={advanceStats} />

                            )}
                        </>
                    }

                </>
            }



        </Fragment>

    )
}
export default PlayerStats;