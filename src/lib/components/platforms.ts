import MailIcon from '@iconify-svelte/material-symbols/mail';
import LanguageIcon from '@iconify-svelte/material-symbols/language';

import qqMusicAsset from '$lib/assets/images/icons/qq-music.svg';

interface PlatformIconBase {
	color: string;
}

interface PlatformIconName extends PlatformIconBase {
	iconName: string;
}

interface PlatformIconComponent extends PlatformIconBase {
	iconComponent: typeof MailIcon;
}

interface PlatformIconAsset extends PlatformIconBase {
	iconAsset: string;
}

type PlatformIconConfig = PlatformIconName | PlatformIconComponent | PlatformIconAsset;

export type { PlatformIconConfig };

export const platformIcons = {
	official_website: {
		iconComponent: LanguageIcon,
		color: 'var(--color-primary)',
	},
	email: {
		iconComponent: MailIcon,
		color: '#0F6CBD',
	},
	bilibili: {
		iconName: 'fa7-brands:bilibili',
		color: '#00A1D6'
	},
	github: {
		iconName: 'fa7-brands:github',
		color: '#010409'
	},
	gitee: {
		iconName: 'fa7-brands:gitee',
		color: '#C71D23',
	},
	netease_music: {
		iconName: 'ri:netease-cloud-music-line',
		color: '#E60026',
	},
	qq_music: {
		iconAsset: qqMusicAsset,
		color: '#FFFFFF',
	},
} satisfies Record<string, PlatformIconConfig>;