import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { SignInFlow } from '../types'
import { useState } from 'react'
import { useAuthActions } from '@convex-dev/auth/react'
import { TriangleAlert } from 'lucide-react'

interface SignInCardProps {
    setState: (state: SignInFlow) => void;
}

const SignInCard = ({ setState }: SignInCardProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState('')
    const { signIn } = useAuthActions();

    const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true);
        signIn("password", { email, password, flow: "signIn" }).catch(() => {
            setError("Invalid email or password")
        }).finally(() => {
            setPending(false)
        })
    }

    const onProviderSignIn = (value: "github" | "google") => {
        setPending(true);
        signIn(value)
            .finally(() => setPending(false))
    }

    return (
        <Card className='w-full h-full p-8'>
            <CardHeader className='px-0 pt-0'>
                <CardTitle>Login to continue</CardTitle>
                <CardDescription>Use your email or another service to continue</CardDescription>
            </CardHeader>
            <CardContent className='space-y-5 px-0 pb-0'>
                {!!error && <div className='bg-destructive/15 flex items-center p-3 rounded-md gap-x-2 text-sm text-destructive mb-3'>
                    <TriangleAlert className='size-4' />
                    <p>{error}</p>
                </div>}
                <form onSubmit={onPasswordSignIn} className='space-y-2.5'>
                    <div className='flex flex-col gap-2'>
                        <Input
                            name='email'
                            type='email'
                            disabled={pending}
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                        />
                        <Input name="flow" type="hidden" value={'signIn'} />
                        <Input
                            name='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            required
                            disabled={pending}
                        />
                        <Button className='w-full' size='lg' disabled={pending} type='submit'>
                            Continue
                        </Button>
                    </div>
                </form>
                <Separator />

                <div className=' flex flex-col gap-y-2.5'>
                    <Button
                        className='w-full relative'
                        size='lg'
                        disabled={pending}
                        onClick={() => onProviderSignIn("google")}
                        variant='outline'
                    >
                        <FcGoogle className='size-5 absolute top-3 left-3' /> Continue with Google
                    </Button>
                    <Button
                        className='w-full relative'
                        size='lg'
                        disabled={pending}
                        onClick={() => onProviderSignIn("github")}
                        variant='outline'
                    >
                        <FaGithub className='size-5 absolute top-3 left-3' />Continue with Github
                    </Button>
                </div>
                <p className='text-xs text-muted-foreground'>Don&apos;t have an account? <span onClick={() => setState("signUp")} className='cursor-pointer text-sky-700 hover:underline'>Sign Up</span></p>

            </CardContent>
        </Card>
    )
}

export default SignInCard