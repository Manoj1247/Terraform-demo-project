import React, {useEffect, useState} from 'react'
import {Col, Container, InputGroup, Row, Form, Button} from "react-bootstrap";
import useApiCall from "~hooks/useApiCall";
import {GET} from "~config/url";
import PageAlert from "~components/PageAlert";
import Loader from "~components/Loader";
import ReportCard from "~components/ReportCard";

const Home = () => {
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [{error: reportsError, loading: reportsLoading =  true, data}, fireFetchReportsRequest] = useApiCall({
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
    useEffect(()=>{
        if(!reportsLoading && data.length > 0) {
            document.getElementsByClassName('loader-style').item(0)?.classList.add('fadeOut');
            document.getElementsByClassName('container').item(0)?.classList.add('fadeIn');
            setTimeout(()=>{
                document.getElementsByClassName('loader-style').item(0).style.display = 'none';
            },1500);
            document.getElementsByClassName('container').item(0).style.display = 'block';
        }
    },[reportsLoading]);
    // if(loading) return <Loader />

    if (reportsError) {
        return (
            <PageAlert className="mt-3" variant="warning" timeout={5000} dismissible>
                Error: {reportsError}
            </PageAlert>
        )
    }
    return (
        <>
            <Loader />
            <Container>
                <Row className="mt-5 mb-5">
                    <Col md={12}>
                        <h1 className="mt-3 mb-5 text-center">{title}</h1>
                    </Col>
                    <Col md={12} className="d-flex flex-row justify-content-end">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon">Search</InputGroup.Text>
                            <Form.Control
                                placeholder="Search by title or description..."
                                aria-label="Search"
                                aria-describedby="basic-addon"
                                value={keyword}
                                onChange={(e)=>setKeyword(e.target.value)}
                            />
                            <Button style={{zIndex: 1}} variant="danger" onClick={()=>setKeyword('')}>Clear</Button>
                        </InputGroup>
                    </Col>
                    {Array.isArray(reports) && (
                        reports.map((report, key)=>(
                            <Col lg={3} sm={6} xs={12} key={key} className="mt-3">
                                <ReportCard data={report} />
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </>
    )
}
export default Home
