import React, { useState, useEffect, Suspense } from "react";
import classNames from "classnames";
import { Link, NavLink } from "react-router-dom";
import { isAuthenticate, getUserDetails } from "../../_helper/authentication";
import Modal from "react-responsive-modal";
import OtherDataPopUup from "./sidebarOtherDataPopUp";
// import AccountUpdateUser from '../account/account';
// import CellularWithMsisdnDataPopUp from "./sidebarCellularMsisdnPopUp";
// import NonCellularDataPopUup from "./sidebarNonCellularDataPopUp";
import "./sidebar.scss";
// import Account from "../account/account";
import Subscribe from "../../components/subscibe";
// import leaderboard from  '../../assets/icon/icon-1.png';
// import reward from  '../../assets/icon/icon-2.png';
import AccountImg from "../../assetsStaging/img/account.svg";
import contest from "../../assetsStaging/img/sidenav/contest.png";
import reward from "../../assetsStaging/img/sidenav/reward.png";
import leaderboard from "../../assetsStaging/img/sidenav/leaderboard.png";
import winners from "../../assetsStaging/img/sidenav/winners.png";
import Language from "../../assetsStaging/img/sidenav/language.png";
import faq from "../../assetsStaging/img/sidenav/faq.png";
import logout from "../../assetsStaging/img/sidenav/logout.png";
import privacypolicy from "../../assetsStaging/img/sidenav/privacypolicy.png";
import term from "../../assetsStaging/img/sidenav/term.png";
import enter from "../../assetsStaging/img/sidenav/enter.png";
import "./Sidebar.css";
import axios from '../../_config/axios';
import account from "../account";
// import Account from "../account/account"

const Account = React.lazy(() => import('../account/account'));
const NonCellularDataPopUup = React.lazy(() => import('./sidebarNonCellularDataPopUp'));
const CellularWithMsisdnDataPopUp = React.lazy(() => import('./sidebarCellularMsisdnPopUp'));
const AccountUpdateUser = React.lazy(() => import('../account/account'));
import { LazyLoadImage } from "react-lazy-load-image-component";


