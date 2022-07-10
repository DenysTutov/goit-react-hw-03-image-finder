import ImageGalleryItem from 'components/ImageGalleryItem';
import { List } from './ImageGallery.styled';

const ImageGallery = ({ images, onGetLargeImageUrlAndTags }) => {
  return (
    <>
      <List>
        {images.map(({ id, webformatURL, tags, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              smallUrl={webformatURL}
              alt={tags}
              onGetLargeImageUrlAndTags={() =>
                onGetLargeImageUrlAndTags({
                  largeUrl: largeImageURL,
                  alt: tags,
                })
              }
            />
          );
        })}
      </List>
    </>
  );
};

export default ImageGallery;
