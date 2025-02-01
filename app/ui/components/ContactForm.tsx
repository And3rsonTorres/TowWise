/**
 * A React component that renders a contact form with fields for name, email, and message. The form uses the `react-hook-form` library with the `zod` validation library to handle form validation. When the form is submitted, the data is sent to the `/api/contact` endpoint using a `fetch` request.
 *
 * The component also displays a success toast message after the form is successfully submitted, and resets the form fields.
 */

"use client";
import { ContactSchema } from "@/app/lib/utils/Validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { Button, Input, Textarea } from "@heroui/react";

const ContactForm = () => {
  const Form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
  });

  const OnSubmit = async (data: z.infer<typeof ContactSchema>) => {
    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <div className={`flex justify-center bg-slate-950/25  mt-10 mb-4`}>
      <form
        onSubmit={Form.handleSubmit(async (data) => {
          await OnSubmit(data);
          (() =>
            toast.success(
              "Your message has been sent! Thanks for your time."
            ))();
          Form.reset();
        })}
        className=" max-w-2xl shadow bg-slate-950/25 shadow-white/50 justify-center items-center rounded-lg mx-auto *:rounded-full px-5 sm:px-10 md:px-16"
      >
        <h2 className="text-2xl w-fit text-center bg-background/45 mx-auto my-4 px-4">
          Contact Us
        </h2>
        <div className=" flex  flex-wrap font-medium gap-4 mb-4  mx-auto ">
          <Input
            type="text"
            label="Name"
            placeholder="Enter your name"
            id="Name"
            variant="faded"
            isInvalid={!!Form.formState.errors.Name}
            errorMessage={Form.formState.errors.Name?.message}
            color={Form.formState.errors.Name ? "danger" : "default"}
            {...Form.register("Name")}
            className="w-full"
          />
          <Input
            type="email"
            label="Email"
            id="Email"
            variant="faded"
            isInvalid={!!Form.formState.errors.Email}
            errorMessage={Form.formState.errors.Email?.message}
            color={Form.formState.errors.Email ? "danger" : "default"}
            placeholder="Enter your email"
            {...Form.register("Email", { required: false })}
          />
          <Textarea
            type="text"
            label="Message"
            id="Message"
            variant="faded"
            isInvalid={!!Form.formState.errors.Message}
            errorMessage={Form.formState.errors.Message?.message}
            color={Form.formState.errors.Message ? "danger" : "default"}
            placeholder="Please share any inquiries or suggestions you have for this app"
            {...Form.register("Message")}
            rows={5}
          />
        </div>
        <Button
          type="submit"
          color="primary"
          className="w-11/12 flex mx-auto p-4 mb-4"
          size="lg"
          variant="shadow"
        >
          Submit
        </Button>
        <Toaster />
      </form>
    </div>
  );
};
export default ContactForm;
