# Backend build

Run `mvn clean package` (or `./mvnw clean package`) from `backend`.
The `prepare-package` phase automatically regenerates `../docs/openapi.json`
from the application's `/v3/api-docs` endpoint. Generation also runs with
`-DskipTests`; use that option rather than `-Dmaven.test.skip=true`, since the
exporter needs the compiled test classes.

The exporter uses an in-memory H2 database and temporary RSA keys. It does not
require PostgreSQL, SMTP credentials, or production JWT keys. Generation errors
fail the build.

`Dockerfile.staging` generates the schema during the Maven build. Its `openapi`
target exports the file:

```sh
docker buildx build -f backend/Dockerfile.staging --target openapi \
  --output type=local,dest=docs backend
```

The staging workflow exports the schema to `docs/openapi.json`, uploads it as
the `backend-openapi` workflow artifact, and copies it to
`~/deploy/staging/docs/openapi.json` during deployment. The workflow does not
commit the generated file back to Git; local builds update the working copy.
