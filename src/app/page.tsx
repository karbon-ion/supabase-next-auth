import { supabase } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default function Home() {

  async function getUser(){
    try{
      const {data, error} = await supabase.auth.getUser()
      if(error || !data?.user){
        redirect('/login')
      }else{
        redirect('/user')
      }
    }catch(er){
      console.log(er)
    }
  }

  return (<>{getUser()}</>);
}
