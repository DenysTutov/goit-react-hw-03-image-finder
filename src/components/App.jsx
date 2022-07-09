import { Component } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import imagesFetch from './services/imagesApi';

let totalImages = 0;

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    showLoader: false,
    largeImageUrl: '',
  };

  componentDidMount() {}

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
        }, 1000);
      } catch (error) {
        console.log(error);
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
      largeImageUrl: '',
    });

    window.scrollTo({
      top: 0,
      left: 0,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      showLoader: !prevState.showLoader,
    }));
  };

  handleGetLargeImageUrl = newLargeImageUrl => {
    this.setState({ largeImageUrl: newLargeImageUrl });
  };

  render() {
    const { images, showLoader } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmitSearch} />

        {images.length === 0 && !showLoader && <p>Please Enter search query</p>}

        {images.length > 0 && (
          <>
            <ImageGallery
              images={images}
              onGetLargeImageUrl={this.handleGetLargeImageUrl}
            />
            {images.length < totalImages && !showLoader && (
              <Button onClick={this.handleLoadMore} />
            )}

            {images.length >= totalImages && <p>The images are end!</p>}
          </>
        )}
        {showLoader && <Loader />}
      </>
    );
  }
}

export default App;
