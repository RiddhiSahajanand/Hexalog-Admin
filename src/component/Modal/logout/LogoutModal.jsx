// import Modal from 'react-bootstrap/Modal';

// const LogoutModal = ({ show, handleClose, handleDelete }) => {
//     return (

//         <Modal show={show} onHide={handleClose} centered>
//             <Modal.Header closeButton>
//                 <p></p>
//             </Modal.Header>
//             <div className="modal-body pt-5" closeButton>
//                 <p style={{ fontSize: '20px' }}>Are you sure you want to Logout ?</p>
//             </div>
//             <Modal.Footer>
//                 <button className="close-btn" onClick={handleClose}>
//                     No
//                 </button>
//                 <button className='close-btn' onClick={handleDelete}>
//                     Yes
//                 </button>
//             </Modal.Footer>
//         </Modal>
//     )
// }

// export default LogoutModal
import Modal from 'react-bootstrap/Modal';
import "./Modal.css";

const LogoutModal = ({ show, handleClose, handleDelete }) => {
    return (

        <Modal className="modal-view" show={show} onHide={handleClose} centered>
            <div className='modal-hedaer-view'>
                <span>Logout Confirmation</span>
            </div>
            <div className="modal-body-view" >
                <span style={{ fontSize: '20px' }}>Are you sure you want to logout this account?</span>
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

export default LogoutModal