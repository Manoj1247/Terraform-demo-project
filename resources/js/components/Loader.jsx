import React from "react";

function Loader() {
    return (
        <div className="loader-style">
            <div className="spinner-border m-5 loader" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default Loader;
