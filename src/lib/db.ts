import { createClient } from '@supabase/supabase-js';
import { writable } from 'svelte/store';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

const userStore = writable();

supabase.auth.getSession().then(({ data }) => {
	userStore.set(data.session?.user);
});

supabase.auth.onAuthStateChange((event, session) => {
	if (event == 'SIGNED_IN' && session) {
		userStore.set(session.user);
	} else if (event == 'SIGNED_OUT') {
		userStore.set(null);
	}
});

export default {
	get user() {
		return userStore;
	},
	async signIn(email: string) {
		return supabase.auth.signInWithOtp({ email });
	},
	async signOut() {
		return supabase.auth.signOut();
	},
	countries: {
		async all() {
			const { data } = await supabase.from('countries').select();
			return data;
		}
	},
  water_quality_reports: {
    async all() {
      const { data } = await supabase.from('water_quality_reports').select();
      return data;
    }
  }
};
