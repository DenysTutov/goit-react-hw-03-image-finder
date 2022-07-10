import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, StyledModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
      console.log('ESC');
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <StyledModal>
          <img
            src={this.props.largeImage.largeUrl}
            alt={this.props.largeImage.alt}
          />
        </StyledModal>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