const Sidebar = ({ open, closeSideBar }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [info, setInfo] = useState({});
  const [msg1, setMsg1] = useState("true");
  const [msg2, setMsg2] = useState("false");
  const [useDetails, setUserDetails] = useState({});
  const [jwt, setJwt] = useState([]);
  const [updateLogin, setUpdateLogin] = useState(false);

  const language = {
    en: "English",
    id: "Indonesia",
    ms: "Malaysia",
    nl: "Deutch",
    km: "Khmer",
  };
  const logOut = () => {
    //console.log('logoutt')
    localStorage.removeItem("userDetails");
    localStorage.removeItem("JWT");
    // localStorage.removeItem('userDetailsforPopup');
  };

  const redirectToSportLocker = () => {
    window.location.assign("https://goaly.sportlocker.com/");
  };

  const onOpenModal = () => {
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem("userDetails") !== null) {
      // const msisdnExist = localStorage.getItem("msidnByUser");

      // // alert( msisdnExist)
      // const payload = new FormData();
      // payload.append("msisdn", msisdnExist);
      // axios
      //   .post("http://smartcms.goaly.mobi/api/smartlogin", payload)
      //   .then((res) => {
      //     console.log(res);
      //     //   this.setState({
      //     //   loading:false,

      //     setUserDetails(res.data.data.user_details),
      //       setJwt(res.data.data.JWT),
      //       //   })

      //       localStorage.setItem("JWT", this.state.jwt);
      //     localStorage.setItem(
      //       "userDetails",
      //       JSON.stringify(this.state.userDetails)
      //     );

      //   this.setState({
      setUpdateLogin(true);
      //   })
      //   console.log('updatelogin')
      // })
      // .catch((err) => console.log(err));
    }
  }, []);
  //console.log(isAuthenticate())
  // console.log(localStorage.getItem());
  return (
    <>
      <Suspense fallback={<div style={{color: "green",textAlign:"center" }}>Loading...</div>}>
        {localStorage.getItem("info") === null ? (
          <Modal open={modalOpen} onClose={onCloseModal} center>
            <NonCellularDataPopUup onClose={onCloseModal} msg={msg1} />
          </Modal>
        ) : (
          <Modal open={modalOpen} onClose={onCloseModal} center>
            <CellularWithMsisdnDataPopUp onClose={onCloseModal} />
          </Modal>
        )}
      </Suspense>
      {/* <Subscribe show={show} handleClose={this.handleClose}/> */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: 1000,
          }}
          onClick={closeSideBar}
        ></div>
      )}
      <nav
        className={classNames("sideNav", "bgImg2", { open: open })}
        style={{ overflow: "hidden" }}
      >
        <div /*className="wrapper" style={{backgroundColor:'purple'}}*/>
          <div id="sidenavmenu" style={{ display: "block" }}>
            <div
              className="sidenav"
              style={{
                backgroundColor: "#0f7b30",
                width: "300px",
                height: "100%",
                overflowX: "hidden",
                paddingTop: 0,
                textAlign: "initial",
              }}
            >
              {/* <div className="sidenav-header block">
								<img src={isAuthenticate() === true ? getUserDetails().image : AccountImg } alt="" />
								{isAuthenticate() === true ?
									<div className="my-1 text-white">
										<span className="d-block">{getUserDetails().first_name}</span>
										<span className="d-block">{getUserDetails().phone_no}</span>
									</div>
									:
									<div className="my-1 text-white">
										{/* <span className="d-block">Demo Goaly</span> */}
              {/* <span className="d-block">08129545XXXX</span> */}
              {/* </div>
								} */}

              {/* <button className="btn btn-pill btn-success w-75 mt-1" style={{ background:"#a32785"}}><b>Subscibe</b></button> */}
              {/* </div> */}

              <Suspense fallback={<div style={{color: "green",textAlign:"center" }}>Loading...</div>}>
                {updateLogin === true ? (
                  <AccountUpdateUser
                    onOpen={onOpenModal}
                    closeSide={closeSideBar}
                    // msisdn={msisdn}
                    msg={msg1}
                  />

                ) : (
                  <Account
                    onOpen={onOpenModal}
                    closeSide={closeSideBar}
                    // msisdn={msisdn}
                    msg={msg2}
                  />

                )}
              </Suspense>
              <ul className="my-2">
                {!isAuthenticate() ? (
                  <li>
                    <NavLink to="/login" onClick={closeSideBar}>
                      <LazyLoadImage src={enter} alt="" />
                      Login
                    </NavLink>
                  </li>
                ) : (
                  ""

                )}
                <li>
                  <NavLink to="/contest" onClick={closeSideBar}>
                    <LazyLoadImage src={contest} alt="" />
                     Contest
                  </NavLink>
                </li>

                {/* <li>
                  <NavLink to="/reward" onClick={closeSideBar}>
                    <img src={reward} alt="" /> Rewards
                  </NavLink>
                </li> */}
                <li>
                  <NavLink to="/leaderboard" onClick={closeSideBar}>
                    <LazyLoadImage src={leaderboard} alt="" />
                    Leaderboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/winner" onClick={closeSideBar}>
                    <LazyLoadImage src={winners} alt="" />
                    Winners
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/language" onClick={closeSideBar}>
                    <LazyLoadImage src={Language} alt="" />
                     Language{" "}
                    <span id="language">{language[selectedLanguage()]}</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/faq" onClick={closeSideBar}>
                    <LazyLoadImage src={faq} alt="" />
                     FAQ
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/privacy" onClick={closeSideBar}>
                    <LazyLoadImage src={privacypolicy} alt="" />
                    Privacy policy
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/service" onClick={closeSideBar}>
                    <LazyLoadImage src={term} alt="" />
                    Terms of Service
                  </NavLink>
                </li>
                {isAuthenticate() ? (
                  <li>
                    <NavLink to="" onClick={logOut}>
                      <LazyLoadImage src={logout} alt="" />
                       Logout
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
                {/* <li><NavLink to="/login" onClick={closeSideBar}>New Login</NavLink></li> */}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;

const selectedLanguage = () => {
  var name = "googtrans";
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2].split("/")[2];
  return "en";
};

{
  /* <div className="notop bg-main">
        <Link to='/profile' onClick={closeSideBar}><Account /></Link>
          <div className="list-block mt-15">
            <div className="list-group">
              <nav>
                <div className="list-block">
                  <ul>
                    <li className="divider" style={{ marginBottom: '6px' }}>Menu</li>
                    <li>
                      {isAuthenticate() ?
                        <NavLink exact to='/' className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
                          <div className="item-media"><i className="fa fa-home"></i></div>
                          <div className="item-inner">
                            <div className="item-title">Home</div>
                          </div>
                        </NavLink>
                        :
                        <NavLink to='/login' className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
                          <div className="item-media"><i className="fa fa-sign-in"></i></div>
                          <div className="item-inner">
                            <div className="item-title">Login </div>
                          </div>
                        </NavLink>
                      }
                    </li>
                    <li>
                      <NavLink to="/contest" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
                        <div className="item-media"><i className="fa fa-bookmark"></i></div>
                        <div className="item-inner">
                          <div className="item-title">Contest</div>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/reward" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
                        <div className="item-media">
                          <img src={reward} style={{height:15}}/>

                          </div>
                        <div className="item-inner">
                          <div className="item-title">Rewards </div>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/leaderboard" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
                        <div className="item-media">
                          <img src={leaderboard} style={{height:15}}/>
                          </div>
                        <div className="item-inner">
                          <div className="item-title">Leaderboard</div>
                        </div>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/winner" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
                        <div className="item-media"><i className="fa fa-trophy"></i></div>
                        <div className="item-inner">
                          <div className="item-title">Winners</div>
                        </div>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/language" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
                        <div className="item-media">
                          <i className="fa fa-globe"></i>
                        </div>
                        <div className="item-inner">
                          <div className="item-title">Language</div>
                          <div className="item-after">{language[selectedLanguage()]}</div>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      {isAuthenticate() &&
                        <Link to='/logout' className="item-link close-panel item-content" onClick={closeSideBar}>
                          <div className="item-media"><i className="fa fa-sign-out"></i></div>
                          <div className="item-inner">
                            <div className="item-title">Logout</div>
                          </div>
                        </Link>}
                    </li>
                    <li className="divider" style={{
                      marginTop: '10px',
                      marginBottom: '10px'
                    }}></li>
                    <li>
                      <NavLink to="/faq" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
                        <div className="item-media"><i className="fa fa-question-circle"></i></div>
                        <div className="item-inner">
                          <div className="item-title">FAQ</div>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/privacy" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
                        <div className="item-media"><i className="fa fa-question-circle"></i></div>
                        <div className="item-inner">
                          <div className="item-title">Privacy Policy</div>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/service" className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={closeSideBar}>
                        <div className="item-media"><i className="fa fa-question-circle"></i></div>
                        <div className="item-inner">
                          <div className="item-title">Terms of Service</div>
                        </div>
                      </NavLink>
                    </li>
                    <li className="divider" style={{
                      marginTop: '10px',
                      marginBottom: '10px'
                    }}></li>
                    <li>
                      <a className="item-link close-panel item-content" activeclassname="active-side-bar" onClick={() => true}>
                        <div className="item-media"><i className="fa fa-question-circle"></i></div>
                        <div className="item-inner">
                          <div className="item-title">Subscribe</div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div> */
}
