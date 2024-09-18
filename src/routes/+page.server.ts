import db from '$lib/db';

export async function load() {
	const countries = await db.countries.all();
	const waterQualityReports = await db.water_quality_reports.all();
	return {
		countries: countries ?? [],
		waterQualityReports: waterQualityReports ?? []
	};
}
