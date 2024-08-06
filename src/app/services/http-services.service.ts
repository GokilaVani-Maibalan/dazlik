import { Injectable } from '@angular/core';
import {
    AuthChangeEvent,
    AuthSession,
    createClient,
    Session,
    SupabaseClient,
    PostgrestResponse,
    AuthError,
    User,
} from '@supabase/supabase-js';
import { Router } from '@angular/router';

export interface Profile {
    id?: string;
    username: string;
    website: string;
    avatar_url: string;
}

import { environment } from '../environment';

@Injectable({
    providedIn: 'root',
})
export class HttpServicesService {
    public supabase: SupabaseClient;
    _session: AuthSession | null = null;

    constructor(private router: Router) {
        this.supabase = createClient(
            environment.supabaseUrl,
            environment.supabaseKey
        );
    }

    get session() {
        this.supabase.auth.getSession().then(({ data }) => {
            this._session = data.session;
        });
        return this._session;
    }

    async getInputs(): Promise<any[]> {
        try {
            const { data, error }: PostgrestResponse<any> = await this.supabase
                .from('inputs')
                .select('*')
                .eq('isActive', true);

            if (error) {
                throw error;
            }

            return data || [];
        } catch (error) {
            console.error('Error fetching inputs:');
            return [];
        }
    }

    async getInputById(id: string): Promise<any> {
        try {
            const { data, error } = await this.supabase
                .from('inputs')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Error fetching user:');
            throw error;
        }
    }

    async createUserTableEntry(
        first_name: string,
        last_name: string,
        email: string,
        phone: string
    ) {
        const role = 'security';
        const { data, error } = await this.supabase
            .from('users')
            .insert([{ first_name, last_name, phone, email, role }]);

        if (error) {
            throw error;
        }
        console.log(data);
        return data;
    }

    async updateUser(
        userId: string,
        userData: any
    ): Promise<PostgrestResponse<any>> {
        try {
            const { error } = await this.supabase
                .from('inputs')
                .update(userData)
                .eq('id', userId);

            if (error) {
                throw error;
            }

            return userData;
        } catch (error) {
            console.error('Error updating user:');
            throw error;
        }
    }

    async updateInput(userId: number): Promise<any> {
        try {
            const { error } = await this.supabase
                .from('inputs')
                .update({ isActive: false })
                .eq('id', userId);

            if (error) {
                // throw error;
                console.log('error');
            }

            return;
        } catch (error) {
            console.error('Error updating user:');
            throw error;
        }
    }

    async getRating() {
        const { data, error } = await this.supabase
            .from('feedback')
            .select('*');

        if (error) {
            console.error('Error fetching rating:', error);
        }

        return data;
        // console.log(data);
    }

    async addReply(feedbackId: number, reply: string) {
        const { data, error } = await this.supabase
            .from('feedback')
            .update({ reply })
            .eq('id', feedbackId);
        if (error) {
            console.error('Error adding reply:', error);
        }
        return data;
    }

    async getCustomerData() {
        const { data, error } = await this.supabase
            .from('customer_data')
            .select('*');

        if (error) {
            throw error;
        }
        // console.log(data);
        return data;
    }

    async getCustomerAgeData() {
        const { data, error } = await this.supabase
            .from('customer_age')
            .select('*');
        if (error) {
            console.error('Error fetching data:', error);
            return [];
        }
        return data;
        // console.log(data);
    }

    async getGenderDistribution(): Promise<any[]> {
        // Fetch gender distribution data from Supabase
        const { data, error } = await this.supabase
            .from('gender_distribution')
            .select('*');

        if (error) {
            console.error('Error fetching gender distribution data:', error);
            return [];
        }

        return data;
    }

    async deleteInput(id: string): Promise<boolean> {
        try {
            const { error } = await this.supabase
                .from('inputs')
                .delete()
                .eq('id', id);

            if (error) {
                throw error;
            }

            return true; // Successfully deleted
        } catch (error) {
            console.error('Error deleting user:');
            return false; // Failed to delete
        }
    }
    async checkUserExists(email: string): Promise<boolean> {
        try {
            const { data, error } = await this.supabase
                .from('merchants')
                .select('id')
                .eq('email', email)
                .single();
            if (error && error.code !== 'PGRST116') {
                console.error('Error checking user:', error.message);
                throw error;
            }
            return !!data;
        } catch (error) {
            console.error('Error checking user:', error);
            throw error;
        }
    }

