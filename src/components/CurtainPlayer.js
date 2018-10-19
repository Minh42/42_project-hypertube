import React, { Component } from 'react';

class CurtainPlayer extends Component {    
    render() {
        return (
            <div className="curtain">    
                <label for="toggle-2">Swap</label>
                <input type="checkbox" id="toggle-2"/>
                <div className="left-panel">
                
                </div>
                
                <div className="right-panel">
                
                </div>
                
                <div className="prize">
                    <p>Woo!</p>
                </div>
            </div>
        );
    }
}

export default CurtainPlayer;