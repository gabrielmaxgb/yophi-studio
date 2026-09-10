import { redirect } from "next/navigation";

/** Legacy URL — same portal for studio and clients. */
export default function EstudioRedirectPage() {
  redirect("/conta");
}
