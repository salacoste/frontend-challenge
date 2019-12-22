import React, {PureComponent, Fragment} from 'react'
import { connect } from 'react-redux'

import {Accordion, Card, Button, Row, Col} from 'react-bootstrap'
import {normalizedArticles, normalizedComments} from '../../utils/fixtures'
import {ListGroup, Form, } from 'react-bootstrap'
import BaseForm, {} from '../forms/BaseForm'

import {filteredComments} from '../../store/reducers/comments/commentsSelector'
import {comments_add_thunk} from '../../store/reducers/comments/commentsReducer'



export class CommentList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      btnState: false
    }
  }

  handlerButton = () => {
    this.setState({btnState: !this.state.btnState})
    // console.log('!!!!', this.props.comments)
    this.props.loadComments()
  }

  counterComments = () => {
    if (this.props.article.comments) {
      return this.props.article.comments.length
    }
    else {
      return 0
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col lg={12}>
            <h5>Comments for Article {this.props.articleId}</h5>
          { this.props.comments && 
              (<h6>
              Comments for article: {this.props.commentsCount}
            </h6>)
          }
          <Button variant="primary" onClick={this.handlerButton}>{!this.state.btnState? 'Show comments' : 'Close comments'}  </Button>
        </Col>
        </Row>
        {this.state.btnState &&
          <Row style={{'marginTop':'15px'}}>
            <Col>
            <ListGroup>
            {this.props.comments.length>0? this.props.comments.map((comment)=> {
              return (
                <ListGroup.Item key={comment.id}>
                  <p>User: {comment.user}</p>
                  <p>Text: {comment.text}</p>
                </ListGroup.Item>
              )
            }): <p>There are no comments</p>}
            </ListGroup>
            <ListGroup>
              <ListGroup.Item key={this.props.articleId}>
                <BaseForm
                  initialValues={{username: '', text: ''}}
                  //validationSchema={validationSchema}
                  validate={validate}
                  onSubmit={(values, { setSubmitting, resetForm })=> {
                    return onSubmit(values, setSubmitting, this.props.addComment, this.props.articleId, resetForm,
                      {a: 2333, b: 1111, cc: 'string add'})
                    }
                  }
                  render={render}
                  /> 
              </ListGroup.Item>
            </ListGroup>
            </Col>
          </Row>
        }
      </div>
    )
  }
}

const validate = values => {
  let errors = {};
  if (!values.username) {
    errors.username = 'Required Username';
  } 
  if (!values.text) {
    errors.text = 'Required Comment'
  }
  return errors;
}

const onSubmit = (values, setSubmitting, add_comment, articleId, resetForm, ...rest) => {
  console.log('222333', values, add_comment, rest)
    setTimeout(() => {
      //alert(JSON.stringify(values, null, 2));
      add_comment({...values, articleId})
      setSubmitting(false);
      resetForm()
    }, 400);
}

const render = (props) => {
  return (
    <Fragment>
        <Form noValidate onSubmit={props.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                value={props.values.username}
                onChange={props.handleChange}
                isValid={props.touched.username && !props.errors.username}
              />
              {props.errors.username && props.touched.username && props.errors.username}
              <Form.Control.Feedback>Username looks good</Form.Control.Feedback>
            </Form.Group>
            </Form.Row>

            <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea" 
                rows="3"
                type="text"
                name="text"
                placeholder="Comment"
                value={props.values.text}
                onChange={props.handleChange}
                isValid={props.touched.text && !props.errors.text}
              />
              {props.errors.text && props.touched.text && props.errors.text}
              <Form.Control.Feedback>Looks good</Form.Control.Feedback>
            </Form.Group>
            </Form.Row>     
            
            <Form.Row>
            <Button variant="primary" type="submit" disabled={props.isSubmitting}>
              Submit
            </Button>
            </Form.Row>
        </Form>
    </Fragment>
        )
}


const mapStateToProps = (state, props) => {
  // console.log('mapStateToProps of Articles', state)
  return {
  // l: getFilteredArticles(state, props),
  //articles: getArticlesInArray(state, props),
  // comments: getCommentsInArray(state,props),
  comments: filteredComments(state, props)
  }
}



const mapDispatchToProps = {
  // loadArticles: articles_thunk,
  // loadComments: comments_thunk,
  addComment: comments_add_thunk,
}



export default connect(mapStateToProps, mapDispatchToProps)(CommentList)