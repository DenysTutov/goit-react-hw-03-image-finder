import { Item, Img } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ smallUrl, alt, onGetLargeImageUrl }) => {
  return (
    <Item onClick={onGetLargeImageUrl}>
      <Img src={smallUrl} alt={alt} width="300" />
    </Item>
  );
};

export default ImageGalleryItem;
