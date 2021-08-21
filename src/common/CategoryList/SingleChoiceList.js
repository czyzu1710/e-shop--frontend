import "./SingleChoiceList.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: 15,
  },
}));

const SingleChoiceList = (props) => {
  const classes = useStyles();
  const handleClick = (selectedID) => {
    const listItems = props.listItems;

    listItems.forEach((item) => {
      if (item.id === selectedID) {
        if (item.isSelected === true) {
          item.isSelected = false;
        } else {
          item.isSelected = true;
        }
      } else {
        item.isSelected = false;
      }
    });
    props.change(listItems);
  };

  return (
    <List>
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
            <ListItemText
              disableTypography
              primary={
                <Typography className={classes.text}>{e.name}</Typography>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default SingleChoiceList;
