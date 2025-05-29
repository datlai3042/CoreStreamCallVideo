import { differenceInMilliseconds, differenceInSeconds } from "date-fns";
import moment from "moment";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const privateRouter = ["/dashboard", "/me", "/settings", "/v1/api/token/refresh-token"];
const authRouter = ["/login", "/register", "/"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

      
      const requestHeaders = new Headers(request.headers);
      const response = NextResponse.next({
            headers: requestHeaders,
      });

      



    

   

      return response;
}

// See "Matching Paths" below to learn more
export const config = {
      matcher: ["/dashboard", "/settings", "/me", "/login", "/register", "/", "/form/:path*", "/v1/api/token/refresh-token"],
};