import React, {useState} from "react";
import {Carousel} from "react-bootstrap";
import {Box, Dialog, DialogContent, IconButton} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import "./ProductGallery.css";
import ImageService from "../../services/images";

const ImageSizes = {
    THUMBNAIL: {width: 100, height: 150},
    CAROUSEL: {width: 450, height: 630}
}

export const ProductGallery = ({images, id}) => {
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);


    const prepareImages = (imageSize) => {
        switch (imageSize) {
            case ImageSizes.THUMBNAIL:
                if (images.length !== 0) {
                    return images.map((image, index) => (
                        <img
                            key={index}
                            src={ImageService.getImageWithSpecifiedSize(image, imageSize.width, imageSize.height)}
                            alt={ImageService.getImageAlt(id, image)}
                            onClick={() => setIndex(index)}/>
                    ));
                }
                return <img src={ImageService.getImageWithSpecifiedSize(null, imageSize.width, imageSize.height)} alt={ImageService.getImageAlt(id, null)}/>
            case ImageSizes.CAROUSEL:
                if (images.length !== 0) {
                    return images.map((image, index) => (

                            <Carousel.Item key={index}>
                                <img
                                    src={ImageService.getImageWithSpecifiedSize(image, imageSize.width, imageSize.height)}
                                    alt={ImageService.getImageAlt(id, image)}
                                    onClick={() => {
                                        setOpen(true);
                                    }}
                                    key={index}
                                />
                            </Carousel.Item>
                ))
                }
                return <Carousel.Item key={index}>
                    <img
                        src={ImageService.getImageWithSpecifiedSize(null, imageSize.width, imageSize.height)}
                        alt={ImageService.getImageAlt(id, null)}
                        onClick={() => {
                            setOpen(true);
                        }}
                    />
                </Carousel.Item>
            default:

        }

    }

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <>
            <Box className="product-gallery-main-container">
                <Box className="product-gallery-thumbnail-container">
                    {prepareImages(ImageSizes.THUMBNAIL)}
                </Box>
                <Carousel
                    activeIndex={index}
                    onSelect={handleSelect}
                    style={{width: 450}}
                    indicators={false}
                    interval={null}
                >
                    {prepareImages(ImageSizes.CAROUSEL)}
                </Carousel>
            </Box>
            <Dialog open={open} fullScreen>
                <DialogContent>
                    <Box className="product-gallery-dialog-main-container">
                        <img src={ImageService.getImage(images[index])} alt={ImageService.getImageAlt(id, images[index])}/>
                        <IconButton
                            className="product-gallery-dialog-icon"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <Close fontSize={"large"}/>
                        </IconButton>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};
