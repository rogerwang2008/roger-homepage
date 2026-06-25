import CodeIcon from '@iconify-svelte/material-symbols/code';
import MusicNoteIcon from '@iconify-svelte/material-symbols/music-note-2';
import SvelteIcon from '@iconify-svelte/devicon-plain/svelte';
import PythonIcon from '@iconify-svelte/devicon-plain/python';
import type { platformIcons } from './platforms';

type IconType = string | typeof CodeIcon;

interface ProjectPlatform {
	platform: keyof typeof platformIcons;
	url: string;
	tooltip?: string;
}

interface ProjectSubType {
	icon: IconType;
}

interface ProjectType {
	icon: IconType;
	subTypes: Record<string, ProjectSubType>;
}

interface ProjectRole {
	// placeholder for future metadata (e.g. color, description)
}

interface ProjectConfig {
	roles?: (keyof typeof projectRoles)[];
	bgImage?: string;
	type?: keyof typeof projectTypes;
	subType?: string;
	platforms?: ProjectPlatform[];
}

export type { ProjectConfig, ProjectPlatform, ProjectType, ProjectSubType, ProjectRole };

export const projectRoles = {
	backend_engineer: {},
	backend_engineering_lead: {},
	composer: {},
	frontend_engineer: {},
	frontend_engineering_lead: {},
	independent_project: {}
} satisfies Record<string, ProjectRole>;

export const projectTypes = {
	code: {
		icon: CodeIcon,
		subTypes: {
			svelte: { icon: SvelteIcon },
			python: { icon: PythonIcon }
		}
	},
	music: {
		icon: MusicNoteIcon,
		subTypes: {
			violin: { icon: 'mdi:violin' },
			microphone: { icon: 'boxicons:microphone-alt-2' }
		}
	}
} satisfies Record<string, ProjectType>;

export const projects = {
	r3d: {
		roles: ['backend_engineering_lead', 'frontend_engineering_lead'],
		bgImage: '/projects/r3d-bg.webp',
		type: 'code',
		platforms: [
			{ platform: 'official_website', url: 'https://r3d.x-way.work' },
			{ platform: 'github', url: 'https://github.com/RDFZ3D' },
			{ platform: 'gitee', url: 'https://gitee.com/RDFZ3D' }
		]
	},
	homepage: {
		roles: ['independent_project'],
		bgImage: '/three-plush-toys.webp',
		type: 'code',
		subType: 'svelte',
		platforms: [
			{ platform: 'official_website', url: '/' },
			{ platform: 'github', url: 'https://github.com/rogerwang2008/roger-homepage' }
		]
	},
	basic_spam_classifier: {
		roles: ['independent_project'],
		type: 'code',
		subType: 'python',
		platforms: [{ platform: 'github', url: 'https://github.com/rogerwang2008/bayes-spam-filter' }]
	},
	ran_wan: {
		roles: ['composer'],
		bgImage: '/projects/ran_wan_bg.jpg',
		type: 'music',
		subType: 'violin',
		platforms: [
			{ platform: 'netease_music', url: 'https://music.163.com/#/album?id=272340040' },
			{ platform: 'qq_music', url: 'https://y.qq.com/n/ryqq_v2/albumDetail/00119Qfy23sDyw' }
		]
	},
	jiu_tian: {
		roles: ['composer'],
		bgImage: '/projects/jiu_tian_bg.webp',
		type: 'music',
		subType: 'microphone',
		platforms: [
			{ platform: 'netease_music', url: 'https://music.163.com/#/album?id=260108878' },
			{ platform: 'qq_music', url: 'https://y.qq.com/n/ryqq_v2/albumDetail/002Fl7l82KtE1O' }
		]
	},
	jiu_tian_rhapsody: {
		roles: ['independent_project'],
		bgImage: '/projects/jiu_tian_rhapsody_bg.webp',
		type: 'music',
		subType: 'violin',
		platforms: [
			{ platform: 'netease_music', url: 'https://music.163.com/song?id=2705681311' },
			{ platform: 'qq_music', url: 'https://y.qq.com/n/ryqq_v2/songDetail/001WcVUs4LeXSd' }
		]
	}
} satisfies Record<string, ProjectConfig>;