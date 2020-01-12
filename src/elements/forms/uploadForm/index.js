import React, {Fragment, useState, } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, Container, ListGroupItem, ListGroup, Alert, CustomInput, Spinner, Link} from 'reactstrap';
import {CSSTransition} from 'react-transition-group'
import {useDispatch} from 'react-redux'
import {expenses_image_loading_thunk} from '../../../store/reducers/expenses/expensesReducer'
import './uploadForm.css'


const UploadForm = (props) => {

  const dispatch = useDispatch()

  const {expense, id, toggle} = props
  const receipts = expense.receipts

  const [file, setFile] = useState('')
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const _handleSubmit = (e)=> {
    e.preventDefault();
    if (file === '') {setError(true); return false}
    // TODO: do something with -> useState
    dispatch(expenses_image_loading_thunk(id, file, setLoading, toggle))
    setLoading(true)
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

  return (
    <Fragment>
    <Row style={{margin: '30px auto'}}>
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
      <Col sm="5">
        <Container>
          <span>
            User:
          </span>
        </Container>
      </Col>
      <Col sm="7">
        <Container>
          {expense.user.first} {expense.user.last}
        </Container>
      </Col>
    </Row>
    {expense.receipts.length ? (
    <Row>
      <Col>
        <Container>
          <ListGroup>
          {receipts.map((r, i)=> {
            return (
                <ListGroupItem key={r.url}>
                  <a  href={`http://localhost:3000${r.url}`} target="_blank" rel="noopener noreferrer">
                    Receipt {i+1}
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
      <Row>
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

  );
}

export default UploadForm;