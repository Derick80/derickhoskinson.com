"use client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { sendEmail } from "@/app/actions/auth";
import { useFormState } from "react-dom";
const initialState = {
  email: "",
  message: "",
};
const EmailForm = () => {
  // update this to useActionState when it's available
  const [state, action, isPending] = useFormState(sendEmail, initialState);

  return (
    <form className="flex flex-col gap-4" action={ action }>
      <div style={ { display: "none" } }>
        <input type="hidden" name="shield" value="" />
      </div>
      <Label htmlFor="email">
        Email
        <Input name="email" type="email" required />
      </Label>
      { state?.message && (
        <p className="animate-in fade-in mt-1 border border-blue-500 text-xs font-medium text-red-500">
          { typeof state?.message === "string"
            ? state.message
            : JSON.stringify(state?.message) }
        </p>
      ) }
      <Button name="sendEmail" type="submit" disabled={ isPending }>
        Send Email
      </Button>
    </form>
  );
};

export default EmailForm;
