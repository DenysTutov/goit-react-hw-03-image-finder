import { Item, Img } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ smallUrl, alt, onGetLargeImageUrlAndTags }) => {
  return (
    <Item onClick={onGetLargeImageUrlAndTags}>
      <Img src={smallUrl} alt={alt} width="300" />
    </Item>
  );
};

export default ImageGalleryItem;
