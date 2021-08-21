import React from "react";
import { Box, Typography } from "@material-ui/core";
import ImageService from "../../services/images"
import { useHistory } from "react-router-dom";

const IMAGE_WIDTH=270;
const IMAGE_HEIGHT=350;

export const ProductItem = (props) => {
  const history = useHistory();

  const handleProduct = () => {
    history.push(`/product/${props.id}`);
  };

  return (
    <Box style={{ width: "15vw", height: "40vh" }} onClick={handleProduct}>
      <img
        src={ImageService.getImageWithSpecifiedSize(props.imagesUrls[0], IMAGE_WIDTH, IMAGE_HEIGHT)}
        alt={ImageService.getImageAlt(props.id, props.imagesUrls[0])}
      />
      <Box>
        <Typography>{props.name}</Typography>
        <span
          style={{
            display: "inline-flex",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <Typography>{Number(props.price).toFixed(2)}zł</Typography>
          <Typography>{props.brand.name}</Typography>
        </span>
      </Box>
    </Box>
  );
};
