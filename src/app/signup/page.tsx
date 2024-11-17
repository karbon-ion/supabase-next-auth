
"use client"

import { Form, Formik } from 'formik';
import Link from 'next/link';
import { signup } from '../login/actions';
import { LabeledField } from '@/components/ui/form-utilities';
import { Button } from '@/components/ui/button';
import * as Yup from 'yup'



export default function SignUpPage() {

    const validationSchema = Yup.object({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6),
        cPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required()
    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl text-black font-semibold mb-6">Sign Up</h2>
                <Formik
                    initialValues={{ name: '', email: '', password: '', cPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        signup(values)
                    }}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <LabeledField name='name' label='Name' />
                            </div>
                            <div className="mb-4">
                                <LabeledField name='email' label='Email' />
                            </div>
                            <div className="mb-4">
                                <LabeledField name='password' label='Password' type='password' />
                            </div>
                            <div className="mb-4">
                                <LabeledField name='cPassword' label='Confirm Password' type='password' />
                            </div>
                            <div className="flex items-center justify-between">
                                <Button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    Sign Up
                                </Button>
                                <p className="text-sm text-gray-600">
                                    Already have an account?
                                    <Link
                                        className="text-blue-500 cursor-pointer hover:underline" href='/login'
                                    >
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};