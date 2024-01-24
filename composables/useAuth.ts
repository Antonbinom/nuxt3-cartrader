export default function useAuth() {
  const supabase = useSupabaseClient();

  const login = async (provider: any) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    });
    if (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    navigateTo("/login");
  };

  return { login, logout };
}
