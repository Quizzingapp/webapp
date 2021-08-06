import React, { useState } from 'react'
import { DialogTitle, MenuItem } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem'; 
import ListItemText from '@material-ui/core/ListItemText'; 
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import BugReportRoundedIcon from '@material-ui/icons/BugReportRounded';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const raiseIssueDialog = () => {
    const [issue, setIssue] = React.useState(false);
    const openWriteIssue = () => {
        setIssue(true);
    }
    const closeWriteIssue = () => {
        setIssue(false);
    }
    const initialState = { name: "", email: "", message: "" }
    const [form, setForm] = useState(initialState)
    const updateField = (e) => {
        e.preventDefault()
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const submitForm = (e) => {
        alert("Submit");
        e.preventDefault();
        firebase.collection("issueMessages").add(form),
        setForm(initialState)
        .then(() => {
            alert("Message submitted successfully!");
        })
        .catch((error) => {
            alert(error.message);
        });
    }

    const raiseIssueBody = (
        <form noValidate onSubmit={submitForm}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={form.name}
                onChange={updateField}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={form.email}
                onChange={updateField}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="issue"
                label="Type issue here"
                id="issue"
                autoComplete="issue"
                value={form.issue}
                onChange={updateField}
            />
        </form>
    )

    return (
        <div>
            <MenuItem
                onClick={openWriteIssue}
            >
                <ListItemIcon>
                    <BugReportRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Raise an Issue" />    
            </MenuItem>

            <Dialog open={issue} onClose={closeWriteIssue} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Raise an Issue</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please specify the issue in the below form and click submit.
                        {raiseIssueBody}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeWriteIssue} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" onClick={closeWriteIssue} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default raiseIssueDialog
