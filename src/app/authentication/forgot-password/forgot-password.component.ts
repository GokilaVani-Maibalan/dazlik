import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpServicesService } from '../../services/http-services.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [
        RouterLink,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        NgIf,
    ],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
    authForm: FormGroup;

    message: string | null = null;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        public themeService: CustomizerSettingsService,
        private supabaseService: HttpServicesService
    ) {
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        });
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }
    async onSubmit(): Promise<void> {
        if (this.authForm.valid) {
            const email = this.authForm.get('email')?.value as string;
            if (!email) {
                console.error('Email is required');
                return;
            }
            const resetSent = await this.supabaseService.forgotPassword(email);
            if (resetSent) {
                alert('Reset email sent');
                console.log('Password reset email sent to', email);
            } else {
                alert('Failed to send email');

                console.error('Failed to send password reset email');
            }
        }
    }

    // isToggled
    isToggled = false;

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
