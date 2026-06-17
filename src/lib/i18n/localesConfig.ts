export const defaultLocale = 'en';

export const locales = ['en', 'zh-CN', 'zh-HK'];

export const getClosestLocale = (locale: string) => {
	if (locales.includes(locale)) {
		return locale;
	}
	const prefix = locale.split('-')[0];
	const matched = locales.find((l) => l.startsWith(prefix));
	if (matched) return matched;
	return defaultLocale;
};

export const getLanguageName = (code: string) => {
	try {
		// 使用该语言本身来显示名字，比如 'en' 显示为 'English'，'zh' 显示为 '中文'
		const displayNames = new Intl.DisplayNames([code], { type: 'language' });
		return displayNames.of(code);
	} catch {
		return code; // 降级返回代码本身
	}
};