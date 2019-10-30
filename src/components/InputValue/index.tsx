import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: 200,
        },
    }),
);

interface State {
    value: any;
}

interface Props {
    label: string;
    withPrefix: boolean;
    name: string;
    prefix?: string;
    onChange(name: string, value: string): void;
    mask(str: string): any;
}

export default function InputValue({ label, withPrefix, prefix, onChange, mask, name }: Props) {
    const classes = useStyles();
    const [state, setState] = React.useState<State>({
        value: ''
    });

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [prop]: event.target.value });
        onChange(name, state.value)
        // console.log(Number(state.value / 100))
    };

    return (
        <div className={classes.root}>
            <div>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-value">{label}</InputLabel>
                    <Input
                        id="input-value"
                        name={name}
                        value={mask(state.value)}
                        onChange={handleChange('value')}
                        startAdornment={(withPrefix) ? <InputAdornment position="start">{prefix}</InputAdornment> : ""}
                    />
                </FormControl>
            </div>
        </div>
    );
}
