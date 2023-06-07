import React from 'react'
import {Card, Button} from "react-bootstrap";
import ReportModal from "~components/ReportModal";

const ReportCard = ({data}) => {
    const [show, setShow] = React.useState(false);
    const [dashboardId, setDashboardId] = React.useState(null);
    const imageUrl = data['screenshot']
    const title = data.displaylabel ? data.displaylabel : 'No title.';
    React.useEffect(() => {
        if (data.url) {
            try {
                const url = new URL(data.url);
                setDashboardId(url?.pathname?.split('/')?.pop());
            } catch (e) {
                setDashboardId(null);
            }
        }
    }, [data])
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
                        ) : (
                            <p className="text-danger">No title.</p>
                        )}
                    </Card.Title>
                    <Card.Text style={{width: '100%', height: '150px', textOverflow: 'ellipsis', overflow: 'auto'}}>
                        {
                            dashboardId ? (
                                data.description ? (
                                    <small>{data.description}</small>
                                ) : (
                                    <small className="text-danger">No description.</small>
                                )
                            ): <small className="text-danger">Dashboard Doesn't exist.</small>
                        }
                    </Card.Text>
                    <Button variant="primary" className="mt-auto" onClick={() => setShow(true)} disabled={!dashboardId}>View</Button>
                </Card.Body>
            </Card>
            {dashboardId && <ReportModal show={show} handleClose={() => setShow(false)} data={{id: dashboardId, title: title}}/>}
        </>
    )
}
export default ReportCard
