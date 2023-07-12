import React from 'react'
import useApiCall from "~hooks/useApiCall";
import {GET} from "~config/url";
import PageAlert from "~components/PageAlert";
import Loader from "~components/Loader";

function QuickSight({id, onQSDashboardLoaded, loading}) {
    const [{loading: fetchLoading, error: fetchError, data}, fireFetchQSUrlRequest] = useApiCall({
        method: GET,
        url: '/api/getEmbedUrl'
    });

    const refreshInterval = 600 * 60 * 1000; // After 600 minutes, this will refresh quicksight iframe Url
    React.useEffect(() => {
        fireFetchQSUrlRequest({params: {id}})
            .then(() => {
                onQSDashboardLoaded(id);
            })
            .catch(() => {
                onQSDashboardLoaded(id);
            })
        setInterval(() => {
            fireFetchQSUrlRequest({params: {id}}).then(r => r)
        }, refreshInterval)
    }, [id]);

    if (fetchError) {
        return (
            <PageAlert className="mt-3" variant="warning" timeout={5000} dismissible>
                Error: {fetchError}
            </PageAlert>
        )
    }
    React.useEffect(()=>{
        if(data.url){
            loadQuickSightDashboard().then(r=>r)
        }
    },[data]);

    const loadQuickSightDashboard = async() => {
        const {
            createEmbeddingContext,
        } = window.QuickSightEmbedding;

        const embeddingContext = await createEmbeddingContext({
            onChange: (changeEvent, metadata) => {
                console.log('Context received a change', changeEvent, metadata);
            },
        });


        const frameOptions = {
            url: data.url,
            container: document.getElementById('quicksight-container'),
            height: "100%",
            width: "100%",
            parameters: {
                RequestId: data.request_id,
            },
            onChange: (changeEvent, metadata) => {
                switch (changeEvent.eventName) {
                    case 'FRAME_MOUNTED': {
                        console.log("Do something when the experience frame is mounted.");
                        break;
                    }
                    case 'FRAME_LOADED': {
                        console.log("Do something when the experience frame is loaded.");
                        break;
                    }
                }
            },
        };

        const contentOptions = {
            toolbarOptions: {
                export: true,
                undoRedo: true,
                reset: true
            },
        };
        await embeddingContext.embedDashboard(frameOptions, contentOptions);
    }
    if(fetchLoading) return <Loader />
    return (<></>)
}

export default QuickSight;
