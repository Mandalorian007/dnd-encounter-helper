import * as React from "react";

import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

interface State {
    combatant: Map<string, any>;
}

class NewCombatantForm extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = this.initialState();
    };

    initialState = () => {
        let combatant = new Map()
            .set('isNpc', false)
            .set('name', '')
            .set('armourClass', null)
            .set('currentHp', null)
            .set('maxHp', null)
            .set('initiativeBonus', null)
            .set('passivePerception', null)
            .set('comment', '');

        return {
            combatant: combatant,
        };
    };

    handleChange = (event) => {
        let combatant = this.state.combatant;
        combatant.set(event.target.name, event.target.value);
        this.setState({combatant: combatant});
    };

    handleNpcToggle = () => {
        let combatant = this.state.combatant;
        combatant.set('isNpc', !combatant.get('isNpc'));
        this.setState({combatant: combatant});
    };

    handleSubmit = (event) => {
        event.preventDefault();

        let combatant = this.state.combatant;
        combatant.set('currentHp', combatant.get('maxHp'));
        this.props.createCombatant(combatant);

        // reset the state
        this.setState(this.initialState);
        this.props.navigateBack();
    };

    render() {
        const { combatant } = this.state;
        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
            >
                <TextValidator
                    autoFocus
                    label="name"
                    name="name"
                    type="text"
                    margin="normal"
                    fullWidth
                    onChange={this.handleChange}
                    value={combatant.get('name')}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <TextValidator
                    label="armourClass"
                    name="armourClass"
                    type="text"
                    margin="normal"
                    fullWidth
                    onChange={this.handleChange}
                    value={combatant.get('armourClass')}
                    validators={['required', 'isNumber', 'isPositive']}
                    errorMessages={['this field is required', 'Invalid Number', 'Number must be positive']}
                />
                <TextValidator
                    label="maxHp"
                    name="maxHp"
                    type="text"
                    margin="normal"
                    fullWidth
                    onChange={this.handleChange}
                    value={combatant.get('maxHp')}
                    validators={['required', 'isNumber', 'isPositive']}
                    errorMessages={['this field is required', 'Invalid Number', 'Number must be positive']}
                />
                <TextValidator
                    label="initiativeBonus"
                    name="initiativeBonus"
                    type="text"
                    margin="normal"
                    fullWidth
                    onChange={this.handleChange}
                    value={combatant.get('initiativeBonus')}
                    validators={['required', 'isNumber', 'isPositive']}
                    errorMessages={['this field is required', 'Invalid Number', 'Number must be positive']}
                />
                <TextValidator
                    label="passivePerception"
                    name="passivePerception"
                    type="text"
                    margin="normal"
                    fullWidth
                    onChange={this.handleChange}
                    value={combatant.get('passivePerception')}
                    validators={['required', 'isNumber', 'isPositive']}
                    errorMessages={['this field is required', 'Invalid Number', 'Number must be positive']}
                />
                <FormControlLabel
                    control={
                        <Switch
                            name="isNpc"
                            checked={!combatant.get('isNpc')}
                            onChange={this.handleNpcToggle}
                            color="primary"
                        />
                    }
                    label="Player"
                />
                <FormControlLabel
                    control={
                        <Switch
                            name="isNpc"
                            checked={combatant.get('isNpc')}
                            onChange={this.handleNpcToggle}
                        />
                    }
                    label="Npc"
                />
                <TextValidator
                    label="comment"
                    name="comment"
                    type="text"
                    margin="normal"
                    fullWidth
                    onChange={this.handleChange}
                    value={combatant.get('comment')}
                />
                <Button type="submit" color="primary">
                    Submit
                </Button>
            </ValidatorForm>
        )
    }
}
export default NewCombatantForm;