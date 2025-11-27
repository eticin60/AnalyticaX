# 🔐 Admin Panel Security Guide

## ⚠️ IMPORTANT SECURITY NOTICE

The admin panel requires secure credentials to be set via environment variables. **NEVER commit admin credentials to GitHub!**

## 🚀 Railway Setup

### Required Environment Variables

Add these to your Railway project **Variables** tab:

1. **ADMIN_USERNAME** - Your admin username (e.g., `admin` or a custom username)
2. **ADMIN_PASSWORD** - Your secure admin password (use a strong password!)
3. **ADMIN_JWT_SECRET** - Secret key for JWT tokens (use a long random string)

### How to Set Environment Variables in Railway

1. Go to your Railway project dashboard
2. Click on your service
3. Go to the **Variables** tab
4. Click **+ New Variable**
5. Add each variable:
   - **Name**: `ADMIN_USERNAME`
   - **Value**: Your chosen username (e.g., `admin`)
   - **Environment**: `Production` (or `All Environments`)
6. Repeat for `ADMIN_PASSWORD` and `ADMIN_JWT_SECRET`

### Generating a Secure ADMIN_JWT_SECRET

You can generate a secure random string using:

```bash
# On Linux/Mac:
openssl rand -base64 32

# On Windows (PowerShell):
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

Or use an online generator: https://randomkeygen.com/

## 🔒 Security Best Practices

1. **Use Strong Passwords**
   - Minimum 16 characters
   - Mix of uppercase, lowercase, numbers, and symbols
   - Don't use dictionary words

2. **Never Share Credentials**
   - Keep admin credentials private
   - Use different credentials for each environment

3. **Regular Rotation**
   - Change admin password periodically
   - Update JWT secret if compromised

4. **Monitor Access**
   - Check Railway logs for admin login attempts
   - Set up alerts for failed login attempts

## 🛡️ Current Security Features

- ✅ Credentials stored only in environment variables (not in code)
- ✅ JWT tokens with 7-day expiration
- ✅ Constant-time password comparison (prevents timing attacks)
- ✅ No username enumeration (same error message for invalid username/password)
- ✅ Production mode requires environment variables (no defaults)

## 📝 Default Credentials (Development Only)

**⚠️ WARNING: These only work in development mode!**

- Username: `admin`
- Password: `dev_password_change_me`

**These defaults are disabled in production mode for security.**

## 🚨 If Credentials Are Compromised

1. Immediately change `ADMIN_PASSWORD` in Railway
2. Change `ADMIN_JWT_SECRET` to invalidate all existing tokens
3. Review Railway logs for unauthorized access
4. Consider rotating all user tokens if needed

## 📞 Support

If you need help setting up admin credentials, contact: support@AnalyticaX.com.tr

