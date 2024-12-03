
"use client"

import { Form, Formik } from 'formik';
import { signup } from '../login/actions';
import { LabeledField } from '@/components/ui/form-utilities';
import { Button } from '@/components/ui/button';
import * as Yup from 'yup'
import { useState } from 'react';
import { useAppContext } from '@/components/context/appContext';
import { Link } from '@/i18n/routing';



export default function SignUpPage() {

    const [error, setError] = useState<string>('')
    const [btnLoading, setBtnLoading] = useState(false)
    const {t} = useAppContext()

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
                    onSubmit={async (values) => {
                        setBtnLoading(true)
                        const {error} = await signup(values)
                        setError(error.message)
                        setBtnLoading(false)
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
                                isLoading={btnLoading}
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    {btnLoading ? "Loading...":"Sign Up"}
                                </Button>
                                <p className="text-sm text-gray-600">
                                    {t.signup.already_have_account}
                                    <Link
                                        className="text-blue-500 cursor-pointer hover:underline" href='/login'
                                    >
                                        {t.signup.login}
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