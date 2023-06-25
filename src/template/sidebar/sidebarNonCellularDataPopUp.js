import React, { Component } from 'react';
// import logo from '../../assets/img/goaly-logo.png';
// import '../../assets/css/payment.css';
import axios from '../../_config/axios'
import { useHistory } from 'react-router-dom';
import InactiveNewMemberPopup from './inactiveAndNewMemberPopup';
import Loader from '../../simmer-loader/SubmitLoader';
import Modal from 'react-responsive-modal';
import { string } from 'prop-types';
class cellularDataPopUup extends Component {
    constructor(props) {
        super(props);
        this.state={
            phone_no:'',
            error:'',
            userDetails:[],
            jwt:[],
            // subscribe:false,
            loading:false,
            open:false
        }

    }
    removeLeadingZero = (num) => {
       if(num[0] === '0') {
        return num.slice(1,num.length);
       }
       else return num;
    }
    checkphone_no=()=>{
        // e.preventDefault();
        // alert('check')
        this.setState({
            loading:true
        })
        if (this.state.phone_no.length===0) {
            this.setState({
                error :'field cannot be empty',
                loading:false
            })
          }
          else{
           
            const payload = new FormData();
            payload.append('phone_no', this.removeLeadingZero(this.state.phone_no));
            axios.post('http://staging.cms-smart.goaly.mobi/api/checkMsisdnStatus', payload)
                .then(res => {
                    console.log(res.data.status);
                    if(res.data.status==='active'){
                        // alert('active member')
                        const payload = new FormData();
                        payload.append('phone_no', this.removeLeadingZero(this.state.phone_no));
                        axios.post('http://staging.cms-smart.goaly.mobi/api/smartlogin', payload)
                            .then(res => {
                                console.log(res);
                                // alert(JSON.stringify(res))
                                this.setState({
                                    loading:false,
                                    userDetails: res.data.data.user_details,
                                    jwt: res.data.data.JWT
                                })
                                localStorage.setItem('msidnByUser',  this.removeLeadingZero(this.state.phone_no));
                                localStorage.setItem('JWT', this.state.jwt);
                                localStorage.setItem('userDetails', JSON.stringify(this.state.userDetails));
                                localStorage.setItem('JWTforPopup', this.state.jwt);
							  localStorage.setItem('userDetailsforPopup', JSON.stringify(this.state.userDetails));
                                window.location.reload();
                            })
                            
                    
                        }
                        if(res.data.status==='inactive'){
                            // alert('inactive')
                            this.onOpenModal();
                            
                            // alert(this.state.subscribe)
                        }
                        if(res.data.status==='new'){
                            // alert('user not exist')
                            this.onOpenModal();
                        }
                })
          }
        //   this.props.history.replace("/")
        // window.location.href='/';
    }
    updateInput =(e) =>{
        // let number= e.target.value
        //  let mobile =number.toString().padStart(11, '855')

        this.setState({
            phone_no: e.target.value
          
        })
        console.log(typeof(this.state.phone_no));
    }
    onOpenModal = () => {
        this.setState({ open: true , loading:false});
        console.log('open')
	};

	onCloseModal = () => {
		this.setState({ open: false });
	};
    render() {
        // alert(this.props.msg)
        // console.log(this.state.phone_no)
        return (
            <div>
            {this.state.open==true ?
            <div>
                <InactiveNewMemberPopup onClose={this.props.onClose} phone_no={this.state.phone_no}/>
            </div>

                
            
            :
            <div id="modal-payment" className="modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style={{ display: 'block', position: 'fixed' }}>
                <div className="modal-dialog modal-sm" role="document" style={{ marginTop: "50%" }}>
                    <div className="modal-content w-100" style={{ background: 'white' }}>
                        <div className="modal-header text-center p-1">
                            {/* <img src={logo} width="80px" alt="" /> */}
                        </div>
                        <div id="otp-flow" className="slide" data-tag="otp-flow" style={{ display: 'block', padding: '15px' }}>
                            <div className="input-control active" number>
                            {this.state.loading && <Loader title="Please Wait"/>}
                                <h5 className="mb-2 w-100">Please insert your phone number</h5>
                                <div className="d-flex">
                                    <span className="form-control w-max-c mr-1">+855</span>
                                    <input className="form-control" type="number" onChange={this.updateInput} />
                                    
                                </div>
                                <div style={{color:'red'}}>{this.state.error}</div>
                                <button className="btn btn-success send-number w-100 mt-1" style={{ backgroundColor: "#0F7B30" }} onClick={this.checkphone_no}><b>SEND</b></button>
                                <button className="btn btn-transparent w-100 mt-1" data-dismiss="modal" style={{ color: 'black' }} onClick={this.props.onClose}>CANCEL</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            
            </div>
            
            
            }
            </div>


        );
    }

}
export default cellularDataPopUup;