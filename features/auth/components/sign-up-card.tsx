import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

const SignUpCard = ({ setState }: SignUpCardProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const { signIn } = useAuthActions();

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setPending(true);
    signIn("password", { name, email, password, flow: "signUp" })
      .catch(() => {
        setError("Something went wrong");
      })
      .finally(() => {
        setPending(false);
      });
  };

  const onProviderSignUp = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => setPending(false));
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Signup to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        {!!error && (
          <div className="bg-destructive/15 flex items-center p-3 rounded-md gap-x-2 text-sm text-destructive mb-3">
            <TriangleAlert className="size-4" />
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={onPasswordSignUp} className="space-y-2.5">
          <div className="flex flex-col gap-2">
            <Input
              disabled={pending}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
            <Input
              type="email"
              disabled={pending}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              id="password"
              disabled={pending}
            />
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              id="confirm-password"
              disabled={pending}
            />
            <Button
              className="w-full"
              size="lg"
              disabled={pending}
              type="submit"
            >
              Continue
            </Button>
          </div>
        </form>
        <Separator />

        <div className=" flex flex-col gap-y-2.5">
          <Button
            className="w-full relative"
            size="lg"
            disabled={pending}
            onClick={() => {
              onProviderSignUp("google");
            }}
            variant="outline"
          >
            <FcGoogle className="size-5 absolute top-3 left-3" /> Continue with
            Google
          </Button>
          <Button
            className="w-full relative"
            size="lg"
            disabled={pending}
            onClick={() => {
              onProviderSignUp("github");
            }}
            variant="outline"
          >
            <FaGithub className="size-5 absolute top-3 left-3" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          already have an account?{" "}
          <span
            onClick={() => setState("signIn")}
            className="cursor-pointer text-sky-700 hover:underline"
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
