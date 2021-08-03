import {auth} from "boot/supabase";

export async function loadDirectories ({commit}) {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/directories`, {
      method: "GET",
      headers: {authorization: `Bearer ${auth.session().access_token}`}
    })
    const {data, error} = await response.json()
    if (error) {
      console.log(error)
    } else {
      commit('setDirectories', data)
    }
  } catch (e) {
    console.log(e)
  }
}

