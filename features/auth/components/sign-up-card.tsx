import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { SignInFlow } from '../types'
import { useState } from 'react'

interface SignUpCardProps {
    setState: (state: SignInFlow) => void;
}

const SignUpCard = ({ setState }: SignUpCardProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    return (
        <Card className='w-full h-full p-8'>
            <CardHeader className='px-0 pt-0'>
                <CardTitle>Signup to continue</CardTitle>
                <CardDescription>Use your email or another service to continue</CardDescription>
            </CardHeader>
            <CardContent className='space-y-5 px-0 pb-0'>
                <form className='space-y-2.5'>
                    <div className='flex flex-col gap-2'>
                        <Input
                            type='email'
                            disabled={false}
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                        />
                        <Input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            required
                        />
                        <Input
                            type='password'
                            value={confirmPassword}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Confirm Password'
                            required
                        />
                        <Button className='w-full' size='lg' disabled={false} type='submit'>
                            Continue
                        </Button>
                    </div>
                </form>
                <Separator />

                <div className=' flex flex-col gap-y-2.5'>
                    <Button
                        className='w-full relative'
                        size='lg'
                        disabled={false}
                        onClick={() => { }}
                        variant='outline'
                    >
                        <FcGoogle className='size-5 absolute top-3 left-3' /> Continue with Google
                    </Button>
                    <Button
                        className='w-full relative'
                        size='lg'
                        disabled={false}
                        onClick={() => { }}
                        variant='outline'
                    >
                        <FaGithub className='size-5 absolute top-3 left-3' />Continue with Github
                    </Button>
                </div>
                <p className='text-xs text-muted-foreground'>already have an account? <span onClick={() => setState("signIn")} className='cursor-pointer text-sky-700 hover:underline'>Sign In</span></p>

            </CardContent>
        </Card>
    )
}

export default SignUpCard