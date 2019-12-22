import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Loader.css'


export class Loader extends PureComponent {
    static propTypes = {
        //prop: PropTypes
    }
    static defaultProps = {

    }

    render() {
        return (
            <Fragment>
            <div className='loader_text'>
            {this.props.children}
            </div>
            <div id="circle">
            <div className="loader">
              <div className="loader">
                  <div className="loader">
                    <div className="loader">       
                    </div>
                  </div>
              </div>
            </div>

          </div>  
          </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader)
