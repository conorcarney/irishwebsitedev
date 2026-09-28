"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendMessage, type ContactState } from "@/app/contact/actions";

const initialContactState: ContactState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initialContactState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} noValidate className="mt-8 grid max-w-xl gap-5">
      <Field id="name" label="Name" error={state.fieldErrors.name} autoComplete="name" />
      <Field
        id="email"
        label="Email"
        type="email"
        error={state.fieldErrors.email}
        autoComplete="email"
      />
      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={2000}
          aria-invalid={state.fieldErrors.message ? true : undefined}
          aria-describedby={state.fieldErrors.message ? "message-error" : undefined}
          className="mt-2 w-full resize-y rounded-lg border border-line bg-card px-3 py-2 text-ink outline-none focus:border-pine"
        />
        {state.fieldErrors.message ? (
          <p id="message-error" className="mt-1 text-sm text-brass">
            {state.fieldErrors.message}
          </p>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="motion-fade rounded-full bg-ink px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
      {state.message ? (
        <p className="text-sm text-muted" role="status">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  id,
  label,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 w-full rounded-lg border border-line bg-card px-3 py-2 text-ink outline-none focus:border-pine"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-brass">
          {error}
        </p>
      ) : null}
    </div>
  );
}
