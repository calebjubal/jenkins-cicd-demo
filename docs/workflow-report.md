# CI/CD Workflow Report

## 1. Aim
Automate build, test, and deployment of an Express application using Jenkins and GitHub.

## 2. Software Requirements
Git, GitHub, Jenkins with Pipeline/Git plugins, Node.js/npm, Docker, and a browser. Installed versions: **Pending**.

## 3. CI/CD Architecture
```text
Developer → git push → GitHub → SCM polling → Jenkins
  → Checkout → Build → Test → Deploy → Docker container on agent:3000
```

## 4. GitHub Repository Setup
Repository URL, branch, initial commit SHA, and screenshot: **Pending**.

## 5. Jenkins Configuration
Pipeline from SCM, repository URL, branch, script path `Jenkinsfile`, and dedicated agent. Configuration screenshot: **Pending**.

## 6. Jenkinsfile
Include the Jenkinsfile and link to its committed revision: **Pending**.

## 7. Build Stage
`npm ci` installs locked dependencies; `npm run build` checks syntax. Observed output: **Pending**.

## 8. Test Stage
HTTP tests verify greeting, health endpoint, and unknown-route response. Actual test results: **Pending**.

## 9. Deployment Stage
Docker image build, container replacement, and HTTP health check. Actual deployed URL and response: **Pending**.

## 10. Build Trigger Configuration
SCM polling: `H/2 * * * *`. Record push time and subsequent automatic build: **Pending**.

## 11. Post-Build Actions
Success/failure messages through `post`. Observed message: **Pending**.

## 12. Execution Results
| Run | Commit SHA | Trigger | Build number | Tests | Deployment |
| --- | --- | --- | --- | --- | --- |
| Initial | Pending | Manual | Pending | Pending | Pending |
| Changed greeting | Pending | SCM change | Pending | Pending | Pending |

## 13. Screenshots
Insert real screenshots from the README checklist with captions: **Pending**.

## 14. Git Commit History
Paste `git log --oneline` and GitHub history screenshot: **Pending**.

## 15. Observations
Record timings, failures and fixes, and persistence after the job ends. Container replacement causes brief downtime; no automatic rollback is implemented. Measured observations: **Pending**.

## 16. Conclusion
Describe demonstrated tasks based on actual evidence: **Pending**.

## References
[Jenkins Pipeline](https://www.jenkins.io/doc/book/pipeline/), [Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/), [Pipeline as Code](https://www.jenkins.io/doc/book/pipeline/pipeline-as-code/).
