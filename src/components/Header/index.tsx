import Image from 'next/image';
import Link from 'next/link';
import { LoginButton } from '../Buttons';


export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/public/next.svg" // ロゴのパスを適宜変更してください
            alt="Site Logo"
            width={120}
            height={40}
          />
        </Link>

        <LoginButton />
      </div>
    </header>
  );
}