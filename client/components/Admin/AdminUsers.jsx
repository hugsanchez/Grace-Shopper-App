import React, { Component } from "react";

// React Router Imports
import { NavLink } from "react-router-dom";

// Redux Imports
import { connect } from "react-redux";
import { getAllUsers } from "../../store/actionCreators/allUsers";
import { updateUser_adminAccess } from "../../store/actionCreators/singleUser";

// Style Imports
import "../../../public/assets/admin.css";

// Component Imports
import UserDialogue from "./dialogs/UserDialogue.jsx";

class AdminUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: [],
            dialogueOpen: [],
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        await this.props.loadAllUsers();
        const { allUsers } = this.props;

        let dialogueOpen = [];
        for (let i = 0; i < allUsers.length; i++) {
            dialogueOpen.push(false);
        }

        this.setState({
            ...this.state,
            loading: false,
            users: allUsers.sort((a, b) => a.id - b.id),
            dialogueOpen,
        });
    }

    handleOpen(id) {
        const { dialogueOpen } = this.state;
        const newDialogueOpen = dialogueOpen.map((bool, idx) => {
            if (idx + 1 === id) {
                return true;
            } else {
                return false;
            }
        });

        this.setState({
            ...this.state,
            dialogueOpen: newDialogueOpen,
        });
    }

    handleClose() {
        const { users } = this.state;
        let dialogueOpen = [];
        for (let i = 0; i < users.length; i++) {
            dialogueOpen.push(false);
        }

        this.setState({
            ...this.state,
            dialogueOpen,
        });
    }

    async handleSubmit(id, firstName, lastName, email, username, userType) {
        const { updateUser } = this.props;

        await updateUser({
            id,
            firstName,
            lastName,
            username,
            email,
            userType,
        });

        const { allUsers } = this.props;

        this.setState({
            ...this.state,
            users: allUsers.sort((a, b) => a.id - b.id),
        });

        this.handleClose();
    }

    render() {
        const { loading, users, dialogueOpen } = this.state;

        if (loading) {
            return <React.Fragment>Loading...</React.Fragment>;
        }

        return (
            <div id="admin-view">
                <div id="order-title-container" className="order-item">
                    <h3 id="order-title">User List</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Type</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    {users.map((user) => (
                        <tbody key={user.id}>
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.username}</td>
                                <td>{user.userType}</td>
                                <td className="img-container">
                                    <img
                                        className="edit-img"
                                        src="/images/utils/editUser.png"
                                        alt=""
                                        onClick={() => this.handleOpen(user.id)}
                                    />
                                    <UserDialogue
                                        open={dialogueOpen[user.id - 1]}
                                        close={this.handleClose}
                                        submit={this.handleSubmit}
                                        {...user}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
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
        updateUser: (user) => dispatch(updateUser_adminAccess(user)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
