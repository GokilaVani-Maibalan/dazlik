import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { HttpServicesService } from '../../services/http-services.service';
import { NgIf } from '@angular/common';
@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [
        RouterLink,
        MatFormFieldModule,
        MatInputModule,
        NgIf,
        MatButtonModule,
        MatCheckboxModule,
        ReactiveFormsModule,
    ],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
    constructor(
        private fb: FormBuilder,
        private router: Router,
        public themeService: CustomizerSettingsService,
        private supabaseService: HttpServicesService
    ) {
        this.authForm = this.fb.group({
            confirmPassword: [
                '',
                [Validators.required, Validators.minLength(8)],
            ],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }
    authForm: FormGroup;

    message: string | null = null;

    async onSubmit() {
        if (this.authForm.valid) {
            const password = this.authForm.get('password')?.value as string;
            const confirmPassword = this.authForm.get('confirmPassword')
                ?.value as string;

            if (password !== confirmPassword) {
                this.message = 'Passwords do not match.';
                return;
            }

            const { data, error } = await this.supabaseService.updatePassword(
                password
            );
            console.log(data);
            try {
                const email = await this.supabaseService.getCurrentUserId();
                console.log(email);
                if (!email) {
                    console.error('Email not found.');
                    return;
                }

                await this.supabaseService.updateMerchantPassword(
                    email,
                    password
                );

                if (error) {
                    alert('Error updating password');
                } else {
                    console.log(data);
                    alert(
                        'Password updated successfully. You can now log in with your new password.'
                    );
                    setTimeout(() => {
                        this.router.navigate(['/login']);
                    }, 3000);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    // isToggled
    isToggled = false;

    // Password Hide
    hide = true;
    hide2 = true;

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    // Card Border
    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
}
