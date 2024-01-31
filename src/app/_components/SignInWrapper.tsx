import { SignInButton } from "@clerk/nextjs";

export default function SignInWrapper(props: { children: React.ReactNode }) {
  return <SignInButton mode="modal">{props.children}</SignInButton>;
}
