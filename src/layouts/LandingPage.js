import React, { Component } from 'react';
import { ReactComponent as Cycle} from '../assets/img/svg/cycle.svg';

class LandingPage extends Component {   
    constructor(props) {
		super(props);
    }

    render() {
        return (
            <div class="container">
                <div id='cycle'>
                    <Cycle fill="#FFF"/>
                </div>
               <div class="boarding">
                    <input id="demo" type="checkbox" />
                    <div for="demo" class="boarding__side boarding__side--front">
                     FRONT
                    </div>
                    <div for="demo" class="boarding__side boarding__side--back hello boarding__side--back-1">
                     BACK
                    </div>
               </div>
            </div>
        );
    }
}

export default LandingPage;