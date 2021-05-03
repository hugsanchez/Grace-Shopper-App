import React, { Component } from "react";

// React Router Imports
import { NavLink } from "react-router-dom";

// Redux Imports
import { connect } from "react-redux";
import { getAllUsers } from "../../store/actionCreators/allUsers";
import { updateUserThunk } from "../../store/actionCreators/singleUser";

// Style Imports
import "../../../public/assets/admin.css";

// Component Imports
import UserDialogue from "./UserDialogue.jsx";

class AdminUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: [],
            dialogueOpen: [],
            dialogueUser: {},
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
            users: this.props.allUsers.sort((a, b) => a.id - b.id),
            dialogueOpen,
        });
    }

    handleOpen(user) {
        const { dialogueOpen } = this.state;
        const newDialogueOpen = dialogueOpen.map((bool, idx) => {
            if (idx + 1 === user.id) {
                return true;
            } else {
                return false;
            }
        });

        this.setState({
            ...this.state,
            dialogueOpen: newDialogueOpen,
            dialogueUser: user,
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

    handleSubmit(firstName, lastName, email, username) {
        const { updateUser } = this.props;
        const { id } = this.props.user;

        updateUser({ id, firstName, lastName, username, email });
        this.handleClose();
    }

    render() {
        const { loading, users, dialogueOpen, dialogueUser } = this.state;

        if (loading) {
            return <React.Fragment>Loading...</React.Fragment>;
        }

        return (
            <div className="primary-screen">
                <header className="user-header">
                    <div className="user-header-container">
                        <NavLink
                            to={`/admin/users`}
                            className="header-link-user"
                            name="users"
                        >
                            Users
                        </NavLink>
                    </div>
                    <div className="user-header-container">
                        <NavLink
                            to={`/admin/inventory`}
                            className="header-link-user"
                            name="inventory"
                        >
                            Inventory
                        </NavLink>
                    </div>
                </header>
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
                            <React.Fragment key={user.id}>
                                <tbody>
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
                                                onClick={() =>
                                                    this.handleOpen(user)
                                                }
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
                            </React.Fragment>
                        ))}
                    </table>
                </div>
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
        updateUser: (user) => dispatch(updateUserThunk(user)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
