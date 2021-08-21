import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0.5),
      width: "9.5ch",
    },
  },
}));

const ForToComponent = ({ from, to, fromToHandle }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        name="from"
        type="number"
        label="Od"
        variant="outlined"
        value={from}
        onChange={fromToHandle}
        inputProps={{ min: 0 }}
      />
      <TextField
        name="to"
        type="number"
        label="Do"
        variant="outlined"
        value={to}
        onChange={fromToHandle}
      />
    </div>
  );
};

export default ForToComponent;
