import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';

var componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: '/uploadHandler'
};

const djsConfig = {
    maxFiles: 1
}

var eventHandlers = { addedfile: (file) => console.log(file) }

class DropZone extends Component {   
    render() {
        return (
            <DropzoneComponent config={componentConfig}
                eventHandlers={eventHandlers}
                djsConfig={djsConfig} />,
            document.getElementById('content')
        )
    }
}

export default DropZone