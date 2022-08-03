import { useState } from "react";

const ShowToast = (type, message) => {
    let toastProperties = {};

    switch(type) {
        case 'success':
            toastProperties = {
                id: Math.floor(Math.random() * 10),
                title: 'Success',
                description: message,
                backgroundColor: '#5cb85c'
            }
            break;
        
        case 'danger':
            toastProperties = {
                id: Math.floor(Math.random() * 10),
                title: 'Danger',
                description: message,
                backgroundColor: '#d9534f'
            }
            break;
            
        case 'info':
            toastProperties = {
                id: Math.floor(Math.random() * 10),
                title: 'Info',
                description: message,
                backgroundColor: '#5bc0de'
            }
            break;
            
        case 'warning':
            toastProperties = {
                id: Math.floor(Math.random() * 10),
                title: 'Warning',
                description: message,
                backgroundColor: '#f0ad4e'
            }
            break;
    }

    return toastProperties;
};

export default ShowToast;

   