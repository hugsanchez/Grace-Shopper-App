import React, { Component } from "react";

// Material UI Imports
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RadioGroup from "@material-ui/core/RadioGroup";

class ProductDialogue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            description: props.description,
            price: props.price,
            year: props.year,
            stock: props.stock,
            imgUrl: props.imgUrl,
        };
        this.handleChange = this.handleChange.bind(this);
        this.reset = this.reset.bind(this);
    }

    handleChange(ev) {
        this.setState({
            ...this.state,
            [ev.target.name]: ev.target.value,
        });
    }

    // Resets our values when you close the form
    reset() {
        const {
            close,
            name,
            description,
            price,
            year,
            stock,
            imgUrl,
        } = this.props;

        close();

        // Reset after the window closes
        setTimeout(() => {
            this.setState({
                name,
                description,
                price,
                year,
                stock,
                imgUrl,
            });
        }, 100);
    }

    render() {
        const { submit, close, open } = this.props;

        const {
            id,
            name,
            description,
            price,
            year,
            stock,
            imgUrl,
        } = this.state;

        return (
            <div>
                <Dialog
                    open={open}
                    onClose={close}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle id="form-dialog-title">
                        Edit Product Details
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            label="Name"
                            type="name"
                            name="name"
                            value={name}
                            fullWidth
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="description"
                            label="Description"
                            type="description"
                            name="description"
                            multiline
                            value={description}
                            fullWidth
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="price"
                            label="Price"
                            type="price"
                            name="price"
                            value={price}
                            fullWidth
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="year"
                            label="Year"
                            type="date"
                            name="year"
                            value={year}
                            fullWidth
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="stock"
                            label="Stock"
                            type="stock"
                            name="stock"
                            value={stock}
                            fullWidth
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="imgUrl"
                            label="Image URL"
                            type="imgUrl"
                            name="imgUrl"
                            value={imgUrl}
                            fullWidth
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.reset} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={() =>
                                submit(
                                    id,
                                    name,
                                    description,
                                    price,
                                    year,
                                    stock,
                                    imgUrl,
                                )
                            }
                            color="primary"
                        >
                            Save Changes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ProductDialogue;
