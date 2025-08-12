import { Injectable, signal, computed } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'portfolio-theme';
  
  private _currentTheme = signal<Theme>(this.getInitialTheme());
  
  currentTheme = this._currentTheme.asReadonly();
  isDark = computed(() => this._currentTheme() === 'dark');
  
  constructor() {
    this.applyTheme(this._currentTheme());
  }
  
  toggleTheme(): void {
    const newTheme: Theme = this._currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  setTheme(theme: Theme): void {
    this._currentTheme.set(theme);
    this.applyTheme(theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }
  
  private getInitialTheme(): Theme {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    if (savedTheme) {
      return savedTheme;
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }
}
