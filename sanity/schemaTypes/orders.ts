import { Rule } from "@sanity/types";

export default {
  name: "orders",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "shippingForm",
      title: "Shipping Form",
      type: "reference",
      to: [{ type: "contactForm" }],
      validation: (Rule: Rule) =>
        Rule.required().error("Shipping form reference is required"),
    },
    {
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "TrackingId",
              title: "TrackingId",
              type: "string",
              readOnly: true, // Sanity automatically assigns this
            },
            {
              name: "name",
              title: "Product Name",
              type: "string",
              validation: (Rule: Rule) =>
                Rule.required().error("Product name is required"),
            },
            {
              name: "price",
              title: "Price",
              type: "number",
              validation: (Rule: Rule) =>
                Rule.required()
                  .positive()
                  .error("Valid product price is required"),
            },
            {
              name: "qty",
              title: "Quantity",
              type: "number",
              validation: (Rule: Rule) =>
                Rule.required()
                  .integer()
                  .positive()
                  .error("Quantity must be a positive integer"),
            },
          ],
        },
      ],
      validation: (Rule: Rule) =>
        Rule.min(1).error("At least one product must be added to the order"),
    },
  ],
};
