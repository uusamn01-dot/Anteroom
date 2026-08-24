/* ============================================================
   Oels — site configuration
   Edit the two values below, then the booking form is live.

   WHICH KEY GOES HERE
   The **anon / publishable** key. It is designed to be public and it is
   safe here because row level security in supabase/schema.sql lets
   anonymous callers INSERT a booking and do nothing else. Anyone can
   read this file; nobody can read a booking with it.

   NEVER put the service_role key in this file, or anywhere else in this
   website. It bypasses row level security entirely. If it ever leaks,
   rotate it in the Supabase dashboard immediately.

   Find both under: Supabase dashboard -> Project Settings -> API.
   ============================================================ */
window.OELS_CONFIG = {
  // e.g. "https://abcdefghijklm.supabase.co"
  supabaseUrl: "",

  // the anon / publishable key, NOT service_role
  supabaseAnonKey: "",

  // Where enquiries should go if the form cannot reach Supabase.
  fallbackEmail: "enquiries@oels.dev"
};
