// ImageModal.js
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';


const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modal: {
      position: 'relative',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.5rem',
    },
    image: {
      maxWidth: '90vw',
      maxHeight: '80vh',
    },
  };

const ImageModal = ({ isOpen, image, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        <img src={image} alt="Large view" style={styles.image} />
      </div>
    </div>
  );
};


ImageModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

export default ImageModal;
