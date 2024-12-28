import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const DeleteModal = ({ show, handleClose, handleDelete, deletetext }) => {
    return (

        // <Modal show={show} onHide={handleClose} centered>
        //     <Modal.Header closeButton>
        //         <p></p>
        //     </Modal.Header>
        //     <div className="modal-body pt-5" closeButton>
        //         <p style={{ fontSize: '20px' }}>Are you sure you want <br /> to delete ?</p>
        //     </div>
        //     <Modal.Footer>
        //         <button className="close-btn" onClick={handleClose}>
        //             No
        //         </button>
        //         <button className='delete-btn' onClick={handleDelete}>
        //             Yes
        //         </button>
        //     </Modal.Footer>
        // </Modal>
        <Modal className="modal-view" show={show} onHide={handleClose} centered>
            <div className='modal-hedaer-view'>
                <span>Delete Confirmation</span>
            </div>
            <div className="modal-body-view" >
                <span style={{ fontSize: '20px' }}>Are you sure you want to delete this {deletetext}?</span>
            </div>
            <div className="modal-footer-body">
                <button className="no-btn" onClick={handleClose}>
                    No
                </button>
                <button className='yes-btn' onClick={handleDelete}>
                    Yes
                </button>
            </div>
        </Modal>
    )
}

export default DeleteModal