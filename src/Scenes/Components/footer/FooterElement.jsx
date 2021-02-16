import React, { Component } from 'react'

export default class FooterElement extends Component {
    render() {
        return (
            <div>
                <div 
                style={{ 
                    height:"70px",
                    width:'100%' ,
                    fontSize: '0.75rem', 
                    fontFamily: 'muli',
                    fontWeight: '800',
                    fontSize:'17px',
                    paddingTop:'20px',
                    paddingLeft:'30rem',
                    backgroundColor:'#131633',
                    }}>

                    <footer style={{color:"#9e9fac"}}>
                        &copy; 2021<a href='http://www.v-enertek.com/' target='_blank'>VAIGUNTH ENER TEK (P) LTD.</a> ALL RIGHTS RESERVED.
                    </footer>
                </div>
            </div>
        )
    }
}

