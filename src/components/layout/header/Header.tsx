import { HeaderMenu } from './HeaderMenu';
import { Logo } from './Logo';
import { Search } from './Search';

export function Header() {
	return (
		<header className='border-border bg-card flex h-full items-center gap-x-4 border-b p-4'>
			<Logo />
			<Search />
			<HeaderMenu />
		</header>
	);
}
