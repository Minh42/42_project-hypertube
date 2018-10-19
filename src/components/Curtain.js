import React, { Component } from 'react';
import movie from '../assets/img/movie-poster.jpg';

class Curtain extends Component {    
    render() {
        return (
            <div className="curtain">    
         
                <input type="checkbox" id="toggle-2"/>
                <div className="left-panel">
                    <img src={movie} alt="Logo" className="left-panel__movie-poster"/> 
                    <div className="left-panel__movie-information">
                        <div className="left-panel__movie-title">
                            Venom
                        </div>
                        <div className="left-panel__movie-description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut suscipit gravida metus sed porta. Mauris luctus ornare venenatis. Curabitur facilisis efficitur lacus. Donec tristique sapien sagittis lorem sodales maximus. Etiam eget dapibus magna. Donec semper ex odio, ac egestas diam dignissim et. Vivamus pulvinar, quam vitae scelerisque pharetra, odio enim porta ligula, at facilisis massa metus sed lectus. Sed auctor leo at metus gravida rutrum. Nullam sapien felis, elementum rhoncus facilisis vel, sagittis at ipsum. Nulla quis scelerisque nunc, eu auctor augue. Proin vehicula nunc quis metus condimentum, ut lacinia metus egestas. Integer quis est et erat sollicitudin venenatis a eget turpis. Proin blandit turpis dui, sit amet tempor dolor mollis sit amet.
                        </div>
                        <button className="btn btn-primary">
                            <span className="btn btn-primary__icon">

                            </span>
                                Play
                        </button>
                        <button className="btn btn-primary">
                            <span className="btn btn-primary__icon">

                            </span>
                                More info
                        </button>
                    </div>
                </div>
                
                <div className="right-panel">
                    <img src={movie} alt="Logo" className="right-panel__movie-poster"/> 
                </div>
                
                <div className="prize">
                    Hello
                </div>

               

            </div>
        );
    }
}

export default Curtain;