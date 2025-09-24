import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      <nav className="shadow-md flex items-center justify-between h-[80px] p-6">
        <Image
          src={'/images/fur_legged_logo.png'}
          alt="fur legged logo"
          height={55}
          width={55}
        />
        <ul className="flex items-center justify-between gap-5 ">
          <li className="cursor-pointer font-poppins font-medium text-[1rem] hover:text-secondary">
            Home
          </li>
          <li className="cursor-pointer font-poppins font-medium text-[1rem] hover:text-secondary">
            About
          </li>
          <li className="cursor-pointer font-poppins font-medium text-[1rem] hover:text-secondary">
            Contact Us
          </li>
        </ul>
        <div className="flex gap-5">
          <Button
            size={'lg'}
            variant={'secondary'}
            className="bg-primary font-poppins text-white font-medium"
          >
            Sign in
          </Button>
          <Button
            size={'lg'}
            variant={'ghost'}
            className="font-poppins font-medium"
          >
            Sign up
          </Button>
        </div>
      </nav>
      <main>
        <section className="grid grid-cols-2 items-center justify-between gap-5 h-full px-25 py-5">
          <div className="grid gap-4">
            <h1 className="text-6xl/18 font-poppins font-semibold text-secondary">
              Welcome to your new beginning
            </h1>
            <h2 className="text-2xl">
              Where wagging tails, gentle purrs, and unconditional love await
            </h2>
            <Button
              variant={'secondary'}
              size={'lg'}
              className="bg-primary text-[1rem] text-white w-[50%] rounded-2xl p-5"
            >
              Adopt Now!
            </Button>
          </div>

          <Image
            src={'/images/cute_dog_from_box.png'}
            alt="Cute dog from box"
            width={'400'}
            height={'400'}
            className="min-w-[500px] w-[40vw] max-w-[550px] min-h-[500px] h-[40vw] max-h-[550px] justify-self-end"
          />
        </section>
      </main>
    </div>
  );
}
