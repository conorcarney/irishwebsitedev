"use server";

import { Resend } from "resend";
import { site } from "@/data/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<"name" | "email" | "message", string>>;
};

function field(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function sendMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = field(formData, "name");
  const email = field(formData, "email");
  const message = field(formData, "message");
  const fieldErrors: ContactState["fieldErrors"] = {};

  if (name.length < 2) fieldErrors.name = "Add your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Add an email address you can be reached on.";
  }
  if (message.length < 10) fieldErrors.message = "Add a short note about the site you need.";
  if (message.length > 2000) fieldErrors.message = "Keep the note under 2,000 characters.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "", fieldErrors };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      message: "The contact form is not set up to send yet.",
      fieldErrors: {},
    };
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM ?? "irishwebdeveloper <onboarding@resend.dev>";
  const { error } = await resend.emails.send({
    from,
    to: site.email,
    replyTo: email,
    subject: `Website enquiry from ${name.replace(/[\r\n]/g, " ").slice(0, 80)}`,
    text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
  });

  if (error) {
    console.error("Resend rejected the contact message", error);
    return {
      status: "error",
      message: "The message could not be sent. Try again in a moment.",
      fieldErrors: {},
    };
  }

  return {
    status: "success",
    message: `Message sent. I will reply to ${email}.`,
    fieldErrors: {},
  };
}
