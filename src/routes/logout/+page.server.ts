import { redirect } from '@sveltejs/kit';
import db from '$lib/db';

export async function load() {
	await db.signOut();
	throw redirect(303, '/');
}
