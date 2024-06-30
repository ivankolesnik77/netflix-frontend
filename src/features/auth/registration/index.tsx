import { useDispatch } from 'react-redux'

import ChoosePlan from './ChoosePlan'
import Payment from './Payment'
import RegisterForm from './RegisterForm'
import React, { FC, useState } from 'react'
import { setUser } from '../../../store/reducers/user.slice'
import { setPassword } from '../../../store/reducers/auth.slice'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/utils/hooks'

export enum RegistrationStage {
    LoginForm = 'LOGIN_FORM',
    PaymentForm = 'PAYMENT_FORM',
    PaymentPlan = 'PAYMENT_PLAN',
}

const Registration = () => {
    const [subscriptionType, setSubscriptionType] = useState()
    const [stage, setStage] = useState(RegistrationStage.LoginForm)
    const dispatch = useDispatch()

    const renderForm = () => {
        switch (stage) {
            case RegistrationStage.LoginForm:
                return (
                    <RegisterForm
                        stage={stage}
                        onSubmit={(data) => {
                            setStage(RegistrationStage.PaymentPlan)
                            dispatch(setPassword(data.password))
                            dispatch(setUser({ email: data.email }))
                        }}
                    />
                )
            case RegistrationStage.PaymentPlan:
                return (
                    <ChoosePlan
                        stage={stage}
                        handleSubmit={(subscriptionType) => {
                            setStage(RegistrationStage.PaymentForm)
                            dispatch(setUser({ subscriptionType }))
                        }}
                    />
                )
            case RegistrationStage.PaymentForm:
                return (
                    <Payment
                        stage={stage}
                        handleSubmit={() =>
                            setStage(RegistrationStage.LoginForm)
                        }
                    />
                )
        }
    }
    const isAuth = useAppSelector((state) => state.auth.isAuth)
    const router = useRouter()

    if (isAuth) {
        router.push('/')
    }

    return (
        <div className="h-[100vh] bg-white text-left text-black">
            {renderForm()}
        </div>
    )
}

export default Registration
