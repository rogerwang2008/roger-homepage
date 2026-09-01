import AnnotShanIcon from '$lib/assets/images/icons/annot-shan.svg';
import KipMaIcon from '$lib/assets/images/icons/kip-ma.webp';

type IconType = string | null;

interface FriendLinkConfig {
	icon: IconType;
	bgImage?: string;
	bgColor?: string;
	url: string;
	description?: string;
}

export type { FriendLinkConfig };

export const friendLinks: Record<string, FriendLinkConfig> = {
	annot: {
		icon: AnnotShanIcon,
		bgImage: '/friend-links/annot-homepage-bg.webp',
		url: 'http://annot.x-way.work',
	},
	kip: {
		icon: KipMaIcon,
		bgImage: '/friend-links/kip-website-bg.webp',
		url: 'https://kip.gay',
	},
	archaeus13: {
		icon: null,
		bgColor: 'rgb(132,228,220)',
		url: 'https://archaeus13.github.io',
	}
};