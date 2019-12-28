import React, { PureComponent, Fragment} from 'react'
import ArticleList from '../../elements/articleList/articleList'
import {Container, Row, Col, Pagination, Button, ButtonGroup} from 'react-bootstrap'
import PropTypes from 'prop-types'
//import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {Link, Redirect} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'

import './styles.css'

class AllComments extends PureComponent {
  state = {
    commentsPerPage: 3,

  }

  componentDidMount() {
    if (!this.props.loaded) {
      this.props.loadComments()
    }
    
  }

  getComments() {
    let comments = []
    if (this.props.comments.length>0) {
      let page = this.props.match.params.id || 1
      if (page>Math.ceil(this.props.comments.length/this.state.commentsPerPage)) {
        return <li>Oops, nothing to show.</li>
        // return <Redirect to='/404'/>
      }

      if (page===1) {
        comments = this.props.comments.slice(0, this.state.commentsPerPage)
      }
      else {
        comments = this.props.comments.slice((page-1)*this.state.commentsPerPage, this.state.commentsPerPage*page)
      }

      return comments.map((comment,i)=> {
        return (<li key={comment.id}>
          <h5>{comment.user}</h5>
          <p>
            {comment.text}
          </p>
        </li>)
      })
    }
    return <li>It's loading...</li>

    // return this.props.comments.map((comment)=> {
    //   return (<li key={comment.id}>
    //     <h5>{comment.user}</h5>
    //     <p>
    //       {comment.text}
    //     </p>
    //   </li>)
    // })
  }
  
  render () {
    let curr = this.props.match.params.id === undefined? 1 : this.props.match.params.id
    let pages = []
    let pag = Math.ceil(this.props.comments.length/this.state.commentsPerPage)
    for (let i=1; i <= pag; i++) {
      pages.push(
        <LinkContainer to={{pathname: `/allcomments/${i}`}} key={i}>
          <Pagination.Item key={i} active={i===curr? true : false}>
            {i}
              </Pagination.Item>
        </LinkContainer>
      )
    }

    console.log('AllComments component props', this.props)

    return (
      <Fragment>
        <Container style={{marginTop:'20px'}}>
          <Row>
            <Col>
              <h1>All Comments</h1>
              <p>List of all comments from database.</p>
            </Col>
          </Row>
          <Row>
          <Col className="justify-content-between">
            <ButtonGroup float="left">
              <Button disabled={this.state.commentsPerPage === 3? true: false} onClick={()=>{
                this.setState({commentsPerPage:3})
              }}>
                3
              </Button>
              <Button disabled={this.state.commentsPerPage === 5? true: false} onClick={()=>{
                console.log('!!')
                this.setState({commentsPerPage:5})
              }}>
                5
              </Button>
              <Button disabled={this.state.commentsPerPage === 10? true: false} onClick={()=>{
                this.setState({commentsPerPage:10})
              }}>
                10
              </Button>
              <Button disabled={this.state.commentsPerPage === this.props.comments.length? true: false} onClick={()=>{
                this.setState({commentsPerPage:this.props.comments.length})
              }}>
                All
              </Button>
            </ButtonGroup>
            <Button className="ml-3" onClick={this.props.history.goBack} float="center">
              Go Back
            </Button>
          </Col>
          </Row>
          <Row> 
            <Col>
            {/* <CSSTransition transitionName="articleList" 
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            > */}
              {/* <ArticleList articles = {this.props.articles} comments = {this.props.comments} loadArticles = {this.props.loadArticles} loadComments={this.props.loadComments} /> */}
              <p>Lorem, ipsum dolor.</p>
              <ul>
                {this.getComments()}
              </ul>
            {/* </CSSTransition> */}
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
            <Pagination>
              {pages}
            </Pagination>
            </Col>
          </Row>
        </Container>
      </Fragment>
    )
  }
}

AllComments.propTypes = {
  ListHeader: PropTypes.number,
  articles: PropTypes.array,
  comments: PropTypes.array

}

export default AllComments
