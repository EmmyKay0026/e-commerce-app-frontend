import { supabase } from "@/config/supabase";

async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      // The URL Google will redirect back to after sign-in (e.g., your homepage)
      redirectTo: "http://localhost:3000/dashboard",
      // Optional: Add specific Google scopes if needed
      // scopes: ['https://www.googleapis.com/auth/calendar']
    },
  });
}
