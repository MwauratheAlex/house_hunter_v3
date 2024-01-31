import { SignUpButton } from "@clerk/nextjs";

export default function SignUpWrapper(props: { children: React.ReactNode }) {
  return <SignUpButton mode="modal">{props.children}</SignUpButton>;
}
