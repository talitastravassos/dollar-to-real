import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import styles from "./styles.module.scss";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(2)
    }
  })
);

interface Props {
  fields: any[];
  legend: string;
  selectedOption(option: string): void;
}

export default function RadioButtons({ fields, legend, selectedOption }: Props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  React.useEffect(() => {
    // console.log(value);
    selectedOption(value)
  }, [value]);

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{legend}</FormLabel>
        <RadioGroup
          aria-label="payment"
          name="payment"
          value={value}
          onChange={handleChange}
          style={{ display: "flex", flexDirection: "row" }}
        >
          {fields.map((field: any, index) => {
            return (
              <FormControlLabel
                key={index}
                value={field.value}
                control={<Radio color="primary" />}
                label={field.label}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
