
import React, { Suspense } from 'react';
import Sidebar from '../../../components/sidebar';
import { isArray, isEmpty } from 'lodash';
import axios from '../../../_config/axios';
// import NewPrediction from '../NewPrediction';
import { isAuthenticate, getUserDetails } from '../../../_helper/authentication';
import noDataImg from '../../../assetsStaging/img/no_data_found.png';
import prize0 from '../../../assets/img/slider/Contest Page Banner/sportlocker_demo_goaly.jpg';
import prize1 from '../../../assets/img/slider/Contest Page Banner/Football-Avenger-Leaderboard-1-Rev-330.jpg';
import prize2 from '../../../assets/img/slider/Contest Page Banner/Football-Avenger-Leaderboard-2-Rev-330.jpg';
import prize3 from '../../../assets/img/slider/Contest Page Banner/Football-Avenger-Leaderboard-3-Rev-330.jpg';
import prize4 from '../../../assets/img/slider/Contest Page Banner/Football-Avenger-Leaderboard-4-Rev-330.jpg';
import prize5 from '../../../assets/img/slider/Contest Page Banner/Football-Avenger-Leaderboard-5-Rev-330.jpg';
// import NewSubscriberModal from './NewSubscriberModal';
import Slider from './slider';
import './matchTime.css';
import Swal from 'sweetalert2';

const NewPrediction = React.lazy(() => import('../NewPrediction'));
const NewSubscriberModal = React.lazy(() => import('./NewSubscriberModal'));

const sliderData = [
    {
      id: 1,
      url: prize0,
      desc: 'slide1'
  
    },
  ]

class NewMatchTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leagues: "",
            sectedLeague: 'All League',
            leagueId: 0,
            predictions: [],
            sliderData: [],
            slideLoading: false,
            currentDate: '',
            winPoint: [],
            isLoading: false,
            noData: false,
            period: 'weekly',
            openList: false,
            userDetails:[],
            matchList:[],
            // open: false,
            sportLockerLogin () {
                if( isAuthenticate()){
                    if(getUserDetails().subscription_status === "subscribed") {
                        const payload = new FormData();
                        payload.append('mobile', getUserDetails().phone_no);
                        payload.append('password', "");
                        payload.append('password_check', "");
                        payload.append('force', true);
                        axios.post("http://staging.cms-smart.goaly.mobi/StageGoalyApi/sportlock_register",payload)
                        .then(res=>{
                            console.log("sportlocker api is hit");
                            window.location.assign(res.data.data.user.autologin);
                        })
                    }
                    else {
                        Swal.fire({
                            type: 'info',
                            title: 'Please subscribe first to access this page'
                          })
                    }
                }
                else {
                    Swal.fire({
                        type: 'info',
                        title: 'Please Log in first'
                      })
                    //   .then(()=>this.setState({open:true}))
                }

            },

            // closeSideBar () {
            //     document.getElementById('pageOverlay').classList.remove('page-overlay');
            //     this.setState({open: false})
            // }
        }
    }

    componentDidMount() {
        this.setState({userDetails:JSON.parse(localStorage.getItem('userDetailsforPopup'))})
        const payload = new FormData();
        setTimeout(() => {
            this.setState({ sliderData, slideLoading: false });
          });
        payload.append('page', 'live');
        axios.post('api/getleagues', payload).then(res => {
            //console.log(res.data.leagues)
            this.setState({ leagues: res.data.leagues })

        }).catch(err => {
            console.log({ err })
        });
        this.getWeeklyPrediction();
    }
    spreadList = () => {
        //console.log('open listttttt')
        this.setState(prevState => ({
            openList: !prevState.openList
        }))
    }
    getWeeklyPrediction = async () => {
        this.setState({isLoading:true})
        await this.setState({ period: 'weekly', leagueId: 0 })
        //console.log(this.state.period, this.state.leagueId)
        //console.log('week')
        const payLoad = new FormData();
        payLoad.append('type', this.state.period);
        payLoad.append('league_id', this.state.leagueId);
        axios.post('StageGoalyApi/homePrediction ', payLoad).then(res => {
            if (res && res.data.success === 1) {

                if (res.data.prediction_list && isArray(res.data.prediction_list)) {
                    this.setState({
                        predictions: res.data.prediction_list,
                        currentDate: res.data.current_date,
                        winPoint: res.data.win_point,
                        matchList: res.data.matchList,
                        noData: false
                    })

                }
                else {
                    this.setState({
                        predictions: [],
                        currentDate: '',
                        winPoint: [],
                        noData: true
                    })

                }
                // console.log(res.data.prediction_list)
            }
            this.setState({isLoading:false})
        }).catch(err => console.log(err))
    }
    getMonthlyPrediction = async () => {
        this.setState({isLoading:true})
        await this.setState({ period: 'monthly', leagueId: 0 })
        //console.log('month')
        //console.log(this.state.period, this.state.leagueId)
        const payLoad = new FormData();
        payLoad.append('type', this.state.period);
        payLoad.append('league_id', this.state.leagueId);
        axios.post('StageGoalyApi/prediction', payLoad).then(res => {
            if (res && res.data.success === 1) {

                if (res.data.prediction_list && isArray(res.data.prediction_list)) {
                    this.setState({
                        predictions: res.data.prediction_list,
                        currentDate: res.data.current_date,
                        winPoint: res.data.win_point,
                        noData: false
                    })

                }
                else {
                    this.setState({
                        predictions: [],
                        currentDate: '',
                        winPoint: [],
                        noData: true
                    })

                }
                // console.log(res.data.prediction_list)
            }
            this.setState({isLoading:false})
        }).catch(err => console.log(err))
    }
    getQuarterlyPrediction = async () => {
        this.setState({isLoading:true})
        await this.setState({ period: 'quarterly', leagueId: 0 })
        //console.log('quarter')
        //console.log(this.state.period, this.state.leagueId)
        const payLoad = new FormData();
        payLoad.append('type', this.state.period);
        payLoad.append('league_id', this.state.leagueId);
        axios.post('StageGoalyApi/prediction', payLoad).then(res => {
            if (res && res.data.success === 1) {

                if (res.data.prediction_list && isArray(res.data.prediction_list)) {
                    this.setState({
                        predictions: res.data.prediction_list,
                        currentDate: res.data.current_date,
                        winPoint: res.data.win_point,
                        noData: false
                    })

                }
                else {
                    this.setState({
                        predictions: [],
                        currentDate: '',
                        winPoint: [],
                        noData: true
                    })

                }
                // console.log(res.data.prediction_list)
            }
            this.setState({isLoading:false})
        }).catch(err => console.log(err))
    }
    getFilterByLeague = async (id, name) => {
        this.setState({isLoading:true})
        await this.setState({ sectedLeague: name, leagueId: id });
        //console.log(this.state.sectedLeague, this.state.leagueId, this.state.period);
        const payLoad = new FormData();
        payLoad.append('type', this.state.period);
        payLoad.append('league_id', this.state.leagueId);
        axios.post('StageGoalyApi/prediction', payLoad).then(res => {
            if (res && res.data.success === 1) {

                if (res.data.prediction_list && isArray(res.data.prediction_list)) {
                    this.setState({
                        predictions: res.data.prediction_list,
                        currentDate: res.data.current_date,
                        winPoint: res.data.win_point,
                        noData: false
                    })

                }
                else {
                    this.setState({
                        predictions: [],
                        currentDate: '',
                        winPoint: [],
                        noData: true
                    })

                }
                // console.log(res.data.prediction_list)
            }
            this.setState({isLoading:false})
        }).catch(err => console.log(err))
    }
    getFilterByAllLeague = async () => {
        this.setState({isLoading:true})
        await this.setState({ leagueId: 0 });
        console.log(this.state.leagueId, this.state.period);
        const payLoad = new FormData();
        payLoad.append('type', this.state.period);
        payLoad.append('league_id', this.state.leagueId);
        axios.post('StageGoalyApi/prediction', payLoad).then(res => {
            if (res && res.data.success === 1) {

                if (res.data.prediction_list && isArray(res.data.prediction_list)) {
                    this.setState({
                        predictions: res.data.prediction_list,
                        currentDate: res.data.current_date,
                        winPoint: res.data.win_point,
                        noData: false
                    })

                }
                else {
                    this.setState({
                        predictions: [],
                        currentDate: '',
                        winPoint: [],
                        noData: true
                    })

                }
                // console.log(res.data.prediction_list)
            }
            this.setState({isLoading:false})
        }).catch(err => console.log(err))

    }
    render() {
        const {userDetails, openList, period, sectedLeague, leagues, leagueId, predictions, currentDate, winPoint, isLoading, noData, sliderData, slideLoading, matchList} = this.state;
        // const { leagues } = this.props
        // console.log(currentDate)
        return (
            <React.Fragment>
                 <Suspense fallback={<div style={{color: "green",textAlign:"center" }}>Loading...</div>}>
       
     
                {userDetails && userDetails.login_count>=0 && userDetails.checkboxstatus==0 &&
                <NewSubscriberModal/>
                }
                
                
                {!isLoading && noData &&
                <div className="container" style={{display: 'flex',justifyContent: 'center',alignItems: 'center',height:'280px'}}>
                           <img style={{height:'200px'}} src={noDataImg} className="animated bounce infinite" alt="Transparent MDB Logo" id="animated-img1"/>
                </div>
                   
                }
                
               
                 <div id="sliderdata" class="carousel slide bannerslide" data-ride="carousel" style={{ height: 'auto'}} onClick={this.state.sportLockerLogin}>
                    {!slideLoading && <Slider sliderData={this.state.sliderData} />}
                 </div>

                 {/* <Sidebar open={this.state.open} closeSideBar={this.closeSideBar}/> */}
                

                <div>
                <div class="timeline">
                <div class="timeline-header" style={{ marginTop: "11px"}}><h3>Timeline</h3></div>
                <NewPrediction predictions={predictions} currentDate={currentDate} winPoint={winPoint} isLoading={isLoading} matchList={matchList}/>
                </div>
                </div>
                </Suspense>
            </React.Fragment>
        )

    }

}
export default NewMatchTime;