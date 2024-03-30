# EZUtils

   A collection of utilities.
   For internal use. A work in progress.
___
## Usage

#### 1. Create a `.npmrc` file in project root directory.
```bash
//.npmrc

@amalgamio1:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${AMALGAMIO_NODE_GITHUB_TOKEN}

```

#### 2. Install
```bash
npm install @amalgamio1/ezutils@1.0.0-alpha
```


#### 3. Use
```typescript
import { add } from "@amalgamio1/ezutils";
```


## Developer Notes
____

**Github specific** :
- scope: `@amalgamio1`
- registry: `https://npm.pkg.github.com`

#### Publish directly to Github's NPM registry:
1. **Login**
    ```bash
    npm login --registry=https://npm.pkg.github.com --scope=@amalgamio1
    ```
    ... at prompt:
     - **Username**: amalgamio1
     - **Password**: ghp_XxXxX...xXxXxXx (40 chars; See: [Generate Token](#generate-token))

2. **Publish**
    ```bash
    npm publish --registry=https://npm.pkg.github.com --scope=@amalgamio1
    ```


### Generate Token
___
Repository access is facilitated via `shared secret`

See ([Step 10](https://dev.to/srrathi/private-npm-package-for-internal-use-in-your-organisation-using-github-package-registry-and-github-actions-3b2c)) in dev.to tutorial. 


## References
___
  - GitHub Workflows ([docs.github/automating-builds](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs))
  - GitHub Package Registry ([docs.github/packages-registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry))
  - [Scoped NPM package and Actions](https://dev.to/srrathi/private-npm-package-for-internal-use-in-your-organisation-using-github-package-registry-and-github-actions-3b2c)
- Local account setup
  - [github-and-multiple-accounts](https://code.tutsplus.com/quick-tip-how-to-work-with-github-and-multiple-accounts--net-22574t)
  
