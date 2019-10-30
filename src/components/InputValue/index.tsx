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
  amount: string;
}

interface Props {
    label: string;
    withPrefix: boolean;
    prefix?: string;
}

export default function InputValue({label, withPrefix, prefix}: Props) {
  const classes = useStyles();
  const [state, setState] = React.useState<State>({
    amount: ''
  });

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [prop]: event.target.value });
    console.log(state)
  };

  return (
    <div className={classes.root}>
      <div>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="adornment-amount">{label}</InputLabel>
          <Input
            id="adornment-amount"
            value={state.amount}
            onChange={handleChange('amount')}
            startAdornment={ (withPrefix) ? <InputAdornment position="start">{prefix}</InputAdornment> : "" }
          />
        </FormControl>
      </div>
    </div>
  );
}
