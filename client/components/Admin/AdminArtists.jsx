import React, { Component } from "react";

// React Router Imports
import { NavLink } from "react-router-dom";

// Redux Imports
import { connect } from "react-redux";
import {
    getArtists_thunk,
    updateArtist_thunk,
} from "../../store/actionCreators/artists";

// Style Imports
import "../../../public/assets/admin.css";

// Component Imports
import ArtistDialog from "./dialogs/ArtistDialog.jsx";

class AdminArtists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            artists: [],
            dialogueOpen: [],
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        await this.props.loadAllArtists();
        const { allArtists } = this.props;

        let dialogueOpen = [];
        for (let i = 0; i < allArtists.length; i++) {
            dialogueOpen.push(false);
        }

        this.setState({
            ...this.state,
            loading: false,
            artists: allArtists.sort((a, b) => a.id - b.id),
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
        const { artists } = this.state;
        let dialogueOpen = [];
        for (let i = 0; i < users.length; i++) {
            dialogueOpen.push(false);
        }

        this.setState({
            ...this.state,
            dialogueOpen,
        });
    }

    async handleSubmit(id, name) {
        const { updateArtist } = this.props;

        await updateArtist({
            id,
            name,
        });

        const { allArtists } = this.props;

        this.setState({
            ...this.state,
            artists: allArtists.sort((a, b) => a.id - b.id),
        });

        this.handleClose();
    }

    render() {
        const { loading, artists, dialogueOpen } = this.state;

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
                    {artists.map((artist) => (
                        <tbody key={artist.id}>
                            <tr>
                                <td>{artist.id}</td>
                                <td>
                                    {artist.name}
                                    <ArtistDialog
                                        open={dialogueOpen[artist.id - 1]}
                                        close={this.handleClose}
                                        submit={this.handleSubmit}
                                        {...artist}
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
        allArtists: state.allArtists,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadAllArtists: () => dispatch(getArtists_thunk()),
        updateArtist: (artist) => dispatch(updateArtist_thunk(artist)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminArtists);
