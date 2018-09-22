import * as React from "react";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

interface State {
    inititatives: Map<string, number>;
}

class NewRoundForm extends React.Component<any, State> {
    constructor(props) {
        super(props);
        this.state = this.initialState();
    };

    initialState = () => {
        return {
            inititatives: new Map(),
        };
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.combatants !== this.props.combatants){
            const players = this.props.combatants.filter(function(combatant){
                return combatant.npc != true;
            });

            players.map( player => {
                const stringId = player.id.toString();
                this.state.inititatives.set(stringId, null);
            });
        }
    }

    handleChange = (event) => {
        let inititatives = this.state.inititatives;
        inititatives.set(event.target.name, event.target.value);
        this.setState({inititatives: inititatives});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        // trigger a new round
        this.props.newRound(this.state.inititatives);
        // reset the state
        this.setState(this.initialState);
        // close the dialog
        this.props.handleClose(event);
    };

    render() {
        const players = this.props.combatants.filter(function(combatant){
            return combatant.npc != true;
        });
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                >
                    <DialogTitle id="form-dialog-title">Enter new player initiative rolls</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please have the players roll new initiatives and enter them below. On Submitting npcs will automatically re-roll initiative.
                        </DialogContentText>
                        {
                            players.map( player => {
                                const stringId = player.id.toString();
                                return <TextValidator
                                    label={player.name}
                                    name={stringId}
                                    type="text"
                                    margin="dense"
                                    fullWidth
                                    onChange={this.handleChange}
                                    value={this.state.inititatives.get(stringId)}
                                    validators={['required', 'isNumber', 'isPositive']}
                                    errorMessages={['this field is required', 'Invalid Number', 'Number must be positive']}
                                />
                            })
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" color="primary">
                            Submit
                        </Button>
                        <Button onClick={this.props.handleClose} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        );
    }
}
export default NewRoundForm;