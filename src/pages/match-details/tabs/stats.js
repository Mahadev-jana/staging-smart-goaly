import React, { Component, Fragment } from 'react';
import Chelsea from '../../../assets/img/Chelsea.svg';
import Manchester from '../../../assets/img/Manchester united.svg';
import field from '../../../assets/img/detail-match/field.png';
import MatchBasicStats from './MatchBasicStats';
import MatchAdvanceStats from './MatchAdvanceStats';
class Stats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            comment: '',
            loading: false,
            stats:'basic'
        }

    }

    handleClick = () => {
        this.setState({ stats: 'advance' });
    }

    handleTab1 = () => {
        this.setState({ stats: 'basic' });
    }


    render() {
        // console.log((Object.keys(this.props.playersStats).length))
        return (
            <>
            <div className="block row">
              <div className="d-flex">
                <a
                  className={
                    this.state.stats === "basic"
                      ? "btn btn-lg border btn-purple text-white w-50 mr-1 ml-1"
                      : "btn btn-lg border btn-white w-50 mr-1 ml-1"
                  }
                  onClick={this.handleTab1}
                >
                  Basic Stats
                </a>
                <a
                  className={
                    this.state.stats === "advance"
                      ? "btn btn-lg border btn-purple text-white w-50 mr-1"
                      : "btn btn-lg border btn-white w-50 mr-1"
                  }
                  
                  onClick={this.handleClick}
                >
                  Advance Stats
                </a>
              </div>
            </div>

            {this.state.stats === "basic" && (

                <MatchBasicStats playersStats={this.props.playersStats} advanceStat={this.props.advancesStat} homeTeamLogo={this.props.homeTeamLogo}  awayTeamLogo={this.props.awayTeamLogo}/>

            )}

            {this.state.stats === "advance" && (

                <MatchAdvanceStats  advanceStat={this.props.advancesStat} homeTeamLogo={this.props.homeTeamLogo}  awayTeamLogo={this.props.awayTeamLogo}/>

            )}




            </>

            


            

        );
    }
};

export default Stats;
