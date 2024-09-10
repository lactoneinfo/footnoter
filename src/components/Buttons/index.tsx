import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { Bookmark } from "lucide-react"
import { Star } from "lucide-react"

export function ShareButton() {
  return (
    <Button variant="outline" size="icon">
      <Share2 className="h-4 w-4" />
    </Button>
  );
}

export function BookmarkButton() {
  return (
    <Button variant="outline" size="icon">
      <Bookmark className="h-4 w-4" />
    </Button>
  );
}

export function StarButton() {
  return (
    <Button variant="outline" size="icon">
      <Star className="h-4 w-4" />
    </Button>
  );
}
  
export function LoginButton() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  )
}