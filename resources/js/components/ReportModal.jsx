import React from 'react';
import {Modal} from "react-bootstrap";
import QuickSight from "~components/QuickSight";

const ReportModal = ({show, handleClose, data}) => {
    const handleQSDashboardLoaded = () => {
        console.log('dashboard loaded...')
    }
    return (
        <Modal show={show} fullscreen={true} onHide={() => handleClose()}>
            <Modal.Header closeButton>
                <Modal.Title>{data.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <QuickSight id={data.id} onQSDashboardLoaded={()=>handleQSDashboardLoaded()}/>
            </Modal.Body>
        </Modal>
    )
}
export default ReportModal;
