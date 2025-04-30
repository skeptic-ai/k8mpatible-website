import { NextRequest, NextResponse } from 'next/server';
import { Stripe } from 'stripe';
import { headers } from 'next/headers';

// Initialize Stripe with the API key from environment variables
const stripe = new Stripe(process.env.STRIPE_API_KEY || '', {
    apiVersion: '2025-03-31.basil', // Using the latest API version
});

// This function handles POST requests to /api/webhook/stripe
export async function POST(req: NextRequest) {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
        return NextResponse.json(
            { error: 'Missing stripe-signature header' },
            { status: 400 }
        );
    }

    try {
        // Verify the event using the webhook secret and signature
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            webhookSecret
        );

        // Handle different event types
        if (event.type === 'checkout.session.completed') {
            // Payment is successful and the subscription is created
            // You can provision the subscription here
            console.log('Checkout session completed:', event.data.object);
        } else if (event.type === 'invoice.payment_succeeded') {
            // Continue to provision the subscription as payments continue to be made
            // Store the status in your database and check when a user accesses your service
            console.log('Invoice payment succeeded:', event.data.object);
        } else if (event.type === 'invoice.payment_failed') {
            // The payment failed or the customer does not have a valid payment method
            // The subscription becomes past_due. Notify your customer and send them to the
            // customer portal to update their payment information
            console.log('Invoice payment failed:', event.data.object);
        } else {
            // Handle any other event type, including custom events
            // console.log(`Received event of type ${event.type}:`, event.data.object);

            // Special handling for billing meter error reports
            if (event.type.includes('billing') && event.type.includes('error_report')) {
                // Add your logic here to record failures and alert your team
                console.log('Billing error report detected, alerting team...');
            }
        }

        // Return a 200 response to acknowledge receipt of the event
        return NextResponse.json({ received: true });
    } catch (err) {
        console.error(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
        return NextResponse.json(
            { error: `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}` },
            { status: 400 }
        );
    }
}

// This is needed to disable the default body parsing, as we need the raw body for Stripe signature verification
export const config = {
    api: {
        bodyParser: false,
    },
};
