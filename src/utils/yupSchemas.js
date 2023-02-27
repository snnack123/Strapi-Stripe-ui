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
