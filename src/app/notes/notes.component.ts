import { Component } from '@angular/core';
import { ApiDataService } from '../Shared/api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  loader : boolean =false;
  paymentHandler: any = null;

  constructor(private apiservice :ApiDataService, private router : Router) {}
  ngOnInit() {
    this.invokeStripe();
  }
  makePayment(amount: any, plan:any) {
    // Initialize the Stripe Checkout configuration
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_live_51M6fZDFKS3fqw3Z9arQWJW17dLgW599GDGq6PEp0cMnZinjZYeFPOY6s77NhrOLUtq3djff6VUoXRcOyJxJ7tsYW00a2lxzNw2',
      locale: 'auto',
      currency: 'GBP', // Specify the currency as GBP
      token: (stripeToken: any) => {
        // Construct the payment data to send to your API
        const paymentData = {
          'Token': stripeToken.id, // Use stripeToken.id to get the token
          'Amount': amount * 100, // Convert amount to cents if it's in dollars
        };
  
        // Set the loader to true (assuming this is used for a loading indicator)
        this.loader = true;
  
        // Call your API service to process the payment
        this.apiservice.PaymentByStripe(paymentData).subscribe({
          next: (d) => {
            // Payment success: hide the loader and log the response
     
            this.apiservice.PayTable(localStorage.getItem('accesskey'), plan , stripeToken.id).subscribe({
              next:(dz)=>{
                this.router.navigate(['/PayStatus']);
                this.apiservice.setData("Success");
                this.loader = false;
              },error:(erre)=>{
                console.log(erre);
                this.apiservice.setData("Failed");
                this.router.navigate(['/PayStatus']);
                this.loader = false;
              }
            });
          
          },
          error: (err) => {
            // Payment error: hide the loader, log the error, and handle as needed
            this.loader = false;
            console.log(err);
            this.apiservice.setData("Failed");
            this.router.navigate(['/PayStatus']);
          }
        });
      },
    });
  
    // Open the Stripe Checkout modal for payment
    paymentHandler.open({
      name: 'Project-Rewire Studio Subscription',
      description: 'Payment of Project Rewire Subscription',
      amount: amount * 100, // Convert amount to cents if it's in dollars
    });
  }
  
  // Additional code for initializing Stripe Checkout script (invokeStripe function)
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_live_51M6fZDFKS3fqw3Z9arQWJW17dLgW599GDGq6PEp0cMnZinjZYeFPOY6s77NhrOLUtq3djff6VUoXRcOyJxJ7tsYW00a2lxzNw2',
          locale: 'auto',
          currency: 'GBP', // Specify the currency as GBP
          token: (stripeToken: any) => {
            console.log(stripeToken);
            alert('Payment has been successful!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
