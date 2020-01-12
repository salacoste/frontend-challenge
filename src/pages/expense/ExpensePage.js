import React, { useContext, Fragment, useEffect, useState} from 'react'
import {ThemeContext, themes} from '../../context/Context'
import {useParams} from 'react-router-dom'
import { Container, Row, Col, Button, Form, FormGroup, Alert, Label, CustomInput, FormText, Spinner, ListGroup,ListGroupItem } from 'reactstrap'
import {useSelector, useDispatch} from 'react-redux'
import {CSSTransition} from 'react-transition-group'
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'
import _ from 'lodash'
import {expenses_thunk, expenses_edit_comment_thunk, expenses_image_loading_thunk} from '../../store/reducers/expenses/expensesReducer'


export default function ExpensePage(props) {
  let context = useContext(ThemeContext)
  console.log(context, '1100', props)

  let { id } = useParams();
  let {history} = props
  const dispatch = useDispatch()

  const expenses = useSelector((state)=> {
    return state.expenses
  })

  if (expenses.loaded) {
    var expense = expenses.entities[id] 
    console.log('expense', expense)
  }

  console.log('111', expenses)

  useEffect(() => 
  {
  !expenses.loaded && dispatch(expenses_thunk())

  }, []);


  const [file, setFile] = useState('')
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const _handleSubmit = (e)=> {
    e.preventDefault();
    if (file === '') {setError(true); return false}
    // TODO: do something with -> useState
    dispatch(expenses_image_loading_thunk(id, file, setLoading, ()=> {}))
    setLoading(true)
    // console.log('handle uploading-', file);
  }

  const _handleImageChange = (e) => {
    e.preventDefault();
    setError(false)

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file)
      setImagePreviewUrl(reader.result)
    }

    reader.readAsDataURL(file)
  }

  let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
      <div className="text-center mt-4">
        <img src={imagePreviewUrl} alt="" style={{maxWidth:'500px'}}/>
      </div>
      );
    } else {
      $imagePreview = (<div className="previewText"></div>);
    }





  const _loader = () => {
    if (!expense) {
      return (
      <Fragment>
        <Col className="mt-4">
          <Container>
            <Alert color="warning">
              There are no expense data yet. Please, start your backend processing.
            </Alert>
          </Container>
        </Col>
      </Fragment>)
    }
    return (
      <Fragment>
      <Row>
        <Col>
          <Container>
          <h3 className="mt-4">Expense details of the expense {id}</h3>
          </Container>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
            <Container>
            <Button color="primary" outline disabled = {!history.length} onClick={()=> {history.goBack()}}>
              Back
            </Button>
            </Container>
        </Col>
      </Row>   
      <Row className="mt-3">
        <Col>
          <Container>
        <h3>Information</h3>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col sm="5">
          <Container>
            <span>
              Expense ID:
            </span>
          </Container>
        </Col>
        <Col sm="7">
          <Container>
            {expense.id}
          </Container>
        </Col>
      </Row>
      <Row>
        <Col sm="5">
          <Container>
            <span>
              Merchant:
            </span>
          </Container>
        </Col>
        <Col sm="7">
          <Container>
            {expense.merchant}
          </Container>
        </Col>
      </Row>
      <Row>
        <Col sm="5">
          <Container>
            <span>
              Date:
            </span>
          </Container>
        </Col>
        <Col sm="7">
          <Container>
            {new Date(expense.date).toLocaleString()}
          </Container>
        </Col>
      </Row>
      <Row>
        <Col sm="5">
          <Container>
            <span>
              User:
            </span>
          </Container>
        </Col>
        <Col sm="5">
          <Container>
            {expense.user.first} {expense.user.last}
          </Container>
        </Col>
      </Row>
      <Row>
        <Col sm="5">
          <Container>
            <span>
              Comment:
            </span>
          </Container>
        </Col>
        <Col sm="5">
          <Container>
            <RIETextArea 
              className="font-italic pointer	alert alert-primary" style={{}}
              value={expense.comment?  expense.comment : 'Add a comment'}
              change={(task)=>{
                  dispatch(expenses_edit_comment_thunk(expense.id, task.comment))

              }}
              propName='comment'
              validate={_.isString} />
          </Container>
        </Col>
              </Row>

              {expense.receipts.length ? (
              <Row className="mt-4">
                <Col>
                  <Container>
                    <ListGroup>
                    {expense.receipts.map((r, i)=> {
                      return (
                          <ListGroupItem key={expense.id+i}>
                            <a  href={`http://localhost:3000${r.url}`} target="_blank" rel="noopener noreferrer">
                              Receipt {i}
                            </a>
                          </ListGroupItem>
                      )
                    })}
                    </ListGroup> 

                      
                  </Container>
                </Col>
              </Row>  
              ) : (
                <Fragment>
                <Row className="mt-4">
                  <Col>
                    <Container>
                      <Alert color="warning">
                        There are no files yet. Please, use form to upload the receipt.
                      </Alert>
                    </Container>
                  </Col>
                </Row> 
                </Fragment>
                )    }

        <Row className="mt-2">
        <Col>
          <Container>
            <Form onSubmit={(e)=>_handleSubmit(e)}>
            <FormGroup>
              <Label for="upload">File Browser</Label>
              <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" onChange={(e)=>_handleImageChange(e)}/>
              <FormText color="muted">
                Make sure that receipt's photo is clear to read, not blurred.
                </FormText>
            </FormGroup>
              {error && <Alert color="warning">
                You should attach the file before the form sending.
              </Alert>
              }
              <Button>Submit</Button>
            </Form>
            <CSSTransition in={Boolean(imagePreviewUrl)} timeout={500} classNames="my-node"
            >
              {loading ?  <div className='mt-3 text-center'><Spinner style={{ width: '3rem', height: '3rem', display: 'inline-block' }}/></div> :
                imagePreviewUrl? $imagePreview : <Container></Container>
            }
            </CSSTransition>
          </Container>
        </Col>
      </Row>

      </Fragment>
    )

  }

  return (
    
    <Fragment>
{          console.log('2221', expense)
}

      <Container>
          {_loader()}
      </Container>
      
    </Fragment>
  )
}