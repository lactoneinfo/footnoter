import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function RegisterForm() {
  return (
    <div className="w-full h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Create an account by filling in the information below.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* ユーザー名 */}
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" placeholder="Your username" required />
          </div>

          {/* メールアドレス */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>

          {/* パスワード */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>

          {/* パスワード確認 */}
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full">Register</Button>

          {/* すでにアカウントがある場合のリンク */}
          <p className="text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
