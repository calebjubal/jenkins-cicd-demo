# Hello CI/CD — Jenkins demo

Express application with Checkout → Build → Test → Deploy automation.

## Requirements
Node.js 22+, npm, Git, Jenkins with Pipeline/Git plugins, and Docker running Linux containers. The Jenkins service account needs these commands on PATH and access to the local Docker engine. Use a dedicated trusted agent with port 3000 free. If Jenkins has multiple agents, replace `agent any` with that agent's label so deployments always reach the same machine.

## Local commands
```sh
npm ci
npm run build
npm test
npm start
```
Open http://localhost:3000; `/health` returns `{"status":"ok"}`. Stop the local server before deploying on the same port.

```sh
npm run deploy
docker logs jenkins-cicd-demo
```
Deployment builds an image, replaces the named demo container, and verifies HTTP health. Docker keeps the container running after Jenkins finishes. Replacement causes brief downtime and has no automatic rollback. The Docker engine must run locally on the agent for the health check. Stop the demo with `docker rm -f jenkins-cicd-demo`.

## GitHub and Jenkins setup
1. Create an empty GitHub repository and configure its remote URL, if none exists: `git remote add origin https://github.com/YOUR_USERNAME/jenkins-cicd-demo.git`.
2. Run `git add .`, `git commit -m "Add Jenkins demo"`, and `git push -u origin HEAD`.
3. In Jenkins choose **New Item → Pipeline → Pipeline script from SCM → Git**.
4. Enter the repository URL, private-repository credentials if needed, actual branch (such as `*/main`), and script path `Jenkinsfile`.
5. Save and run **Build Now** once. The Jenkinsfile then polls SCM every two minutes and runs when changes are detected.
6. Change the greeting and expected test value, commit, and push. Capture the automatically triggered build and new greeting.

Polling needs no public Jenkins endpoint. For webhooks instead, configure the Jenkins GitHub plugin and **GitHub hook trigger for GITScm polling**, add a GitHub push webhook pointing to `https://YOUR_JENKINS/github-webhook/`, configure a matching secret, verify delivery, and remove `pollSCM` from the Jenkinsfile.

## Stages
| Stage | Action |
| --- | --- |
| Checkout | `checkout scm` retrieves the configured revision |
| Build | `npm ci` installs locked dependencies; `npm run build` validates syntax |
| Test | `npm test` verifies greeting, health response, and 404 over HTTP |
| Deploy | `npm run deploy` builds/replaces the Docker container and checks health |

Express needs no compilation. Failed builds or tests prevent deployment. `post` prints success/failure messages; concurrent builds are disabled to avoid overlapping deployments from this job. Windows agents use `bat`; Unix agents use `sh`.

## GitHub Actions equivalent

`.github/workflows/node.js.yml` runs Checkout → Build → Test on pushes and pull requests to `main`, with manual runs also available. Successful pushes/manual runs on `main` then run Deploy using the same `npm run deploy` command and success/failure messages. Pull requests never deploy. Push events replace Jenkins SCM polling.

Register a current self-hosted GitHub Actions runner under **Repository Settings → Actions → Runners → New self-hosted runner** on your persistent deployment machine. Give exactly one runner the custom label `cicd-demo`, install Docker with Linux containers, and allow the runner account to use the local Docker engine. Port 3000 must be free. The workflow sets up Node.js 24; its actions require an up-to-date runner. Without this runner, Deploy remains queued. The app runs at `http://localhost:3000` on that machine, not on GitHub's website; remote access uses the machine's address and network configuration.

Build/test runs on a GitHub-hosted runner; Deploy checks out the same tested commit on the self-hosted machine and builds its Docker image. Workflow runs and deployments are serialized. If Jenkins also deploys this repository, enable only one deployment system for this host because the two systems share the same container and port.

## Evidence checklist
Save real screenshots with captions and build numbers:

1. GitHub repository files and Jenkinsfile.
2. Jenkins job configuration, repository URL, branch, and trigger.
3. Running pipeline and Stage View with all four stages.
4. Console Output showing installation, tests, deployment health, and SUCCESS.
5. GitHub commit history and a second automatically triggered build.
6. Deployed application in the browser with its URL.

Record commit SHA, build number, timestamps, agent, results, and deployed URL. Use `git log --oneline` for commit evidence. Exclude credentials from screenshots. Local tests do not prove a Jenkins run.

Use [the workflow report template](docs/workflow-report.md), add measured results and screenshots, and export it to PDF/Word in your editor.

## Official references
- [Jenkins Pipeline](https://www.jenkins.io/doc/book/pipeline/)
- [Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Pipeline as Code](https://www.jenkins.io/doc/book/pipeline/pipeline-as-code/)
- [Git Pipeline steps](https://www.jenkins.io/doc/pipeline/steps/git/)
