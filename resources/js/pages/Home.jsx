import React, {useState} from 'react'
import {Col, Container, InputGroup, Row, Form} from "react-bootstrap";
import useApiCall from "~hooks/useApiCall";
import {GET} from "~config/url";
import PageAlert from "~components/PageAlert";
import Loader from "~components/Loader";
import ReportCard from "~components/ReportCard";

const Home = () => {
    const [keyword, setKeyword] = useState('');
    const [{error: reportsError, loading: reportsLoading, data}, fireFetchReportsRequest] = useApiCall({
        method: GET,
        url: '/api/reports'
    });
    const [title, setTitle] = useState('');
    const [reports, setReports] = useState([]);
    React.useEffect(()=>{
        (async()=>{
            await fireFetchReportsRequest();
        })()
    },[]);
    React.useEffect(()=>{
        if(data.length > 0) {
            setTitle(data[0].title);
        }
        setReports(data);
        setKeyword('');
    },[data]);
    React.useEffect(()=>{
        if(title) {
            document.title = title;
        }
    },[title]);
    React.useEffect(()=>{
        searchByKeyword(keyword)
    },[keyword]);
    const searchByKeyword = (keyword) => {
        if(keyword){
            const filtered = data.filter(report=>{
                if(report.displaylabel && report.displaylabel.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                    return true;
                }
                if(report.description && report.description.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                    return true;
                }
            })
            setReports(filtered);
        }else{
            setReports(data);
        }
    }
    if(reportsLoading) return <Loader />

    if (reportsError) {
        return (
            <PageAlert className="mt-3" variant="warning" timeout={5000} dismissible>
                Error: {reportsError}
            </PageAlert>
        )
    }
    return (
        <Container>
            <Row className="mt-5">
                <Col md={12}>
                    <h1 className="mt-3 mb-5 text-center">{title}</h1>
                </Col>
                <Col md={12} className="d-flex flex-row justify-content-end">
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search by title or description..."
                            aria-label="Search"
                            aria-describedby="basic-addon"
                            value={keyword}
                            onChange={(e)=>setKeyword(e.target.value)}
                        />
                        <InputGroup.Text id="basic-addon">Search</InputGroup.Text>
                    </InputGroup>
                </Col>
                {Array.isArray(reports) && (
                    reports.map((report, key)=>(
                        <Col lg={4} sm={6} xs={12} key={key} className="mt-3">
                            <ReportCard data={report} />
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    )
}
export default Home
