import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const DeleteModal = ({ show, handleClose, handleDelete }) => {
    return (
        // <Modal show={show} onHide={handleClose} centered >

        //     <div className="modal-body pt-5">
        //         <p style={{ fontSize: '20px' }}>Are you sure you want <br /> to delete ?</p>
        //     </div>
        //     <div className="d-flex justify-content-around pb-5">
        //         <button type="button" className="close-btn" onClick={handleClose}>
        //             No
        //         </button>
        //         <button type="button" className="delete-btn" onClick={handleDelete}>Yes</button>
        //     </div>
        // </Modal>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <p></p>
            </Modal.Header>
            <div className="modal-body pt-5" closeButton>
                <p style={{ fontSize: '20px' }}>Are you sure you want <br /> to delete ?</p>
            </div>
            <Modal.Footer>
                <button className="close-btn" onClick={handleClose}>
                    No
                </button>
                <button className='delete-btn' onClick={handleDelete}>
                    Yes
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal