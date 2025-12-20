# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Setting up Email Notifications (RESEND_API_KEY)

The Submit Application form sends emails via Resend. To enable this functionality, you need to configure the `RESEND_API_KEY` environment variable in your Supabase project.

### Step 1: Get your Resend API Key

1. Sign up or log in to [Resend](https://resend.com)
2. Navigate to **API Keys** in your dashboard
3. Create a new API key or copy an existing one

### Step 2: Configure in Supabase Dashboard

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (Project ID: `mzndfyiejmyeuyshjtfe`)
3. Navigate to **Project Settings** → **Edge Functions** → **Secrets**
4. Click **Add Secret**
5. Set the name to: `RESEND_API_KEY`
6. Paste your Resend API key as the value
7. Click **Save**

### Step 3: Deploy the Edge Function

If you haven't already deployed the `send-application` function:

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref mzndfyiejmyeuyshjtfe

# Deploy the function
supabase functions deploy send-application
```

### Alternative: Using Supabase CLI

If you have Supabase CLI installed:

```bash
# Set the secret
supabase secrets set RESEND_API_KEY=your_resend_api_key_here --project-ref mzndfyiejmyeuyshjtfe
```

### Testing

After configuration, test the form submission:
1. Fill out the application form on `/apply`
2. Submit the form
3. Check your email at `asim@thectomentor.com` for the notification

The function will validate that `RESEND_API_KEY` is configured and provide helpful error messages if it's missing.
