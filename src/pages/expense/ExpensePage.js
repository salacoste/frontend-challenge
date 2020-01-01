import React, { useContext} from 'react'
import {ThemeContext, themes} from '../../context/Context'
import {useParams} from 'react-router-dom'


export default function ExpensePage() {
  let context = useContext(ThemeContext)
  let { id } = useParams();


  return (
  <h1>{id}</h1>
  )
}