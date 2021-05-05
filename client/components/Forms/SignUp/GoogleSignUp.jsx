import React, {Component} from 'react';
import { connect } from 'react-redux';


class GoogleSignUp extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <a href='/api/auth/google'>Login with Gooogle</a>
            </div>
        )
    }
}

export default connect()(GoogleSignUp);