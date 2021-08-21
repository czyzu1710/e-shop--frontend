import React, {useEffect, useState} from "react";
import {ProductGallery} from "./ProductGallery";
import {ProductInfo} from "./ProductInfo";
import {Box} from "@material-ui/core";
import "./ProductPage.css";
import ProductService from "../../services/products";

export const ProductPage = (props) => {
    const [info, setInfo] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [available, setAvailable] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        ProductService.getProductInfo(props.match.params.id).then((response) => {
            setInfo(response.data);
            setImages(response.data.imagesUrls)
            setAvailable(response.data.clothPieces);
            setLoading(false);
        });
    }, [props.match.params.id]);


    if (isLoading) {
        return <></>
    }

    return (
        <Box className="product-page-main-container">
            <Box className="product-page-sub-container">
                <ProductGallery images={images} id={props.match.params.id} />
                <ProductInfo info={info} available={available} id={props.match.params.id}/>
            </Box>
        </Box>
    );
};
