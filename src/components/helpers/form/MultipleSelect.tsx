import * as React from "react";

import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import Select from "@material-ui/core/Select";
import { IOption } from "./shared/form.interface";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles = (value: string, options: IOption[], theme: Theme) => {
  return {
    fontWeight:
      options.findIndex((o) => o.value === value) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

interface Props {
  title: string;
  options: IOption[];
}

export const MultipleSelect = ({ title, options }: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-name-label">{title}</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {options.map(({ label, value }) => (
            <MenuItem
              key={value}
              value={value}
              style={getStyles(value, options, theme)}
            >
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default MultipleSelect;
