import React from "react";
import user from '../images/user.png';
import {Link} from "react-router-dom";
import { useLocation } from 'react-router-dom'
const ContactDetails = (props) => {
    const location = useLocation()
    const { name, email } = location.state.contact
    return (
        <div className="main" style={{marginTop:"45px"}}>
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
                <div className="extra content" style={{margin:"auto"}}>
                <Link to="/">
                    <button className=" ui button blue " > Back to Contact List</button>
                </Link>
            </div>
            </div>
           
        </div>
    );
};

export default ContactDetails;