import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
const locales = ["en", "ar", "jr"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

// import { notFound } from 'next/navigation';
// import { getRequestConfig } from 'next-intl/server';

// // Shared config for supported locales
// const locales = ['en', 'ar', 'jr'];

// export default getRequestConfig(async ({ locale }) => {
//   // Validate the incoming `locale` parameter
//   if (!locales.includes(locale as any)) {
//     notFound();
//   }

//   try {
//     // Fetch the messages from the API based on the locale
//     const response = await fetch(`https://api.example.com/messages/${locale}`);

//     // Check if the response is OK (status code 200-299)
//     if (!response.ok) {
//       throw new Error(`Failed to fetch messages for locale: ${locale}`);
//     }

//     // Parse the JSON data from the response
//     const messages = await response.json();

//     return {
//       messages
//     };
//   } catch (error) {
//     // Handle errors gracefully, possibly logging the error for debugging
//     notFound();
//   }
// });
