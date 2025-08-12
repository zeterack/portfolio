import { Component, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay" (click)="onOverlayClick($event)">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2 class="modal-title">Me contacter</h2>
          <button class="close-button" (click)="close()" aria-label="Fermer">
            ×
          </button>
        </div>
        
        <div class="modal-body">
          <div class="contact-info">
            <h3 class="section-title">Informations de contact</h3>
            <div class="contact-items">
              <div class="contact-item">
                <span class="contact-icon">📧</span>
                <div class="contact-content">
                  <span class="contact-label">Email</span>
                  <a href="mailto:votre.email&#64;exemple.com" class="contact-value">
                    votre.email&#64;exemple.com
                  </a>
                </div>
              </div>
              
              <div class="contact-item">
                <span class="contact-icon">📱</span>
                <div class="contact-content">
                  <span class="contact-label">Téléphone</span>
                  <a href="tel:+33123456789" class="contact-value">
                    +33 1 23 45 67 89
                  </a>
                </div>
              </div>
              
              <div class="contact-item">
                <span class="contact-icon">💼</span>
                <div class="contact-content">
                  <span class="contact-label">LinkedIn</span>
                  <a href="https://linkedin.com/in/votre-profil" 
                     target="_blank" 
                     class="contact-value">
                    linkedin.com/in/votre-profil
                  </a>
                </div>
              </div>
              
              <div class="contact-item">
                <span class="contact-icon">📂</span>
                <div class="contact-content">
                  <span class="contact-label">GitHub</span>
                  <a href="https://github.com/votre-profil" 
                     target="_blank" 
                     class="contact-value">
                    github.com/votre-profil
                  </a>
                </div>
              </div>
              
              <div class="contact-item">
                <span class="contact-icon">📍</span>
                <div class="contact-content">
                  <span class="contact-label">Localisation</span>
                  <span class="contact-value">Votre ville, France</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="contact-form">
            <h3 class="section-title">Envoyer un message rapide</h3>
            <form (ngSubmit)="sendMessage()" #contactForm="ngForm">
              <div class="form-group">
                <label for="name" class="form-label">Nom *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  [(ngModel)]="formData.name"
                  class="form-input" 
                  required
                  placeholder="Votre nom">
              </div>
              
              <div class="form-group">
                <label for="email" class="form-label">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  [(ngModel)]="formData.email"
                  class="form-input" 
                  required
                  placeholder="votre@email.com">
              </div>
              
              <div class="form-group">
                <label for="subject" class="form-label">Sujet</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  [(ngModel)]="formData.subject"
                  class="form-input" 
                  placeholder="Objet de votre message">
              </div>
              
              <div class="form-group">
                <label for="message" class="form-label">Message *</label>
                <textarea 
                  id="message" 
                  name="message"
                  [(ngModel)]="formData.message"
                  class="form-textarea" 
                  required
                  rows="4"
                  placeholder="Votre message..."></textarea>
              </div>
              
              <div class="form-actions">
                <button type="button" class="btn-secondary" (click)="close()">
                  Annuler
                </button>
                <button 
                  type="submit" 
                  class="btn-primary" 
                  [disabled]="!contactForm.valid || isSending()">
                  <span *ngIf="!isSending()">Envoyer</span>
                  <span *ngIf="isSending()">Envoi en cours...</span>
                </button>
              </div>
            </form>
            
            <div *ngIf="messageSent()" class="success-message">
              ✅ Message envoyé avec succès ! Je vous répondrai rapidement.
            </div>
            
            <div *ngIf="errorMessage()" class="error-message">
              ❌ {{ errorMessage() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-content {
      background: var(--bg-primary);
      border-radius: 1rem;
      max-width: 600px;
      width: 90vw;
      max-height: 90vh;
      overflow-y: auto;
      animation: slideIn 0.3s ease;
      border: 1px solid var(--border-color);
    }

    @keyframes slideIn {
      from { 
        opacity: 0;
        transform: translateY(-50px) scale(0.9);
      }
      to { 
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2rem 2rem 1rem 2rem;
      border-bottom: 1px solid var(--border-color);
    }

    .modal-title {
      font-size: 1.8rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .close-button {
      background: none;
      border: none;
      font-size: 2rem;
      color: var(--text-secondary);
      cursor: pointer;
      padding: 0;
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
    }

    .close-button:hover {
      background: var(--bg-secondary);
      color: var(--text-primary);
    }

    .modal-body {
      padding: 2rem;
    }

    .section-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--orange-primary);
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .contact-info {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid var(--border-color);
    }

    .contact-items {
      display: grid;
      gap: 1rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: var(--bg-secondary);
      border-radius: 0.75rem;
      transition: all 0.3s ease;
    }

    .contact-item:hover {
      transform: translateX(4px);
    }

    .contact-icon {
      font-size: 1.5rem;
      width: 2rem;
      text-align: center;
      flex-shrink: 0;
    }

    .contact-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .contact-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary);
      margin-bottom: 0.25rem;
    }

    .contact-value {
      color: var(--text-primary);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .contact-value:hover {
      color: var(--orange-primary);
    }

    .contact-form {
      margin-top: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-label {
      display: block;
      font-weight: 500;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .form-input,
    .form-textarea {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background: var(--bg-secondary);
      color: var(--text-primary);
      font-family: inherit;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .form-input:focus,
    .form-textarea:focus {
      outline: none;
      border-color: var(--orange-primary);
      box-shadow: 0 0 0 3px rgba(255, 132, 27, 0.1);
    }

    .form-textarea {
      resize: vertical;
      min-height: 100px;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
    }

    .btn-primary,
    .btn-secondary {
      padding: 0.75rem 2rem;
      border-radius: 0.5rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
      font-size: 1rem;
    }

    .btn-primary {
      background: var(--orange-primary);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: var(--orange-dark);
      transform: translateY(-2px);
    }

    .btn-primary:disabled {
      background: var(--text-secondary);
      cursor: not-allowed;
      transform: none;
    }

    .btn-secondary {
      background: none;
      color: var(--text-secondary);
      border: 1px solid var(--border-color);
    }

    .btn-secondary:hover {
      background: var(--bg-secondary);
      border-color: var(--orange-primary);
      color: var(--text-primary);
    }

    .success-message {
      margin-top: 1rem;
      padding: 1rem;
      background: #e8f5e8;
      color: #2e7d32;
      border-radius: 0.5rem;
      border-left: 4px solid #4caf50;
    }

    .error-message {
      margin-top: 1rem;
      padding: 1rem;
      background: #ffebee;
      color: #c62828;
      border-radius: 0.5rem;
      border-left: 4px solid #f44336;
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
      .modal-content {
        width: 95vw;
        margin: 1rem;
      }

      .modal-header,
      .modal-body {
        padding: 1.5rem;
      }

      .form-actions {
        flex-direction: column;
      }

      .btn-primary,
      .btn-secondary {
        width: 100%;
      }
    }
  `]
})
export class ContactModalComponent {
  @Output() closeModal = new EventEmitter<void>();

  isSending = signal(false);
  messageSent = signal(false);
  errorMessage = signal('');

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  close() {
    this.closeModal.emit();
  }

  async sendMessage() {
    if (this.isSending()) return;

    this.isSending.set(true);
    this.errorMessage.set('');
    this.messageSent.set(false);

    try {
      // Simulation d'envoi de message
      // Dans un vrai projet, vous utiliseriez un service d'email comme EmailJS ou une API backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulation d'un succès
      if (Math.random() > 0.1) { // 90% de chance de succès
        this.messageSent.set(true);
        this.resetForm();
        
        // Fermer automatiquement après 3 secondes
        setTimeout(() => {
          this.close();
        }, 3000);
      } else {
        throw new Error('Erreur de réseau. Veuillez réessayer.');
      }
    } catch (error) {
      this.errorMessage.set('Une erreur est survenue lors de l\'envoi du message. Vous pouvez me contacter directement par email.');
    } finally {
      this.isSending.set(false);
    }
  }

  private resetForm() {
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
