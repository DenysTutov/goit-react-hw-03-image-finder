import ImageGalleryItem from 'components/ImageGalleryItem';
import { List } from './ImageGallery.styled';

const ImageGallery = ({ images, onGetLargeImageUrl }) => {
  return (
    <>
      <List>
        {images.map(({ id, webformatURL, tags, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              smallUrl={webformatURL}
              alt={tags}
              onGetLargeImageUrl={() => onGetLargeImageUrl(largeImageURL)}
            />
          );
        })}
      </List>
    </>
  );
};

export default ImageGallery;
