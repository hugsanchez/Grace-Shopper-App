import React, { Component } from "react";

// Redux Imports
import { connect } from "react-redux";
import { getAllUsers } from "../../store/actionCreators/allUsers";

class AdminUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: [],
        };
    }

    async componentDidMount() {
        await this.props.loadAllUsers();
        this.setState({
            ...this.state,
            loading: false,
            users: this.props.allUsers,
        });
    }

    render() {
        const { loading, users } = this.state;
        if (loading) {
            return <React.Fragment>Loading...</React.Fragment>;
        }
        return (
            <React.Fragment>
                {users.map((user) => (
                    <div key={user.id}>
                        {user.firstName}&nbsp;{user.lastName}
                    </div>
                ))}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        allUsers: state.allUsers,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadAllUsers: () => dispatch(getAllUsers()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
