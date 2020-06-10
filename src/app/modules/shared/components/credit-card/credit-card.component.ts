import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {
  @Input() brand: string;
  @Input() last4: string;
  private imageUrl: string;

  constructor() { }

  logoUrlConstructor(cardType: string) {
    return `/assets/credit-cards/${cardType}.png`;
  }

  ngOnInit() {
    switch (this.brand) {
      case 'Visa': case 'MasterCard': case 'American Express':
        this.imageUrl = this.logoUrlConstructor(this.brand);
        break;
      default:
        this.imageUrl = this.logoUrlConstructor('Card');
        break;
    }
  }

}
