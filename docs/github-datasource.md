# GitHub Data Source Configuration Guide

## Overview

The Code Map supports loading links data from multiple sources:
- **Local JSON File** - Default method, data stored in `data/links.json`
- **GitHub Raw File** - Read JSON file directly from GitHub repository
- **GitHub API** - Access repository files via GitHub API
- **GitHub Gist** - Read data from GitHub Gist

## Configuration

### Method 1: GitHub Raw File (Recommended)

The simplest method, no authentication required, suitable for public repositories.

```javascript
// Configure during app initialization
DataLoader.configure({
  primarySource: 'github',
  github: {
    rawFileUrl: 'https://raw.githubusercontent.com/your-username/your-repo/main/data/links.json'
  }
});
```

**Advantages:**
- Simple configuration
- No GitHub Token required
- CDN accelerated, fast access

**Limitations:**
- Public repositories only
- Rate limits apply (usually sufficient)

### Method 2: GitHub API

Access repository files via GitHub API, supports private repositories.

```javascript
DataLoader.configure({
  primarySource: 'github',
  github: {
    owner: 'your-username',
    repo: 'your-repo',
    branch: 'main',
    dataPath: 'data/links.json',
    token: 'ghp_xxxx' // Optional, recommended
  }
});
```

**Advantages:**
- Supports private repositories
- Use Token to increase rate limits
- More precise control

**Limitations:**
- Requires GitHub Token (optional but recommended)
- API rate limits: 60 requests/hour unauthenticated, 5000 requests/hour authenticated

### Method 3: GitHub Gist

Suitable for simple data storage, no full repository needed.

```javascript
DataLoader.configure({
  primarySource: 'github',
  github: {
    gistId: 'your-gist-id',
    token: 'ghp_xxxx' // Optional
  }
});
```

**Advantages:**
- No repository creation needed
- Easy to edit and update
- Version history support

## GitHub Token Configuration

### Why Use a Token?

1. **Increase API Rate Limits**: From 60/hour to 5000/hour
2. **Access Private Repositories**: Read data files from private repositories
3. **Avoid Rate Limiting**: Ensure stable data access

### How to Create a Token?

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Select permissions:
   - `repo` - Access private repositories (if needed)
   - `gist` - Access Gist (if using Gist)
4. Generate and save the Token

### Secure Token Storage

**Never hardcode tokens in your code!**

Recommended methods:
1. Environment variables (injected at build time)
2. Configuration files (not committed to Git)
3. User input (runtime configuration)

```javascript
// Example: Read from environment variable
DataLoader.configure({
  primarySource: 'github',
  github: {
    owner: 'your-username',
    repo: 'your-repo',
    token: process.env.GITHUB_TOKEN // Injected at build time
  }
});
```

## Data Format

The data file must be valid JSON, with the same format as `data/links.json`:

```json
{
  "ai": {
    "name": "AI Tools",
    "icon": "🤖",
    "subcategories": {
      "chat": {
        "name": "Chatbots",
        "icon": "💬",
        "items": [
          {
            "name": "ChatGPT",
            "url": "https://chat.openai.com",
            "icon": "🟢"
          }
        ]
      }
    }
  }
}
```

## Caching Mechanism

### Cache Strategy

| Data Source | Cache Duration | Storage Location |
|-------------|----------------|------------------|
| Local JSON | 5 minutes | Memory |
| GitHub Data | 15 minutes | Memory + localStorage |
| Offline Backup | 24 hours | localStorage |

### Manual Refresh

```javascript
// Force refresh data
await DataLoader.refresh();

// Clear all caches
DataLoader.clearCache();

// Clear offline backup
DataLoader.clearBackup();
```

## Offline Support

When network is unavailable, the system will automatically:
1. Try to use memory cache
2. Try to use localStorage backup
3. Display offline notification

## Community Contributions

### Option 1: Fork + Pull Request

1. User forks the data repository
2. Modify `links.json` to add new links
3. Submit a Pull Request
4. Maintainers review and merge

### Option 2: GitHub Issues

1. Create Issue templates to collect link suggestions
2. Automated scripts process Issues periodically
3. Update `links.json` file

### Option 3: GitHub Actions Auto-Update

```yaml
# .github/workflows/update-links.yml
name: Update Links
on:
  schedule:
    - cron: '0 0 * * *' # Run daily
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Fetch and update
        run: |
          # Run update script
          node scripts/update-links.js
      - name: Commit changes
        run: |
          git config user.name "Bot"
          git config user.email "bot@example.com"
          git add data/links.json
          git diff --quiet && git commit -m "chore: update links" || echo "No changes"
          git push
```

## Monitoring & Debugging

### Check Status

```javascript
// Get data source status
const status = DataLoader.getStatus();
console.log(status);
// {
//   primarySource: 'github',
//   localCacheValid: false,
//   githubCacheValid: true,
//   hasBackup: true,
//   githubConfig: { ... }
// }
```

### Check API Limits

```javascript
// Check GitHub API rate limit
const rateLimit = await DataLoader.checkRateLimit();
console.log(rateLimit);
// {
//   limit: 5000,
//   remaining: 4987,
//   reset: Date,
//   isLimited: false
// }
```

## Best Practices

1. **Use Raw File URL**: For public repositories, this is the simplest and most efficient method
2. **Configure Token**: Increase API limits, avoid rate limiting
3. **Enable Local Fallback**: Ensure the app works when GitHub is unavailable
4. **Regular Backups**: Utilize automatic localStorage backup
5. **Monitor Cache Status**: Periodically check data freshness

## Example Configurations

### Production Configuration

```javascript
// Production: Use GitHub Raw file + local fallback
DataLoader.configure({
  primarySource: 'github',
  fallbackToLocal: true,
  github: {
    rawFileUrl: 'https://raw.githubusercontent.com/your-org/links-data/main/links.json'
  }
});
```

### Development Configuration

```javascript
// Development: Use local data
DataLoader.configure({
  primarySource: 'local'
});
```

### Enterprise Configuration

```javascript
// Enterprise: Use private repository + Token
DataLoader.configure({
  primarySource: 'github',
  fallbackToLocal: true,
  github: {
    owner: 'your-company',
    repo: 'internal-links',
    branch: 'production',
    dataPath: 'data/links.json',
    token: getSecureToken() // Get from secure storage
  }
});
