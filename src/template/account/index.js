import React, { Component } from 'react';
import imgDefaultAccount from '../../assets/img/acc-default.png';
import { isAuthenticate, getUserDetails } from '../../_helper/authentication';
import { Link, NavLink, withRouter } from 'react-router-dom';
import account from '../../assets/img/sidenav/account.png';
import axios from '../../_config/axios';
import axioss from 'axios';
// import {isChrome,isFirefox,isSafari,isOpera,isEdge,isIE,isYandex,isChromium,isMobileSafari} from 'react-device-detect';
// import {NetInfo, Platform } from "react-native";
const data = {
    Authorization: "Bearer cfe0df30-fd1b-3f91-a3db-fd6c977e093b",
    msisdn: "855969855425",
    msisdnwithprefix: "855",
    operator: "Smart"
}
// const Account = (props) => (
class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: [],
            // userDetails:[],
            // info: [],
            userDetails: [],
            jwt: [],
            isLoading: false
        }
        // subscribeFunction = () => {

        // }

    }
    componentDidMount() {
        // var isMobile = {
        //     Android: function() {
        //         return navigator.userAgent.match(/Android/i);
        //     },
        //     BlackBerry: function() {
        //         return navigator.userAgent.match(/BlackBerry/i);
        //     },
        //     iOS: function() {
        //         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        //     },
        //     Opera: function() {
        //         return navigator.userAgent.match(/Opera Mini/i);
        //     },
        //     Windows: function() {
        //         return navigator.userAgent.match(/IEMobile/i);
        //     },
        //     any: function() {
        //         // alert('hello')
        //         return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        //     }
        // }
        // console.log(isMobile)
        // if(isMobile.any()) {
        //     var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        //     // var conn_type = connection.type;  //conn type is cellular data
        //     alert(JSON.parse(connection))
        // }






        // var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        // console.log(connection)
        // alert('misdn')
        // if (navigator
        //     && navigator.connection
        //     && navigator.connection.type === 'cellular') {

        // if(conn_type==='cellular'){
        axioss.get(`http://headerenrichment.smart.com.kh/api/headerenrichment`)
            .then(res => {
                // alert(JSON.stringify(res))
                this.setState({
                    info: res.data

                })
                
                if (this.state.info.msisdn && this.state.info.msisdn.length >= 1) {
                    const payload = new FormData();
                    payload.append('msisdn', this.state.info.msisdn);
                    axios.post('checkmsisdnHeexist', payload)
                        .then(res => {
                            if (res.data.success === 1) {
                                localStorage.setItem('info', JSON.stringify(this.state.info));
                                // alert('msisdn exist/stored in database')
                                const payload = new FormData();
                                payload.append('msisdn', this.state.info.msisdn);
                                axios.post('smartlogin', payload)
                                    .then(res => {
                                        console.log(res.data.success);
                                        // alert(JSON.stringify(res))
                                        if (res.data.status === 200) {

                                            this.setState({
                                                userDetails: res.data.data.user_details,
                                                jwt: res.data.data.JWT
                                            })
                                            console.log(this.state.userDetails)
                                            console.log(this.state.jwt)

                                            localStorage.setItem('JWT', this.state.jwt);
                                            localStorage.setItem('userDetails', JSON.stringify(this.state.userDetails));
                                            localStorage.setItem('JWTforPopup', this.state.jwt);
                                            localStorage.setItem('userDetailsforPopup', JSON.stringify(this.state.userDetails));
                                            // alert('user details stored')
                                            props.history.push('/profile');
                                        }
                                    })
                            }
                        })
                }
                else{
                    
                }

            }).catch(err => console.log(err));
        // }
        // else{
        //     console.log('not cellular data')
        // }
        // }
        // else{

        // }




    }

    unSubscribe = () => {
        // alert(this.state.userDetails.msisdn+'unsub msisdn in HE')
        console.log('index');
        this.setState({ isLoading: true })
        const payload = new FormData();
        payload.append('msisdn', this.state.userDetails.msisdn)
        axios.post('/unsubscription', payload)
            .then(res => {

                if (res.data.status_member = 'notsubscribed') {
                    console.log('nottttt found');
                    localStorage.clear();
                    window.location.reload();
                }

                this.setState({ isLoading: false })
                console.log(JSON.parse(JSON.stringify(res)))
            })
            .catch(err => {
                console.log(err)
            })
    }





    render() {
        // alert(this.state.userDetails)
        // console.log(this.state.userDetails.status)

        return (
            <React.Fragment>
                {this.state.isLoading &&
                    <div id="modal-payment" className="modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style={{ display: 'block', position: 'fixed' }}>
                        <div className="modal-dialog modal-sm" role="document" style={{ marginTop: "50%" }}>
                            <div className="modal-content w-100" style={{ background: 'white' }}>


                                <div id="otp-flow" className="slide" data-tag="otp-flow" style={{ display: 'block', padding: '27px' }}>
                                    <span class="glyphicon glyphicon-ok" style={{ fontSize: "50px", color: "green" }} aria-hidden="true"></span>
                                    <h5 className="mb-2 w-100">You are successfully unsubscribed</h5>

                                </div>
                            </div>
                        </div>
                    </div>

                }
                <div className="sidenav-header block">

                    {localStorage.getItem('userDetails') &&
                        <Link to='/profile' style={{ padding: 0 }} onClick={this.props.closeSide}>
                            <img src={this.state.userDetails.image} alt="" style={{ borderRadius: '50%', height: '60px' }} />
                            <div className="my-1 text-white" style={{ fontSize: 'small' }}>
                                <>
                                    {/* <span class="d-block">Demo Goaly</span> */}

                                    <span className="d-block">
                                        {this.state.userDetails.msisdn}
                                    </span>
                                </>
                                <span class="d-block" style={{ color: '#fff', fontWeight: '800', textTransform: 'capitalize' }}>
                                        {this.state.userDetails.first_name} {this.state.userDetails.last_name}
                                    </span>
                                <span className="d-block" style={{ color: '#c623d3', fontWeight: '800', textTransform: 'capitalize' }}>
                                    {this.state.userDetails.status}
                                </span>
                            </div>
                        </Link>}
                    {localStorage.getItem('userDetails') &&
                        this.state.userDetails.subscription_status === 'subscribed' &&
                        <button className="btn btn-pill w-75" style={{ color: "black", background: "#ddd" }} onClick={this.unSubscribe}><b>Unsubscribe</b></button>
                    }
                    {localStorage.getItem('userDetails') &&
                        (this.state.userDetails.subscription_status === 'notsubscribed' || this.state.userDetails.status === 'inactive') &&
                        <button className="btn btn-pill btn-success w-75 mt-1" onClick={this.props.onOpen} style={{ backgroundColor: '#A32785', borderColor: '#A32785' }}><b>Subscribe</b></button>
                    }
                    {localStorage.getItem('userDetails') &&
                        this.state.userDetails.subscription_status === '' &&
                        <button className="btn btn-pill btn-success w-75 mt-1" onClick={this.props.onOpen} style={{ backgroundColor: '#A32785', borderColor: '#A32785' }}><b>Subscribe</b></button>
                    }
                    {localStorage.getItem('userDetails') === null &&
                        <>
                            <img src={account} alt="" />

                            <div>
                                <button className="btn btn-pill btn-success w-75 mt-1" onClick={() => { console.log("this is the subscribe button");this.props.onOpen();}} style={{ backgroundColor: '#A32785', borderColor: '#A32785' }}><b>Subscribe</b></button>
                            </div>
                        </>
                    }

                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Account);


{/* <div className="account">
<div className="list-block media-list">
    <ul>
        <li>
            <div className="item-link item-content d-flx">
                <div className="item-media" >
                    {isAuthenticate() ? <img src={getUserDetails().image} style={{
                        height: '40px',
                        width: '52px',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        borderRadius: '50%'
                    }} /> : <img src={imgDefaultAccount} width="80"
                        style={{
                            height: '40px',
                            width: '52px',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            borderRadius: '50%'
                        }} />}
                </div>
                <div className="item-inner">
                    <div className="item-title text-white">{isAuthenticate() ? getUserDetails().first_name + ' ' + getUserDetails().last_name : 'Demo Goaly'}</div> */}
{/* {console.log(localStorage.getItem('info'))} */ }
{/* {localStorage.getItem('info') &&
                        <div>msisdn: {this.state.info.msisdn}</div>
                    }
                </div>
            </div>
        </li>
    </ul>
</div>
</div> */}
// console.log(NetInfo.getConnectionInfo());
        // if(isChrome){
        //     console.log('chrome',isChrome)
        // }
        // else if(isFirefox){
        //     console.log('firefox',isFirefox)
        // }
        // else if(isSafari){
        //     console.log('safari',isSafari)
        // }
        // else if(isOpera){
        //     console.log('Opera',isOpera)
        // }
        // else if(isIE){
        //     console.log('IE',isIE)
        // }
        // else if(isEdge){
        //     console.log('Edge',isEdge)
        // }
        // else if(isYandex){
        //     console.log('Yandex',isYandex)
        // }
        // else if(isChromium){
        //     console.log('Chromium',isChromium)
        // }
        // else if(isMobileSafari){
        //     console.log('MobileSafari',isMobileSafari)
        // }
        // if (data.msisdn.length >= 1) {
            // if (this.state.info.msisdn.length >= 1) {
            //     // localStorage.setItem('info', JSON.stringify(data));
            //     localStorage.setItem('info', JSON.stringify(this.state.info));
            //     const payload = new FormData();
            //     // payload.append('msisdn', data.msisdn);
            //     payload.append('msisdn', this.state.info.msisdnwithprefix);

            // axios.post('smartlogin', payload)
            //     .then(res => {
            //         console.log(res.data.success);
            //         // alert(JSON.stringify(res))
            //         if (res.data.status === 200) {
            //             this.setState({
            //                 userDetails: res.data.data.user_details,
            //                 jwt: res.data.data.JWT
            //             })
            //             console.log(this.state.userDetails)
            //             console.log(this.state.jwt)
            //             localStorage.setItem('JWT', this.state.jwt);
            //             localStorage.setItem('userDetails', JSON.stringify(this.state.userDetails));

            //         }
            //             else if (res.data.status === 400) {
            //                 // alert('user inactive')
            //                 const jwtInactive = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1ODg1ODI4NjAsImp0aSI6Ik16ST0iLCJpc3MiOiJodHRwOlwvXC9zbWFydC5raC5nb2FseS5tb2JpXC8iLCJuYmYiOjE1ODg1ODI4NzAsImV4cCI6MTU4ODU5MDA3MCwiZGF0YSI6W3siaWQiOiIxMTAiLCJlbWFpbCI6bnVsbH1dfQ.Vm_HQYNQnewxiczPx5O-pqyUH6zhddKvCNpV6O0tzXsUM6IsF0Q8V_h48XENYgK-N9NC-7e2sY3aMKDuX9UfTQ"

            //                 const userInactiveInfo = {
            //                     country: "",
            //                     email: null,
            //                     first_name: "",
            //                     gender: "",
            //                     id: "94",
            //                     image: "http://smartcms.goaly.mobi/assets/uploads/profiles/user_no_image.png",
            //                     is_active: "0",
            //                     last_name: "",
            //                     msisdn: this.state.info.msisdnwithprefix,
            //                     phone_no: "",
            //                     status: "inactive",
            //                     subscribe_date: "0000-00-00 00:00:00",
            //                     subscription_status: "",
            //                     subscription_type: ""
            //                 }
            //                 this.setState({
            //                     userDetails: userInactiveInfo,
            //                     jwt: jwtInactive
            //                 })
            //                 localStorage.setItem('JWT', jwtInactive);
            //                 localStorage.setItem('userDetails', JSON.stringify(userInactiveInfo));
            //                 // alert(userInactiveInfo)

            //             }

            //         }).catch(err => console.log(err));

            // }
            // else if (this.state.info.msisdn.length === 0) {
            //     // localStorage.setItem('info', JSON.stringify(this.state.info));
            //     const payload = new FormData();
            //     // payload.append('msisdn', data.msisdn);
            //     payload.append('msisdn', this.state.info.msisdnwithprefix);

            //     axios.post('smartlogin', payload)
            //         .then(res => {
            //             console.log(res.data.success);
            //             // alert(JSON.stringify(res))
            //             if (res.data.status === 200) {
            //                 this.setState({
            //                     userDetails: res.data.data.user_details,
            //                     jwt: res.data.data.JWT
            //                 })
            //                 console.log(this.state.userDetails)
            //                 console.log(this.state.jwt)
            //                 localStorage.setItem('JWT', this.state.jwt);
            //                 localStorage.setItem('userDetails', JSON.stringify(this.state.userDetails));

            //             }
            //             else if (res.data.success === 400) {
            //                 alert('cellular data but no msisdn')
            //                 const jwtInactive = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1ODg1ODI4NjAsImp0aSI6Ik16ST0iLCJpc3MiOiJodHRwOlwvXC9zbWFydC5raC5nb2FseS5tb2JpXC8iLCJuYmYiOjE1ODg1ODI4NzAsImV4cCI6MTU4ODU5MDA3MCwiZGF0YSI6W3siaWQiOiIxMTAiLCJlbWFpbCI6bnVsbH1dfQ.Vm_HQYNQnewxiczPx5O-pqyUH6zhddKvCNpV6O0tzXsUM6IsF0Q8V_h48XENYgK-N9NC-7e2sY3aMKDuX9UfTQ"

            //                 const userInactiveInfo = {
            //                     country: "",
            //                     email: null,
            //                     first_name: "",
            //                     gender: "",
            //                     id: "94",
            //                     image: "http://smartcms.goaly.mobi/assets/uploads/profiles/user_no_image.png",
            //                     is_active: "0",
            //                     last_name: "",
            //                     msisdn: this.state.info.msisdnwithprefix,
            //                     phone_no: "",
            //                     status: "inactive",
            //                     subscribe_date: "0000-00-00 00:00:00",
            //                     subscription_status: "",
            //                     subscription_type: ""
            //                 }

            //             }

            //         }).catch(err => console.log(err));

            // }





        // }
        // else {


        // }