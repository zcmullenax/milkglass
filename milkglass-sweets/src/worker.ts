import { Resend } from 'resend';
import { OrderForm } from './models/order-form';

interface Env {
  RESEND_API_KEY: string;
  ASSETS: Fetcher;
}
function generateHtml(orderForm: OrderForm) {
  const itemRows = orderForm.cart?.items
    .map(
      (item) =>
        `<li>Product: ${item.productName} Flavor: ${item.selectedFlavor} Option: ${item.selectedSubProductName} Qty: ${item.quantity} Price: ${item.price}</li>`,
    )
    .join('');
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: sans-serif; color: #000000;">
        <h2>Order Confirmation</h2>
        <p>Name: ${orderForm.paymentFields.customerName}</p>
        <p>Email: ${orderForm.paymentFields.customerEmail}</p>
        <p>Phone: ${orderForm.paymentFields.customerPhone}</p>
        <p>Payment Type: ${orderForm.paymentFields.paymentType}</p>
        <p>${orderForm.paymentFields.paymentType} Details: ${orderForm.paymentFields.paypalIndentifer != null ? orderForm.paymentFields.paypalIndentifer : orderForm.paymentFields.venmoIdentifier}</p>
        <p><b>Items Ordered:</b></p>
        <ul>${itemRows}</ul>
        <p><strong>Total: $${orderForm.total}.00</strong></p>
      </body>
    </html>
  `;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle the email API.
    if (url.pathname === '/api/send-email') {
      if (request.method !== 'POST') {
        return Response.json(
          { error: 'Method not allowed' },
          {
            status: 405,
            headers: { Allow: 'POST' },
          },
        );
      }

      let body: OrderForm;

      try {
        body = await request.json();
      } catch {
        return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
      }

      const name =
        typeof body?.paymentFields.customerName === 'string'
          ? body.paymentFields.customerName.trim()
          : '';

      const email =
        typeof body?.paymentFields.customerEmail === 'string'
          ? body.paymentFields.customerEmail.trim()
          : '';

      const paypal =
        typeof body?.paymentFields.paypalIndentifer === 'string'
          ? body.paymentFields.paypalIndentifer.trim()
          : '';
      const venmo =
        typeof body?.paymentFields.venmoIdentifier === 'string'
          ? body.paymentFields.venmoIdentifier.trim()
          : '';

      if (
        !name ||
        name.length > 100 ||
        !email ||
        email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        (paypal && paypal.length > 100) ||
        (venmo && venmo.length > 100)
      ) {
        return Response.json({ error: 'Invalid form data' }, { status: 400 });
      }

      try {
        const resend = new Resend(env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
          // Must be a verified sender/domain in Resend.
          from: 'Website Order <new-order@orders.milkglass-sweets.com>',

          // Replace with your receiving inbox.
          to: ['milkglass.sweets@gmail.com'],

          subject: `New Order From ${name}`,

          // Replies go to the visitor, not your sender address.
          replyTo: email,
          html: generateHtml(body),
        });

        if (error) {
          console.error('Resend email error:', error);

          return Response.json({ error: 'Unable to send email' }, { status: 502 });
        }

        return Response.json({ success: true, id: data?.id }, { status: 200 });
      } catch (error) {
        console.error('Email endpoint error:', error);

        return Response.json({ error: 'Internal server error' }, { status: 500 });
      }
    }

    // Serve Angular's static files for all other requests.
    return env.ASSETS.fetch(request);
  },
};
