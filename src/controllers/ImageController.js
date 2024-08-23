/* eslint-disable import/extensions */
import Controller from './Controller.js';
import ImageService from '../service/ImageService.js';

const imageService = new ImageService();

class ImageController extends Controller {
  constructor() {
    super(imageService);
    this.image = imageService;
  }
}

export default ImageController;
