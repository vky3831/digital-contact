import React, {useRef} from "react";
import {Link} from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
    const inputEl = useRef("");
    const deleteContactHandler = (id) => {
        props.getContactId(id);
    }

    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    };

    const renderContactList = props.contacts.map((contact)=>{
        return <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id}></ContactCard>;
    });
    return (
        <div class="main" style={{marginTop:"45px"}}>
            <h2>Contact List
                <Link to="/add">
                    <button className="ui button blue" style={{float:"right", clear:"left"}}>Add Contact</button>
                </Link>
            </h2>
            <div className="ui labeled fluid icon input">
                <div className="ui label">
                    <i className="users icon"></i>
                </div>
                <input ref={inputEl} type="text" placeholder="Search Contacts" className="prompt" value={props.term} onChange={getSearchTerm} />
                <i className="search icon"></i>
            </div>
            <div className="ui celled list">
                {renderContactList.length > 0 ? renderContactList : "No contacts available"}
            </div>    
        </div>
        
    )
}

export default ContactList;