import { Component } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import Notification from './Notification';
import imagesFetch from './services/imagesApi';

let totalImages = null;

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    showLoader: false,
    largeImageUrlAndTags: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        const dataImages = await imagesFetch(this.state.query, this.state.page);
        totalImages = dataImages.totalHits;

        setTimeout(() => {
          this.setState(state => ({
            images: [...state.images, ...dataImages.hits],
            showLoader: false,
          }));
        }, 500);
      } catch (error) {
        console.log(error => ({ error, showLoader: false }));
      }
    }
  }

  handleSubmitSearch = newQuery => {
    if (this.state.query === newQuery) {
      return;
    }

    this.setState({
      query: newQuery,
      images: [],
      page: 1,
      showLoader: true,
    });

    window.scrollTo({ top: 0, left: 0 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      showLoader: !prevState.showLoader,
    }));
  };

  handleGetLargeImageUrlAndTags = newImageUrlAndTags => {
    this.setState({ largeImageUrlAndTags: newImageUrlAndTags });
  };

  handleModalClose = () => {
    this.setState({ largeImageUrlAndTags: null });
  };

  render() {
    const { images, showLoader, largeImageUrlAndTags } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmitSearch} />

        {totalImages === null && !showLoader && (
          <Notification>Please Enter search query</Notification>
        )}

        {totalImages === 0 && (
          <Notification eventColor="red">
            Enter something normal :)
          </Notification>
        )}

        {images.length > 0 && (
          <>
            <ImageGallery
              images={images}
              onGetLargeImageUrlAndTags={this.handleGetLargeImageUrlAndTags}
            />
            {images.length < totalImages && (
              <Button onClick={this.handleLoadMore} />
            )}

            {images.length >= totalImages && (
              <Notification>The images are end!</Notification>
            )}
          </>
        )}

        {showLoader && <Loader />}

        {largeImageUrlAndTags && (
          <Modal
            onModalClose={this.handleModalClose}
            largeImage={largeImageUrlAndTags}
          />
        )}
      </>
    );
  }
}

export default App;
