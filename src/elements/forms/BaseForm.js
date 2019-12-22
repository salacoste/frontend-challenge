import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

// Wrapper over Formik. For more info check the docs https://github.com/jaredpalmer/formik

export default class BaseForm extends PureComponent {
  render () {
    const {
      initialValues,
      validationSchema,
      validate,
      onSubmit,
      render
    } = this.props
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validate={validate}
        onSubmit={onSubmit}
        render={render}
        
      />
    )
  }
}

BaseForm.propTypes = {
  render: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  validationSchema: PropTypes.func,
  onSubmit: PropTypes.func,
  validate: PropTypes.func
}



// <BaseForm
//   initialValues={user: 'User', text: 'Template text'}
//   validationSchema={validationSchema}
//   validate={validate}
//   onSubmit={onSubmit}
//   render={render}

// />


// validate = {values => {
//   let errors = {};
//   if (!values.username) {
//     errors.username = 'Required';
//   } 
//   if (!values.text) {
//     errors.text = 'Required'
//   }
//   return errors;
// }}


 
// let a = ()=> {
//   return <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.email}
//           />
//           {errors.email && touched.email && errors.email}
//           <input
//             type="password"
//             name="password"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.password}
//           />
//           {errors.password && touched.password && errors.password}
//           <button type="submit" disabled={isSubmitting}>
//             Submit
//           </button>
//         </form>
// }



// const Basic = () => (
//   <div>
//     <h1>Anywhere in your app!</h1>
//     <Formik
//       initialValues={{ email: '', password: '' }}
//       validate={values => {
//         let errors = {};
//         if (!values.email) {
//           errors.email = 'Required';
//         } else if (
//           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//         ) {
//           errors.email = 'Invalid email address';
//         }
//         return errors;
//       }}
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2));
//           setSubmitting(false);
//         }, 400);
//       }}
//     >
//       {({
//         values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         isSubmitting,
//         /* and other goodies */
//       }) => (
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.email}
//           />
//           {errors.email && touched.email && errors.email}
//           <input
//             type="password"
//             name="password"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.password}
//           />
//           {errors.password && touched.password && errors.password}
//           <button type="submit" disabled={isSubmitting}>
//             Submit
//           </button>
//         </form>
//       )}
//     </Formik>
//   </div>
// );