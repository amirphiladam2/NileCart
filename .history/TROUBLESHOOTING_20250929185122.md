# NileCart Troubleshooting Guide

## Signup Issues

If the signup functionality is not working, follow these steps:

### 1. Check Supabase Connection

1. Open the application in your browser
2. Navigate to `/auth` page
3. Use the "Auth Debug" section at the bottom to test:
   - Click "Test Connection" to verify Supabase database connection
   - Click "Test Auth" to verify Supabase auth service
   - Click "Test Signup" to test signup with a test email

### 2. Check Browser Console

Open browser developer tools (F12) and check the Console tab for any error messages:
- Network errors (CORS, 404, 500)
- Authentication errors
- JavaScript errors

### 3. Verify Supabase Configuration

The application uses these Supabase credentials:
- URL: `https://aneqwbpznvjglgfxhwtx.supabase.co`
- Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- Redirect URL: `nilecart://auth/callback`

If these credentials are invalid, you'll need to:
1. Create a new Supabase project
2. Update the credentials in `src/integrations/supabase/client.ts`
3. Run the database migrations in `supabase/migrations/`
4. Configure the redirect URL in your Supabase project settings

### 4. Common Issues and Solutions

#### Issue: "Invalid API key" or "Project not found"
**Solution**: The Supabase project doesn't exist or credentials are wrong
- Create a new Supabase project at https://supabase.com
- Copy the new URL and anon key
- Update the client configuration

#### Issue: "CORS error" or network errors
**Solution**: Check if the Supabase project is properly configured
- Ensure the project is active
- Check if RLS (Row Level Security) policies are set up
- Verify the database migrations have been run

#### Issue: "Email confirmation required" or "Check your email" message appears but no email is sent
**Solution**: This indicates that Supabase email service is not configured
- The Supabase project doesn't have email confirmation enabled
- Users can sign in immediately after signup without email confirmation
- This is actually working correctly - the app will show "Account created successfully! You can now sign in with your credentials."

#### Issue: "Email confirmation required" (when email service IS configured)
**Solution**: This is normal behavior when email service is properly set up
- Check your email for a confirmation link
- Click the link to activate your account
- The app will redirect you back after confirmation

### 5. Testing the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open the application**: http://localhost:8080

3. **Test signup**:
   - Go to `/auth` page
   - Use the debug tools to test email configuration first
   - Click "Test Email Config" to check if email service is working
   - Fill out the signup form
   - Check browser console for any errors
   - Use the debug tools to test connection

4. **Test other features**:
   - Browse products on the home page
   - Add items to cart
   - Test the WhatsApp checkout flow

### 6. Production Deployment

For production deployment:

1. **Set environment variables**:
   ```bash
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_WHATSAPP_NUMBER=your_whatsapp_number
   ```

2. **Build the application**:
   ```bash
   npm run build
   ```

3. **Deploy the `dist` folder** to your hosting provider

### 7. Remove Debug Components

Before deploying to production, remove the debug components:
1. Remove `AuthDebug` import and component from `src/pages/AuthPage.tsx`
2. Delete `src/components/AuthDebug.tsx`

## Support

If you continue to have issues:
1. Check the browser console for detailed error messages
2. Verify your Supabase project is active and properly configured
3. Ensure all dependencies are installed: `npm install`
4. Try clearing browser cache and cookies
