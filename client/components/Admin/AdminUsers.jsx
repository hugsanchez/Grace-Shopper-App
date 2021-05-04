import React, { Component } from "react";

// React Router Imports
import { NavLink } from "react-router-dom";

// Material UI Imports
import Button from "@material-ui/core/Button";

// Redux Imports
import { connect } from "react-redux";
import { getAllUsers } from "../../store/actionCreators/allUsers";
import { updateUser_adminAccess } from "../../store/actionCreators/singleUser";
import { adminAddUser } from "../../store/actionCreators/allUsers";

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
            newUserDialog: false,
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpenPost = this.handleOpenPost.bind(this);
        this.handleClosePost = this.handleClosePost.bind(this);
        this.handleSubmitPost = this.handleSubmitPost.bind(this);
    }

    async componentDidMount() {
        await this.props.loadAllUsers();
        const { allUsers } = this.props;

        let dialogueOpen = [];
        for (let i = 0; i < allUsers.length; i++) {
            dialogueOpen.push({ active: false, userId: allUsers[i].id });
        }

        this.setState({
            ...this.state,
            loading: false,
            users: allUsers.sort((a, b) => a.id - b.id),
            dialogueOpen,
        });
    }

    handleOpenPost() {
        this.setState({
            ...this.state,
            newUserDialog: true,
        });
    }

    handleClosePost() {
        this.setState({
            ...this.state,
            newUserDialog: false,
        });
    }

    async handleSubmitPost(id, firstName, lastName, email, username, userType) {
        const { addUser } = this.props;

        await addUser({
            firstName,
            lastName,
            username,
            email,
            userType,
        });

        const { allUsers } = this.props;

        const dialogueOpen = [];
        for (let i = 0; i < allUsers.length; i++) {
            dialogueOpen.push({ active: false, userId: allUsers[i].id });
        }

        this.setState(
            {
                ...this.state,
                users: allUsers.sort((a, b) => a.id - b.id),
                dialogueOpen,
            },
            () => {
                this.handleClosePost();
            },
        );
    }

    handleOpen(id) {
        const { dialogueOpen } = this.state;
        const newDialogueOpen = dialogueOpen.map((obj) => {
            if (obj.userId === id) {
                return { active: true, userId: obj.userId };
            } else {
                return { active: false, userId: obj.userId };
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
            dialogueOpen.push({ active: false, userId: users[i].id });
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

        this.setState(
            {
                ...this.state,
                users: allUsers.sort((a, b) => a.id - b.id),
            },
            () => {
                this.handleClose();
            },
        );
    }

    render() {
        console.log(this.props);
        const { loading, users, dialogueOpen, newUserDialog } = this.state;

        if (loading) {
            return <React.Fragment>Loading...</React.Fragment>;
        }

        return (
            <div id="admin-view">
                <div id="order-title-container" className="order-item">
                    <h3 id="order-title">User List</h3>
                </div>
                <UserDialogue
                    open={newUserDialog}
                    close={this.handleClosePost}
                    submit={this.handleSubmitPost}
                    {...{
                        firstName: "",
                        lastName: "",
                        email: "",
                        username: "",
                        userType: "",
                    }}
                    title="Create New User"
                />
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.handleOpenPost}
                >
                    Create New User
                </Button>
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
                    {users.map((user, idx) => {
                        const dialog = dialogueOpen.filter(
                            (obj) => obj.userId === user.id,
                        )[0].active;
                        return (
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
                                            onClick={() =>
                                                this.handleOpen(user.id)
                                            }
                                        />
                                        <UserDialogue
                                            open={dialog}
                                            close={this.handleClose}
                                            submit={this.handleSubmit}
                                            {...user}
                                            title="Edit User Profile"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
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
        addUser: (user) => dispatch(adminAddUser(user)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
