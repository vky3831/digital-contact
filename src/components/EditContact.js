import React from "react";
import { withRouter } from "./WithRouter";

class EditContact extends React.Component {
    constructor(props){
        super(props);
        // this.redirect=this.redirect.bind(this);
        console.log(props);
        
        const {id, name, email } = props.location.state.contact;

        this.state = {
            id,
            name,
            email,
        };
    }

    // redirect = () => {
    //     this.props.navigate('/')
    // }

    update = (e) => {
        e.preventDefault();
        if(this.state.name === "" || this.state.email === ""){
            alert("All the fields are manadatory");
            return;
        }
        this.props.updateContactHandler(this.state);
        this.setState({name:"", email:"", redirect: true});
        this.props.navigate('/')
    }

    render(){
        return (
            <div className="ui main" style={{marginTop:"45px"}}>
                <h2>Edit Contact</h2>
                <form className="ui form" onSubmit={this.update}>
                    <div className="field">
                        <label>Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Name" 
                            value={this.state.name} 
                            onChange={(e) => this.setState({name: e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="Email"
                            value={this.state.email} 
                            onChange={(e) => this.setState({email: e.target.value})}/>
                    </div>
                    <button class="ui button blue">Update</button>
                </form>
            </div>
        );
    };
};

export default withRouter(EditContact);