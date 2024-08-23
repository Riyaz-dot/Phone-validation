import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  userInput: string = '';
  messages: { text: string, type: 'user' | 'bot' }[] = [];

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push(
        { text: this.userInput, type: 'user' });
      this.userInput = '';

      // Simulate a response from the bot
      setTimeout(() => {
        this.messages.push({ text: 'thanks for your response', type: 'bot' });
      }, 1000);
    }
  }
}
