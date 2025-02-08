import { Rule } from "@sanity/types";

export default {
  name: "contactForm",
  title: "Contact Form",
  type: "document",
  fields: [
    {
      name: "fullName",
      title: "fullName",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Name is required"),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule: Rule) =>
        Rule.required().email().error("A valid email address is required"),
    },
    {
        name: "shippingAddress",
        title: "shippingAddress",
        type: "string",
        validation: (Rule: Rule) => Rule.required().error("shippingAddress is required"),
      },
      {
        name: "phoneNumber",
        title: "phoneNumber",
        type: "string",
       
      },
  
  ],
}