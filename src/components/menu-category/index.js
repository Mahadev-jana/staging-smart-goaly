import React, { Fragment, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import classnames from 'classnames';
import { includes } from 'lodash';
import { Link } from 'react-router-dom';
import contest from '../../assets/icon/contest.png';
import pinkwin from '../../assets/icon/pinkwin.png';
import './index.css';
import homeImg from '../../assetsStaging/img/menu-grey-home.png';
import contestImg from '../../assetsStaging/img/menu-grey-contest.png';
import matchesImg from '../../assetsStaging/img/menu-grey-match.png';
import leaguesImg from '../../assetsStaging/img/menu-grey-league.png';
import newsImg from '../../assetsStaging/img/menu-grey-news.png';

import homeImgActive from '../../assetsStaging/img/menu-home.png';
import contestImgActive from '../../assetsStaging/img/menu-contest.png';
import matchesImgActive from '../../assetsStaging/img/menu-match.png';
import leaguesImgActive from '../../assetsStaging/img/menu-league.png';
import newsImgActive from '../../assetsStaging/img/menu-news.png';

import { LazyLoadImage } from "react-lazy-load-image-component";

const activeTab = {
    '/': 'HOME',
    '/contest': 'CONTEST',
    '/matches': 'MATCHES',
    '/league-list': 'LEAGUELIST',
    '/news': 'NEWS'
};


const MenuCategory = () => {
    const language = { "en": "English", "id": "Indonesia", "ms": "Malaysia", "nl": "Deutch", 'km': 'Khmer' };
    useEffect(() => {
        language[selectedLanguage()]
    })
    //console.log(language[selectedLanguage()] )
    let divStyle = {}
    if (language[selectedLanguage()] === "Malaysia") {
        divStyle = {
            fontSize: '12px',
        }
    }
    if (language[selectedLanguage()] === "Deutch") {
        divStyle = {
            fontSize: '13px',
        }
    }
    return (
        <div className="block bg-grey row" style={{ background: '#c9c3c396' }}>
            <div className="topmenu"
                style={divStyle}
            >
                <div className="topmenu-link col-xs-3" style={{ width: "20%" }}>
                    <Link to="/" >
                        {activeTab[window.location.pathname] === 'HOME' ?
                            <img src={homeImgActive} alt="" />
                            :
                            <img src={homeImg} alt="" />
                        }
                    </Link>
                    <span className={activeTab[window.location.pathname] === 'HOME' ? 'text-purple' : 'text-lightgrey'}>Home</span>
                </div>

                <div className="topmenu-link col-xs-3" style={{ width: "20%" }}>
                    <Link to="/contest" >
                        {activeTab[window.location.pathname] === 'CONTEST' ?
                            <img src={contestImgActive} alt="" />
                            :
                            <img src={contestImg} alt="" />
                        }
                    </Link>
                    <span className={activeTab[window.location.pathname] === 'CONTEST' ? 'text-purple' : 'text-lightgrey'}>Contest</span>
                </div>

                <div className="topmenu-link col-xs-3" style={{ width: "20%" }}>
                    <Link to="/matches" >
                        {activeTab[window.location.pathname] === 'MATCHES' ?
                            <LazyLoadImage src={matchesImgActive} alt="" />
                            :
                            <LazyLoadImage src={matchesImg} alt="" />
                        }
                    </Link>
                    <span className={activeTab[window.location.pathname] === 'MATCHES' ? 'text-purple' : 'text-lightgrey'}>Matches</span>
                </div>
                <div className="topmenu-link col-xs-3" style={{ width: "20%" }}>
                    <Link to="/league-list">
                        {activeTab[window.location.pathname] === 'LEAGUELIST' ?
                            <LazyLoadImage src={leaguesImgActive} alt="" />
                            :
                            <LazyLoadImage src={leaguesImg} alt="" />
                        }
                    </Link>
                    <span className={activeTab[window.location.pathname] === 'LEAGUELIST' ? 'text-purple' : 'text-lightgrey'}>League</span>
                </div>
                <div className="topmenu-link col-xs-3" style={{ width: "20%" }}>
                    <Link to="/news">
                        {activeTab[window.location.pathname] === 'NEWS' ?
                            <LazyLoadImage src={newsImgActive} alt="" />
                            :
                            <LazyLoadImage src={newsImg} alt="" />
                        }
                    </Link>
                    <span className={activeTab[window.location.pathname] === 'NEWS' ? 'text-purple' : 'text-lightgrey'}>News</span>
                </div>
            </div>
        </div>
    )

}

export default MenuCategory;
const selectedLanguage = () => {
    var name = 'googtrans';
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2].split('/')[2];
    return 'en';
}