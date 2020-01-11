import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {ListGroup, ListGroupItem} from 'reactstrap'
import UploadForm from '../forms/uploadForm'

const ModalForm = (props) => {
  const {
    buttonLabel,
    className, expense_id,
    modal,
    setModal,
    expenses
  } = props;

  // const [modal, setModal] = useState(false);


  const arrayToObject = (arr) => {
    const a =  arr.reduce((acc, current, i) => {
      // console.log('i is ' + i, acc, current)
      acc[current.id] = current
      return acc
    }, {})
    return a
  }

  let expenseObject = {}
  if (expenses.length>0 && expense_id) {
    console.log('exppp', arrayToObject(expenses)[expense_id]['merchant'])
    expenseObject = arrayToObject(expenses)[expense_id];

  }
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Expense files for the {expenseObject.merchant}'s report</ModalHeader>
        <ModalBody>
          
        </ModalBody>
        <UploadForm expense = {expenseObject} id = {expenseObject.id} toggle= {toggle} />
        
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Close</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalForm