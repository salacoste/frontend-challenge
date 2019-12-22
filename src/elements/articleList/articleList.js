import React, {PureComponent, Fragment} from 'react'
import {Accordion, Card, Button, Alert} from 'react-bootstrap'
import CommentList from '../commentsList/commentsList'

class ArticleList extends PureComponent {
  
  constructor(props){
    super(props)
    this.state = {
      defaultActiveKey: undefined,
    }
  }

  handlerComments = (id) => {
    //handler for Comment Open/Close button
    
  }
  componentDidMount() {
    this.props.loadArticles && this.props.loadArticles()
  }

  getArticles = () => {
    if(this.props.articles.length === 0) {
      return (
        <Alert variant="danger">
          Articles are loading or error is occured.
        </Alert>
      )
    }
    else {

    }

    return this.props.articles.map((item)=> {
      const date = new Date(item.date).toLocaleString()
      return (
      <Card key={item.id}>
        <Card.Body>
          <small>Date: {date}</small>
          <h3>{item.title}</h3>
        </Card.Body>
        <Accordion.Toggle as={Card.Header} eventKey={item.id}>
        Show more..
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={item.id}>
          <div>
          <Card.Body>
          <p>
            {item.text}
          </p>
          <CommentList handlerComments={this.handlerComments} loadComments ={this.props.loadComments}  articleId = {item.id} commentsCount = {item.comments? item.comments.length : 0}/> 
          {/* comments = {this.props.comments} */}
          </Card.Body>
          </div>
        </Accordion.Collapse>
      </Card> 
      )})
  }
  
  render() {
  return (
  <Fragment>
    <Accordion defaultActiveKey={this.state.defaultActiveKey || "0"}>
    {this.getArticles()}
    </Accordion>
  </Fragment>
  )
  }


}

export default ArticleList
