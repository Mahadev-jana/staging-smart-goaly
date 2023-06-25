import React, { Component } from 'react';
// import logo from '../../assets/img/goaly-logo.png';
// import '../../assets/css/payment.css';
import { relativeTimeThreshold } from 'moment';
import axios from '../../_config/axios'
// import axios from 'axios';
import Loader from '../../simmer-loader/SubmitLoader'

class inactiveMemberPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            cycle:'',
            phone_no:'',
            link:'',
            loading:false
            // freemium:'',
            // mobile_data:'true'
            // weekly:[]
        }

    }
    // componentDidMount() {
       
    //     this.setState({
    //         info: JSON.parse(window.localStorage.getItem('info'))
    //     })
    //     // // let weekly = [];
    //     // let sub = {
    //     //     "phone_no": this.state.phone_no,
    //     //     "cycle": 'weekly',
    //     //     "freemium":0,
    //     //     "mobile_data":true,
    //     // }
    //     // console.log(sub)
    //     // weekly.push(sub);
    //     // console.log(weekly)
        
    //     // window.location=this.state.link
        
        
    //     // console.log(this.state.info)
    // }
    removeLeadingZero = (num) => {
        if (num[0] === '0') {
            if(num.slice(1,4) === '855'){
                return num.slice(1,num.length);
            }
            let number = num.slice(1, num.length);
            return "855" + number;
        }
        else {
            if(num.slice(0,3) === '855'){ return num}
            return "855" + num;
        }
       
       
    }

    weeklySubscribe=()=>{
        this.setState({
            
            loading:true
        })
        localStorage.setItem('msidnByUser', this.props.phone_no);
        const payload = new FormData();
        payload.append('phone_no', this.removeLeadingZero(this.props.phone_no));
        payload.append('cycle', 'weekly');
        payload.append('freemium', 0);
        payload.append('mobile_data', false);
        axios({
            method: 'post',
            url: 'http://staging.cms-smart.goaly.mobi/Api/subscription',
            
            data:payload
          }).then(res => {
              console.log(res.data.location)
              this.setState({
                  loading:false,
                link:res.data.location
              })
              console.log(this.state.link)
            //   window.location=this.state.link;
          }).catch(err => {
            console.log({ err })
        })
        // console.log(this.state.link)
        // console.log(this.state.link)
        // window.location=this.state.link;

    }
    dailySubscribe=()=>{
        this.setState({
            loading:true
        })
        localStorage.setItem('msidnByUser', this.props.phone_no);
        const payload = new FormData();
        payload.append('phone_no',  this.removeLeadingZero(this.props.phone_no));
        payload.append('cycle', 'daily');
        payload.append('freemium', 0);
        payload.append('mobile_data', false);
        axios({
            method: 'post',
            url: 'http://staging.cms-smart.goaly.mobi/Api/subscription',
            
            data:payload
          }).then(res => {
              console.log(res)
              console.log(res.data.location)
              this.setState({
                  loading:false,
                link:res.data.location
              })
              console.log(this.state.link)
            //   window.location=this.state.link;
          }).catch(err => {
            console.log({ err })
        })
        

    }
    render() {
        // console.log('localstorage value stored')
        // const { info } = this.state;
        // console.log(info.phone_no)
        // console.log(this.state.link)
        console.log(this.props.phone_no)
        return (

            <div id="modal-payment" className="modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style={{ display: 'block', position: 'fixed' }}>
                <div className="modal-dialog modal-sm" role="document" style={{ marginTop: "50%" }}>
                    <div className="modal-content w-100" style={{ background: 'white' }}>
                        <div className="modal-header text-center p-1">
                            {/* <img src={logo} width="80px" alt="" /> */}
                        </div>
                        {this.state.loading && <Loader title="Please Wait"/>}
                        <div id="otp-flow" className="slide" data-tag="otp-flow" style={{ display: 'block', padding: '15px' }}>
                            <div className="input-control active" number>
                                <h5 className="mb-2 w-100">Your phoneNo is: <span><b>{this.props.phone_no}</b></span></h5>
                                {/* <div className="d-flex">
                                    <span className="form-control w-max-c mr-1">+62</span>
                                    <input className="form-control" type="text" />
                                    
                                </div> */}
                                <button className="btn btn-success send-number w-100 mt-1" style={{ backgroundColor: "#7cd327" }} 
                                onClick={this.dailySubscribe}
                                ><b>DAILY</b></button>
                                <button className="btn btn-success send-number w-100 mt-1" style={{ backgroundColor: ' rgb(39, 108, 211)' }} 
                                onClick={this.weeklySubscribe}
                                ><b>WEEKLY</b></button>
                                <button className="btn btn-transparent w-100 mt-1" data-dismiss="modal" style={{ color: 'black' }}
                                 onClick={this.props.onClose}
                                 >CANCEL</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }

}
export default inactiveMemberPopup;