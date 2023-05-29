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
    if(fetchLoading) return <Loader />
    return (
        <>
            <iframe width="100%" height={loading ? '1px' : '100%'} src={data.url}/>
        </>
    )
}

export default QuickSight;
