import React from 'react'
import {Card, Button} from "react-bootstrap";
import ReportModal from "~components/ReportModal";

const ReportCard = ({data}) => {
    const [show, setShow] = React.useState(false);
    const clientId = 1;
    const clientSecret = 'gbpPdBBwyJaAPATVQ0tvmpiSG929x79XoJz3TFvS';
    const imageUrl = `https://dps-test.periscope365.com/gets3object?Clientid=${clientId}&Clientsecret=${clientSecret}&S3url=https://periscope365-prod.s3.us-west2.amazonaws.com/documents/requestid/${data.id}/${data.ssname}`
    const reportNumber = data.reportnumber.split('/')[0]
    const title = data.displaylabel ?  data.displaylabel + ' - Report.': 'No title.';
    return (
        <>
            <Card>
                <Card.Img variant="top" src={imageUrl} height="100px" width="auto" />
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
                    <Button variant="primary" className="mt-auto" onClick={()=>setShow(true)}>View Report</Button>
                </Card.Body>
            </Card>
            <ReportModal show={show} handleClose={()=>setShow(false)} data={{id: reportNumber, title: title}}/>
        </>
    )
}
export default ReportCard
