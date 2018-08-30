import React, { Component } from 'react';
import './invite.css';
import { reduxForm, Field, FieldArray } from 'redux-form';
import Input from './input';
import {connect} from 'react-redux';
import {send_email_invites} from '../../actions'

class InviteFriends extends Component {
    renderEmails(props){
        //  console.log(props);
        const{fields} = props;
        const emails = fields.map((name, index) => {
            if(index < 10){
            return(
                <Field key ={name} name={name} label={`Email ${index + 1}`} component={Input} />
            )
        } else {
            return;
        }
            
        })

        return (
            <div>
                {emails}
                <div className="invite-emails" title="Add Recipient" onClick={()=>{fields.push()}}>
                    <button type="button" className="pink-btn">ADD MORE</button>
                </div>
            </div>
        )
    }
    inviteFriends(values){
        console.log(values.emails);
        const array = values.emails;
        for(var i = 0; i < array.length; i++){
            array[i] = "";
        }
        this.props.send_email_invites(values.emails);
    }
    submitForm(values){
        // console.log(this.props);
        
    }
    render(){
        const{handleSubmit, reset} = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.inviteFriends.bind(this))}>
                    <h2 className="invite-friends">INVITE FRIENDS</h2>
                    <FieldArray name="emails" component = {this.renderEmails} />
                    <div style={{textAlign: 'center'}}>
                        <button className="white-btn">SEND INVITE</button>
                    </div>
                </form>
            </div>
        )
    }
}

InviteFriends = reduxForm({
    form: 'invite-friends',
    initialValues: {
        emails: ['']
    }

})(InviteFriends);
export default connect(null, {send_email_invites})(InviteFriends)