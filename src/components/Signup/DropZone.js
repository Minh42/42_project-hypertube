import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import axios from 'axios';

class DropZone extends Component { 
    constructor(props) {
        super(props);

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: false,
            postUrl: '/uploadHandler'
        };
        
        this.djsConfig = {
            dictDefaultMessage: "Click here to add a picture",
            maxFiles: 1
        }
    }

    async handleFileAdded(file) {
        // console.log(file);
        // console.log(file.upload);
        const res = await axios.post('http://localhost:8080/api/users/upload', file.upload)
        this.props.triggerParentUpdate = file;
        console.log(this.props.triggerParentUpdate)
    }

    render() {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;
        const eventHandlers = { 
            addedfile: this.handleFileAdded.bind(this)
        }

        return (
            <DropzoneComponent config={config}
                eventHandlers={eventHandlers}
                djsConfig={djsConfig}>
            </DropzoneComponent>
        )
    }
}

export default DropZone