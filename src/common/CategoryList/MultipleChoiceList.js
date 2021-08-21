import "./SingleChoiceList.css";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from "@material-ui/core";
import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: 15,
  },
}));

const MultipleChoiceList = (props) => {
  const classes = useStyles();
  const handleClick = (selectedID) => {
    const listItems = props.listItems;

    listItems.forEach((item) => {
      if (item.id === selectedID) {
        if (item.isSelected == true) {
          item.isSelected = false;
        } else {
          item.isSelected = true;
        }
      }
    });
    props.change(listItems);
  };

  return (
    <div>
      {props.listItems.map((e) => {
        let classList =
          "list-item " +
          (e.isSelected ? "list-item-highlighted" : "list-item-normal");
        let iconClass = e.isSelected
          ? "list-item-highlighted"
          : "list-item-normal";
        return (
          <ListItem
            key={e.id}
            className={classList}
            onClick={() => {
              handleClick(e.id);
            }}
          >
            <ListItemIcon>
              {e.isSelected ? (
                <CheckIcon className={iconClass} />
              ) : (
                <ArrowForwardIosIcon className={iconClass} />
              )}
            </ListItemIcon>
            {/*<ListItemText primary={e.name} />*/}
            <ListItemText
              disableTypography
              primary={
                <Typography className={classes.text}>{e.name}</Typography>
              }
            />
          </ListItem>
        );
      })}
    </div>
  );
};

export default MultipleChoiceList;
