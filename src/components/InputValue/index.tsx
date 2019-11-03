import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import styles from './styles.module.scss'

// Input reusable component
interface State {
    value: any;
}

// Props used by component 
interface Props {
    label: string;
    withPrefix: boolean;
    name: string;
    prefix?: string;
    onChange(name: string, value: string): void;
    mask(str: string): any;
}

export default function InputValue({ label, withPrefix, prefix, onChange, mask, name }: Props) {
    const [state, setState] = React.useState<State>({
        value: ''
    });

    React.useEffect(() => {
        // on change state
        onChange(name, state.value)
        // eslint-disable-next-line
    }, [state])

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        // on change setState
        setState({ ...state, [prop]: mask(event.target.value) });
    };

    return (
        <div className={styles.container}>
            <div>
                <FormControl>
                    <InputLabel htmlFor="input-value">{label}</InputLabel>
                    <Input
                        id="input-value"
                        name={name}
                        value={state.value}
                        onChange={handleChange('value')}
                        startAdornment={(withPrefix) ? <InputAdornment position="start">{prefix}</InputAdornment> : ""}
                    />
                </FormControl>
            </div>
        </div>
    );
}
