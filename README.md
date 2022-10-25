### Requirements

- Node >= v16.x
- Yarn

### How to use

```bash
yarn install

# create .env
NEXT_PUBLIC_MODE=development
NEXT_PUBLIC_BASE_URL=http://pretest-qa.dcidev.id/api/v1
NEXT_PUBLIC_PROXY_URL=http://localhost:8010/proxy
###

yarn run proxy          # to bypass CORS
yarn run dev            # to run local development server

# or
yarn run demo:yarn-dev  # running parallel
```
