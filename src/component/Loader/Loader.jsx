import React from 'react';
import loadericon from "../../assets/hexalog_loader.png";

const Loader = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // zIndex: 1000
        }}>
            <img
                src={loadericon}
                alt="Loading Icon"
                style={{
                    width: '60px',
                    animation: 'upDown 1.5s ease-in-out infinite'
                }}
            />
        </div>
    );
};

export default Loader;
