# EZUtils - a collection of utilities 
For internal use. ... A work in progress.

## Install

```bash
npm install @amalgamio1/ezutils@1.0.0-alpha
```

--------------------------------------------

### Development Notes

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

----------------------------------------------------------------------

### Generate Token

Repository access is facilitated via `shared secret` 


@see .npmrc

