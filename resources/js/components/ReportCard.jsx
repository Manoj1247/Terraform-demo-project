import React from 'react'
import {Card, Button} from "react-bootstrap";
import ReportModal from "~components/ReportModal";

const ReportCard = ({data}) => {
    const [show, setShow] = React.useState(false);
    const imageUrl = `/images/screenshots/${data.id}_${data.ssname}`
    const reportNumber = data.reportnumber.split('/')[0]
    const title = data.displaylabel ?  data.displaylabel: 'No title.';

    return (
        <>
            <Card width="300px" height="480px">
                <Card.Img
                    variant="top"
                    src={imageUrl}
                    width="300px"
                    height="189px"
                />
                <Card.Body className="d-flex flex-column">
                    <Card.Title>
                        {data.displaylabel ? (
                            <p>{data.displaylabel}</p>
                        ) :(
                            <p className="text-danger">No title.</p>
                        )}
                    </Card.Title>
                    <Card.Text style={{width: '100%', height: '150px', textOverflow: 'ellipsis', overflow: 'auto'}}>
                        {data.description ? (
                            <small>{data.description}</small>
                        ) :(
                            <small className="text-danger">No description.</small>
                        )}
                    </Card.Text>
                    <Button variant="primary" className="mt-auto" onClick={()=>setShow(true)}>View</Button>
                </Card.Body>
            </Card>
            <ReportModal show={show} handleClose={()=>setShow(false)} data={{id: reportNumber, title: title}}/>
        </>
    )
}
export default ReportCard
