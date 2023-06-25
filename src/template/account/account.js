import React, { Component } from 'react';
import imgDefaultAccount from '../../assets/img/acc-default.png';
import { isAuthenticate, getUserDetails } from '../../_helper/authentication';
import { Link, NavLink } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import axios from '../../_config/axios';
import account from '../../assets/img/sidenav/account.png';

import { LazyLoadImage } from "react-lazy-load-image-component";

// const Account = (props) => (
class AccountUpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: [],
            isLoading: false
        }

    }


   componentDidMount() {
        if (window.localStorage.getItem('userDetails')) {
            this.setState({
                userDetails: JSON.parse(window.localStorage.getItem('userDetails'))
            })
        }


    }

    unSubscribe = () => {
        console.log(this.state.userDetails.msisdn)
        // alert(this.state.userDetails.msisdn+'msisdn with wifi')
        console.log('acount')
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

        // alert(this.props.msg)
        // const userDetails =(window.localStorage.getItem('userDetails'))      
        const { userDetails } = this.state;
        console.log(userDetails);

        // alert(JSON.stringify(userDetails))
        // console.log(localStorage.getItem('userDetails'))
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
                <div class="sidenav-header block">

                    <Link to='/profile' style={{ padding: 0 }} onClick={this.props.closeSide}>
                        {localStorage.getItem('userDetails') ?

                            <img src={userDetails.image} alt="" style={{ borderRadius: '50%', height: '60px' }} />
                            :
                            // <img src={account} alt="" />
                            <LazyLoadImage src={account} alt="" />

                        }
                        <div class="my-1 text-white" style={{ fontSize: 'small' }}>
                            {/* <span class="d-block">Demo Goaly</span> */}
                            {localStorage.getItem('userDetails') &&
                                <span class="d-block">
                                    {this.state.userDetails.phone_no}

                                </span>
                            }
                            {/* {console.log(localStorage.getItem('userDetails'))} */}
                            {localStorage.getItem('userDetails') &&
                                <div>
                                    <span class="d-block" style={{ color: '#fff', fontWeight: '800', textTransform: 'capitalize' }}>
                                        {this.state.userDetails.first_name} {this.state.userDetails.last_name}
                                    </span>
                                    <span class="d-block" style={{ color: '#c623d3', fontWeight: '800', textTransform: 'capitalize' }}>
                                        {this.state.userDetails.status}
                                    </span>

                                </div>
                            }
                        </div>
                    </Link>
                    {localStorage.getItem('userDetails') &&
                        (userDetails.subscription_status === 'notsubscribed' || userDetails.status == 'inactive') &&
                        <button className="btn btn-pill btn-success w-75 mt-1" onClick={this.props.onOpen} style={{ backgroundColor: '#A32785', borderColor: '#A32785' }}><b>Subscribe</b></button>
                    }
                    {localStorage.getItem('userDetails') && userDetails.subscription_status === 'subscribed' &&
                        <button class="btn btn-pill w-75" style={{ color: "black", background: "#ddd" }} onClick={this.unSubscribe}><b>Unsubscribe</b></button>
                    }
                    {localStorage.getItem('userDetails') == null &&
                        <>

                            {/* <img src={account} alt=""/> */}
                            <div>
                                <button class="btn btn-pill btn-success w-75 mt-1" onClick={this.props.onOpen}><b>Subscribe</b></button>
                            </div>
                        </>
                    }
                    {localStorage.getItem('userDetails') && userDetails.status == 'inactive' &&
                        <>

                            {/* <img src={account} alt=""/> */}
                            {/* <div>
                            <button class="btn btn-pill btn-success w-75 mt-1" onClick={this.props.onOpen}><b>Subscribe</b></button>
                        </div> */}
                        </>
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default AccountUpdateUser;


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