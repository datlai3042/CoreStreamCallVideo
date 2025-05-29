import { cookies } from "next/headers";

export async function POST(request: Request) {
      const { access_token, refresh_token, client_id, expireToken,  expireCookie } = await request.json();
      const expiresRT = new Date(expireCookie).getTime();


      cookies().set({
            name: "next_client_id",
            value: client_id,
            httpOnly: true,
            path: "/",
            expires: expiresRT,
      });

   

      cookies().set({
            name: "next_access_token",
            value: access_token,
            httpOnly: true,
            path: "/",
            expires: expiresRT,
      });

      cookies().set({
            name: "next_refresh_token",
            value: refresh_token,
            httpOnly: true,
            path: "/",
            expires: expiresRT,
      });

      cookies().set({
            name: "next_expire_token",
            value: expireToken,
            httpOnly: true,
            path: "/",
            expires: expiresRT,
      });

      cookies().set({
            name: "next_expire_cookie",
            value: expireCookie,
            httpOnly: true,
            path: "/",
            expires: expiresRT,
      });

      return Response.json({ access_token, refresh_token, client_id, expireToken, expiresRT,expireCookie});
}