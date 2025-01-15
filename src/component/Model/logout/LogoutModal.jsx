import Modal from 'react-bootstrap/Modal';

const LogoutModal = ({ show, handleClose, handleDelete }) => {
    return (

        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <p></p>
            </Modal.Header>
            <div className="modal-body pt-5" closeButton>
                <p style={{ fontSize: '20px' }}>Are you sure you want to Logout ?</p>
            </div>
            <Modal.Footer>
                <button className="close-btn" onClick={handleClose}>
                    No
                </button>
                <button className='close-btn' onClick={handleDelete}>
                    Yes
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default LogoutModal