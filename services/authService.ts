import { supabase } from "@/config/supabase";

async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      // The URL Google will redirect back to after sign-in (e.g., your homepage)
      redirectTo: "http://localhost:3000",
      // Optional: Add specific Google scopes if needed
      // scopes: ['https://www.googleapis.com/auth/calendar']
    },
  });
}

export async function sendResetEmail(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    // This is the URL in your app where the user will land after clicking the email link.
    // This must be added to your Supabase Dashboard as a Redirect URL.
    redirectTo: "https://example.com/update-password",
  });

  if (error) {
    console.error("Error sending password reset email:", error.message);
    // Handle the error (e.g., show an alert)
  } else {
    // console.log("Password reset email sent:", data);
    // Notify the user to check their email
  }
}
