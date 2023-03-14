import { object, ref, string } from 'yup';

export const loginSchema = object({
    identifier: string().email('Must enter a valid email').required('Email is required'),
    password: string().required('Password is required')
})

export const resetPasswordSchema = object({
    password: string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    passwordConfirmation: string().required('Password confirmation is required').min(6, 'Password confirmation must be at least 6 characters').oneOf([ref('password')], 'Passwords must match')
})

export const registerSchema = object({
    username: string().required('Username is required').min(3, 'Username must be at least 3 characters').max(20, 'Username must be less than 20 characters'),
    email: string().email('Must enter a valid email').required('Email is required'),
    name: string().required('Name is required').min(3, 'Name must be at least 3 characters').max(20, 'Name must be less than 20 characters'),
    password: string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    passwordConfirmation: string().required('Password confirmation is required').min(6, 'Password confirmation must be at least 6 characters').oneOf([ref('password')], 'Passwords must match')
})

export const creditCardSchema = object({
    name: string().required('Name is required').min(3, 'Name must be at least 3 characters').max(20, 'Name must be less than 20 characters'),
    cardNumber: string().required('Card number is required').min(16, 'Card number must be at least 16 characters').max(16, 'Card number must be less than 16 characters'),
    expirationDate: string().required('Expiration date is required').min(5, 'Expiration date must be at least 5 characters').max(5, 'Expiration date must be less than 5 characters'),
    cvc: string().required('CVC is required').min(3, 'CVC must be at least 3 characters').max(3, 'CVC must be less than 3 characters')
})

export const updateEmailSchema = object({
    email: string().email('Must enter a valid email').required('Email is required'),
    confirmEmail: string().email('Must enter a valid email').required('Email confirmation is required').oneOf([ref('email')], 'Emails must match')
})

export const updatePasswordSchema = object({
    password: string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    passwordConfirmation: string().required('Password confirmation is required').min(6, 'Password confirmation must be at least 6 characters').oneOf([ref('password')], 'Passwords must match')
})