    async signUp(email: string, password: string): Promise<any> {
        const { data, error } = await this.supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            console.error('Error signing up:', error.message);
            throw error;
        }

        return data;
    }

    async storeUserData(data: any, merchants: string): Promise<any> {
        const { data: merchantData, error } = await this.supabase
            .from(merchants)
            .insert([data]);

        if (error) {
            console.error('Error storing user data:', error.message);
            throw error;
        }

        return merchantData;
    }

    async signIn(email: string, password: string) {
        try {
            const { data, error } = await this.supabase.auth.signInWithPassword(
                {
                    email,
                    password,
                }
            );
            if (error) {
                alert('Invalid credentials');
            } else {
                alert('User logged in successfully');
                this.router.navigate(['/ecommerce-page']);
            }
            return data;
        } catch (error) {
            console.error('Error signing in:', error);

            return { user: null, error: error as AuthError };
        }
    }
    async forgotPassword(email: string) {
        try {
            const { error } = await this.supabase.auth.resetPasswordForEmail(
                email
            );
            if (error) {
                throw error;
            }
            console.log('Password reset email sent successfully');
            return true;
        } catch (error) {
            console.error('Error sending password reset email:');
            return false;
        }
    }

    async updatePassword(newPassword: string) {
        const { data, error } = await this.supabase.auth.updateUser({
            password: newPassword,
        });
        if (error) {
            alert('Password reset failed!');
        } else {
            alert('Password reset successful');
        }
        return { data, error };
    }

    async updateMerchantPassword(
        email: string,
        newPassword: string
    ): Promise<any> {
        try {
            const { error } = await this.supabase
                .from('merchants')
                .update({ password: newPassword })
                .eq('email', email);

            if (error) {
                throw new Error(
                    'Error updating merchant password: ' + error.message
                );
            }

            console.log('Merchant password updated successfully.');
        } catch (error) {
            console.error('Caught error while updating merchant password:');
            throw error;
        }
    }

    async getCurrentUserId(): Promise<string | null> {
        const { data: user, error } = await this.supabase.auth.getUser();
        if (error) {
            console.error('Error fetching user:', error.message);
            return null;
        }
        return user?.user.email || null;
    }

    async getCurrentUser(): Promise<User | null> {
        const { data, error } = await this.supabase.auth.getUser();
        if (error || !data.user) {
            return null;
        }
        return data.user;
    }

    async uploadFile(bucket: string, filePath: string, file: File) {
        const { data, error } = await this.supabase.storage
            .from(bucket)
            .upload(filePath, file);

        if (error) {
            throw error;
        }

        return data;
    }
    async getItems() {
        const { data, error } = await this.supabase
            .from('services')
            .select('*');
        if (error) console.error(error);
        return data;
    }
    async getLevel2Services(service_name: string) {
        const { data, error } = await this.supabase
            .from('level2_services')
            .select('*, services!inner(name)')
            .eq('services.name', service_name);
        if (error) console.error(error);
        return data;
    }

    async getOptions(level2_service_name: string) {
        const { data, error } = await this.supabase
            .from('options')
            .select('*, level2_services!inner(name)')
            .eq('level2_services.name', level2_service_name);
        if (error) console.error(error);
        return data;
    }

    async getTemplateOptions(option: string) {
        const { data, error } = await this.supabase
            .from('templates')
            .select('*, options!inner(name)')
            .eq('options.name', option);
        if (error) console.error(error);
        return data;
    }

    async saveInputs(data: any): Promise<void> {
        const { data: insertedData, error } = await this.supabase
            .from('inputs')
            .insert([data]);

        if (error) {
            console.error('Error saving inputs:', error);
        } else {
            console.log('Inputs saved successfully:', insertedData);
        }
    }

    authChanges(
        callback: (event: AuthChangeEvent, session: Session | null) => void
    ) {
        return this.supabase.auth.onAuthStateChange(callback);
    }

    // signIn(email: string) {
    //     return this.supabase.auth.signInWithOtp({ email });
    // }

    signOut() {
        return this.supabase.auth.signOut();
    }

    updateProfile(profile: Profile) {
        const update = {
            ...profile,
            updated_at: new Date(),
        };

        return this.supabase.from('profiles').upsert(update);
    }

    downLoadImage(path: string) {
        return this.supabase.storage.from('avatars').download(path);
    }

    uploadAvatar(filePath: string, file: File) {
        return this.supabase.storage.from('avatars').upload(filePath, file);
    }
}
