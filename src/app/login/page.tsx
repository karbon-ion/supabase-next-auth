"use client"

import Link from 'next/link'
import { login, signup } from './actions'
import { Formik, Form } from 'formik'
import { LabeledField } from '@/components/ui/form-utilities'
import { Button } from '@/components/ui/button'
import * as Yup from 'yup'



export default function LoginPage() {

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required()
  })

  console.log(process.env, 'env')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl text-black font-semibold mb-6">Login</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            login(values)
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="mb-4">
                <LabeledField name='email' label='Email' />
              </div>
              <div className="mb-4">
                <LabeledField name='password' type='password' label='Password' />
              </div>
              <div className="flex items-center justify-between">
                <Button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                  type='submit'
                >
                  Login
                </Button>
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    className="text-blue-500 cursor-pointer hover:underline"
                    href='/signup'
                  >
                    Create one
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

