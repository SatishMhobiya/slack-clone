import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader, LogOutIcon } from "lucide-react";
import { useCurrentUser } from "./api/use-current-user";
import { useAuthActions } from "@convex-dev/auth/react";
// import { api } from '@/convex/_generated/api'

const UserButton = () => {
  const { signOut } = useAuthActions();

  const { isLoading, data } = useCurrentUser();
  if (isLoading) {
    return <Loader className="size-4 animate-spin" />;
  }

  if (!data) {
    return null;
  }

  const { name, image } = data;
  const avatarFallback = name!.charAt(0).toUpperCase();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="outline-none relative">
        <Avatar className="rounded-md size-10 hover:opacity-75 transition">
          <AvatarImage className="rounded-md" referrerPolicy="no-referrer" alt={name} src={image} />
          <AvatarFallback className="rounded-md bg-sky-500 text-white ">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOutIcon />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
