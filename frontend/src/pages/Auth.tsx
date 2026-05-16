import { Button } from "@/components/ui/button";
import { createSupabaseClient } from "@/lib/supabase/client";

const supabase = createSupabaseClient();
const Auth = () => {
  async function login(provider: "google" | "github") {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider
    })
    if (error) {
      console.error(error);
    }else {
      await console.log(data);
      
    }
  }
  return (
    <div>
      <Button onClick={() => login("google")}>Login with Google</Button>
      <Button onClick={() => login("github")}>Login with GitHub</Button>
    </div>
  );
};

export default Auth;
