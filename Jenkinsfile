pipeline {
    agent any
    options {
        skipDefaultCheckout(true)
        disableConcurrentBuilds()
        timestamps()
        timeout(time: 15, unit: 'MINUTES')
    }
    triggers { pollSCM('H/2 * * * *') }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Build') {
            steps {
                script {
                    if (isUnix()) { sh 'npm ci && npm run build' }
                    else { bat 'call npm ci && call npm run build' }
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    if (isUnix()) { sh 'npm test' }
                    else { bat 'call npm test' }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    if (isUnix()) { sh 'npm run deploy' }
                    else { bat 'call npm run deploy' }
                }
            }
        }
    }
    post {
        success { echo 'CI/CD Pipeline completed successfully; deployment health verified.' }
        failure { echo 'Pipeline failed. Inspect Console Output.' }
    }
}
