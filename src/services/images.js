const DEFAULT_IMAGE_URL = 'default.jpeg'

class ImageService {


  getImage(imageId) {
    return `${process.env.REACT_APP_BASE_API_URL}/images/${imageId || DEFAULT_IMAGE_URL}`
  }

  getImageWithSpecifiedSize(imageId, width, height) {
    return `${process.env.REACT_APP_BASE_API_URL}/images/${imageId || DEFAULT_IMAGE_URL}?width=${width}&height=${height}`
  }

  getImageAlt(productId, imageId) {
    return `Product: ${productId}. Image: ${imageId || DEFAULT_IMAGE_URL}`
  }
}

export default new ImageService();