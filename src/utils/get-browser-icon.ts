import {
	FaChrome,
	FaEdge,
	FaFirefox,
	FaGlobe,
	FaOpera,
	FaSafari,
} from 'react-icons/fa';

export function getBrowserIcon(browser: string) {
	switch (browser.toLowerCase()) {
		case 'chrome':
			return FaChrome;
		case 'firefox':
			return FaFirefox;
		case 'safari':
			return FaSafari;
		case 'edge':
			return FaEdge;
		case 'opera':
			return FaOpera;
		default:
			return FaGlobe;
	}
}
