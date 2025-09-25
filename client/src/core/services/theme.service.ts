import { Injectable, signal, computed, effect } from '@angular/core';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export interface Theme {
    name: string;
    timeOfDay: TimeOfDay;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        neutral: string;
        base100: string;
        base200: string;
        base300: string;
        baseContent: string;
        info: string;
        success: string;
        warning: string;
        error: string;
    };
    background: {
        gradient: string;
        pattern?: string;
    };
    typography: {
        headingColor: string;
        bodyColor: string;
        mutedColor: string;
    };
    shadows: {
        card: string;
        cardHover: string;
        button: string;
    };
    borders: {
        radius: string;
        color: string;
    };
}

const themes: Record<TimeOfDay, Theme> = {
    morning: {
        name: 'Morning Bloom',
        timeOfDay: 'morning',
        colors: {
            primary: '#f97316', // warm orange
            secondary: '#fbbf24', // golden yellow
            accent: '#fb7185', // soft pink
            neutral: '#374151', // warm gray
            base100: '#fefce8', // cream white
            base200: '#fef3c7', // light amber
            base300: '#fed7aa', // peach
            baseContent: '#1f2937', // dark gray
            info: '#3b82f6',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444'
        },
        background: {
            gradient: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 25%, #fecaca 50%, #f3e8ff 100%)'
        },
        typography: {
            headingColor: '#92400e',
            bodyColor: '#451a03',
            mutedColor: '#78716c'
        },
        shadows: {
            card: '0 4px 6px -1px rgba(251, 146, 60, 0.1), 0 2px 4px -1px rgba(251, 146, 60, 0.06)',
            cardHover: '0 20px 25px -5px rgba(251, 146, 60, 0.15), 0 10px 10px -5px rgba(251, 146, 60, 0.08)',
            button: '0 4px 14px 0 rgba(249, 115, 22, 0.3)'
        },
        borders: {
            radius: '12px',
            color: '#fed7aa'
        }
    },
    afternoon: {
        name: 'Sunny Afternoon',
        timeOfDay: 'afternoon',
        colors: {
            primary: '#0ea5e9', // sky blue
            secondary: '#06b6d4', // cyan
            accent: '#8b5cf6', // purple
            neutral: '#475569', // slate gray
            base100: '#f0f9ff', // light blue
            base200: '#e0f2fe', // lighter blue
            base300: '#bae6fd', // pale blue
            baseContent: '#0f172a', // dark slate
            info: '#0284c7',
            success: '#059669',
            warning: '#d97706',
            error: '#dc2626'
        },
        background: {
            gradient: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #bae6fd 50%, #dbeafe 100%)'
        },
        typography: {
            headingColor: '#0369a1',
            bodyColor: '#0c4a6e',
            mutedColor: '#64748b'
        },
        shadows: {
            card: '0 4px 6px -1px rgba(14, 165, 233, 0.1), 0 2px 4px -1px rgba(14, 165, 233, 0.06)',
            cardHover: '0 20px 25px -5px rgba(14, 165, 233, 0.15), 0 10px 10px -5px rgba(14, 165, 233, 0.08)',
            button: '0 4px 14px 0 rgba(14, 165, 233, 0.3)'
        },
        borders: {
            radius: '10px',
            color: '#bae6fd'
        }
    },
    evening: {
        name: 'Golden Hour',
        timeOfDay: 'evening',
        colors: {
            primary: '#f59e0b', // amber
            secondary: '#ec4899', // pink
            accent: '#8b5cf6', // violet
            neutral: '#6b7280', // gray
            base100: '#fef7ed', // warm white
            base200: '#fed7aa', // light peach
            base300: '#fdba74', // peach
            baseContent: '#1c1917', // warm black
            info: '#8b5cf6',
            success: '#059669',
            warning: '#ea580c',
            error: '#dc2626'
        },
        background: {
            gradient: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 25%, #fecaca 50%, #f3e8ff 75%, #ddd6fe 100%)'
        },
        typography: {
            headingColor: '#92400e',
            bodyColor: '#451a03',
            mutedColor: '#78716c'
        },
        shadows: {
            card: '0 4px 6px -1px rgba(245, 158, 11, 0.1), 0 2px 4px -1px rgba(245, 158, 11, 0.06)',
            cardHover: '0 20px 25px -5px rgba(245, 158, 11, 0.15), 0 10px 10px -5px rgba(245, 158, 11, 0.08)',
            button: '0 4px 14px 0 rgba(245, 158, 11, 0.3)'
        },
        borders: {
            radius: '14px',
            color: '#fed7aa'
        }
    },
    night: {
        name: 'Starlit Night',
        timeOfDay: 'night',
        colors: {
            primary: '#8b5cf6', // violet
            secondary: '#06b6d4', // cyan
            accent: '#f472b6', // pink
            neutral: '#e5e7eb', // light gray
            base100: '#1e1b4b', // deep indigo
            base200: '#312e81', // indigo
            base300: '#3730a3', // lighter indigo
            baseContent: '#f1f5f9', // off white
            info: '#06b6d4',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#f87171'
        },
        background: {
            gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #3730a3 50%, #4338ca 75%, #4f46e5 100%)'
        },
        typography: {
            headingColor: '#c7d2fe',
            bodyColor: '#e0e7ff',
            mutedColor: '#a5b4fc'
        },
        shadows: {
            card: '0 4px 6px -1px rgba(139, 92, 246, 0.15), 0 2px 4px -1px rgba(139, 92, 246, 0.1)',
            cardHover: '0 20px 25px -5px rgba(139, 92, 246, 0.25), 0 10px 10px -5px rgba(139, 92, 246, 0.15)',
            button: '0 4px 14px 0 rgba(139, 92, 246, 0.4)'
        },
        borders: {
            radius: '16px',
            color: '#4338ca'
        }
    }
};

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private currentTime = signal(new Date());

    readonly timeOfDay = computed(() => {
        const hour = this.currentTime().getHours();
        if (hour >= 6 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 17) return 'afternoon';
        if (hour >= 17 && hour < 21) return 'evening';
        return 'night';
    });

    readonly currentTheme = computed(() => themes[this.timeOfDay()]);

    readonly greeting = computed(() => {
        const hour = this.currentTime().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        if (hour < 21) return 'Good evening';
        return 'Good night';
    });

    constructor() {
        // Update time every minute
        setInterval(() => {
            this.currentTime.set(new Date());
        }, 60000);

        // Apply theme changes to CSS variables
        effect(() => {
            this.applyTheme(this.currentTheme());
        });
    }

    private applyTheme(theme: Theme): void {
        const root = document.documentElement;

        // Apply color variables
        root.style.setProperty('--color-primary', theme.colors.primary);
        root.style.setProperty('--color-secondary', theme.colors.secondary);
        root.style.setProperty('--color-accent', theme.colors.accent);
        root.style.setProperty('--color-neutral', theme.colors.neutral);
        root.style.setProperty('--color-base-100', theme.colors.base100);
        root.style.setProperty('--color-base-200', theme.colors.base200);
        root.style.setProperty('--color-base-300', theme.colors.base300);
        root.style.setProperty('--color-base-content', theme.colors.baseContent);
        root.style.setProperty('--color-info', theme.colors.info);
        root.style.setProperty('--color-success', theme.colors.success);
        root.style.setProperty('--color-warning', theme.colors.warning);
        root.style.setProperty('--color-error', theme.colors.error);

        // Apply background
        root.style.setProperty('--bg-gradient', theme.background.gradient);

        // Apply typography colors
        root.style.setProperty('--color-heading', theme.typography.headingColor);
        root.style.setProperty('--color-body', theme.typography.bodyColor);
        root.style.setProperty('--color-muted', theme.typography.mutedColor);

        // Apply shadows
        root.style.setProperty('--shadow-card', theme.shadows.card);
        root.style.setProperty('--shadow-card-hover', theme.shadows.cardHover);
        root.style.setProperty('--shadow-button', theme.shadows.button);

        // Apply borders
        root.style.setProperty('--border-radius', theme.borders.radius);
        root.style.setProperty('--border-color', theme.borders.color);

        // Update body class for theme-specific styles
        document.body.className = `theme-${theme.timeOfDay}`;
    }

    getCurrentTime(): Date {
        return this.currentTime();
    }

    getTheme(timeOfDay?: TimeOfDay): Theme {
        return themes[timeOfDay || this.timeOfDay()];
    }

    getAllThemes(): Record<TimeOfDay, Theme> {
        return themes;
    }
}