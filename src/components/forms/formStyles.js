import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    height:"450px",
    // justifyContent: "center",
    alignItems: "center"
  },

  button: {
    display: "flex",
    width: "100%",
    margin: theme.spacing(1),
    // justifyContent: "center",
    alignItems: "center"
  }
}));